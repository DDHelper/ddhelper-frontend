import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Avatar from '@mui/material/Avatar';
import { Dialog, Link, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

import { useApi } from '../../utils/apiClient';
import { serialize } from 'object-to-formdata';
import { GroupListApiReturn, DoSubscribeValues } from '../../utils/apiModels';
import { useEffect, useState } from 'react';

interface Data {
  mid: number;
  name: string;
  face: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: '',
  },
  {
    id: 'mid',
    numeric: true,
    disablePadding: false,
    label: '',
  },
  {
    id: 'face',
    numeric: false,
    disablePadding: true,
    label: '',
  },
];

export interface SimpleDialogProps {
  open: boolean;
  selected: number[];
  current_gid: number;
  remove: 0 | 1;
  groupList: GroupListApiReturn;
  onClose: (value?: any) => void;
  onConfirm: (value: any) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, onConfirm, selected, current_gid, remove, groupList, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: any) => {
    console.log(value);
    onConfirm(value);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      {/* <DialogTitle>Set backup account</DialogTitle> */}
      <List sx={{ pt: 0 }}>
        {groupList.data.map((item, idx) => (
          <ListItem
            button
            onClick={() =>
              handleListItemClick({
                mid: selected,
                old_group: current_gid,
                new_group: item.gid,
                remove_old: remove,
              })
            }
            key={idx}
          >
            <ListItemAvatar>
              <Avatar>
                <PeopleOutlineIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.group_name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  selected: number[];
  current_gid: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { selected, current_gid } = props;
  const numSelected = selected.length;
  const { getGroupList, postMoveMember } = useApi();
  const [open, setOpen] = useState(false);
  const [groupListData, setGroupListData] = useState<GroupListApiReturn>();

  useEffect(() => {
    async function fetch() {
      const ListResponse = await getGroupList();
      setGroupListData(ListResponse);
      console.log(ListResponse);
    }
    fetch();
  }, [getGroupList]);

  const handleMoveOpen = async () => {
    const ListResponse = await getGroupList();
    setGroupListData(ListResponse);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDoMove = async (value: any) => {
    let formData = new FormData();
    Object.keys(value).forEach((key) => {
      if (key === 'mid') {
        const groups = value[key];
        for (let i = 0; i < groups.length; i++) {
          formData.append(key, groups[i].toString());
        }
      } else {
        formData.append(key, value[key].toString());
      }
    });
    const response = await postMoveMember(formData);
    // console.log(response);
    alert('移动成功');
    window.location.reload();
    setOpen(false);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          选中 {numSelected} 位
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          关注列表
        </Typography>
      )}
      {numSelected > 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            padding: 0,
          }}
        >
          <SimpleDialog
            selected={selected}
            current_gid={current_gid}
            groupList={groupListData!}
            remove={1}
            open={open}
            onClose={handleClose}
            onConfirm={handleDoMove}
          />
          <Tooltip title="移动">
            <IconButton onClick={handleMoveOpen}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="复制">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="删除">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const EnhancedTable = (props: { rows: Data[]; gid: number }) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('mid');
  const [selected, setSelected] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  /*
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = props.rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  */

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar selected={selected} current_gid={props.gid} />
        <TableContainer>
          <Table aria-labelledby="tableTitle" size="medium">
            {/*<EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
            />*/}
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(props.rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.mid);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.mid)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        <Avatar
                          src={`http://ddd.edrows.top/txcos/pic/?url=${row.face}@60w_60h.webp`}
                          variant="circular"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle1">{row.name}</Typography>
                      </TableCell>
                      <TableCell align="right">{row.mid}</TableCell>
                      <TableCell align="right">
                        <Link href={`https://space.bilibili.com/${row.mid}`} underline="hover">
                          个人空间
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
};

export default EnhancedTable;
