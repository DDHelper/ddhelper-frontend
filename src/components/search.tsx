import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useApi } from '../utils/apiClient';
import {
  DoSubscribeValues,
  GroupListMidApiReturn,
  SearchSubscribeApiReturn,
} from '../utils/apiModels';
import { getComparator, stableSort } from './parts/enhancedtable';
import PageHeader from './parts/header';
import PageSider from './parts/sider';
import { SettingsApplicationsRounded } from '@mui/icons-material';

const theme = createTheme();
const drawerWidth = 240;

type Order = 'asc' | 'desc';
const EnhancedTable = (props: {
  rows: {
    gid: number;
    group_name: string;
    count: number;
  }[];
  mid: number;
  selected: number[];
  handleSelect: (value?: any) => void;
}) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [selected, setSelected] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;

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
    props.handleSelect(newSelected);
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
        <TableContainer>
          <Table aria-labelledby="tableTitle" size="medium">
            <TableBody>
              {stableSort(props.rows, getComparator(order, 'gid'))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.gid);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.gid)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.gid}
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
                        <Avatar>
                          <PeopleOutlineIcon />
                        </Avatar>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle1">{row.group_name}</Typography>
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

export interface SimpleDialogProps {
  open: boolean;
  selectedMid: number;
  groupList: GroupListMidApiReturn;
  initSelectedGids: number[];
  onClose: (value?: any) => void;
  onConfirm: (value: DoSubscribeValues) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, onConfirm, selectedMid, groupList, initSelectedGids, open } = props;
  const [selectedGids, setSelectedGids] = React.useState<number[]>(initSelectedGids);
  useEffect(() => {
    async function fetch() {
      // if (groupList !== undefined) setLoaded(true);
    }
    fetch();
  });

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = (value: any) => {
    console.log(value);
    onConfirm(value);
  };

  const handleSelect = (value?: any) => {
    setSelectedGids(value);
    console.log(value);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>分组</DialogTitle>
      {open ? (
        <EnhancedTable
          rows={groupList!.data}
          mid={selectedMid}
          selected={selectedGids}
          handleSelect={handleSelect}
        />
      ) : (
        <div />
      )}
    </Dialog>
  );
}

const SearchPageView: React.FC<{}> = () => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [found, setFound] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<SearchSubscribeApiReturn>();
  const [groupListData, setGroupListData] = useState<GroupListMidApiReturn>();
  const [selectedGids, setSelectedGids] = React.useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const { handleSubmit, register } = useForm();
  const { getSearchSubscribe, getGroupListMid, postDoSubscribe } = useApi();

  const handleClickOpen = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {

    const ListResponse = await getGroupListMid({ mid: index });

    setGroupListData(ListResponse);
    let initSelectedGids = [];
    for (let idx in ListResponse.data) {
      if (ListResponse.data[idx].in_this_group) {
        initSelectedGids.push(ListResponse.data[idx].gid);
      }
    }
    setSelectedGids(initSelectedGids);
    console.log(index);
    setSelectedIndex(index);

    // DO SOMETHING
    setOpen(true);
  };

  const onSubmit = async (data: { search_name: string }) => {
    const response = await getSearchSubscribe(data);
    console.log(response);
    setSearchData(response);
    if (response.data.length !== 0) {
      setFound(true);
    }
    setLoaded(true);
    // if (response.code !== 200) alert(`操作失败: ${response.msg}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDoSubscribe = async (value: DoSubscribeValues) => {
    let formData = new FormData();
    Object.keys(value).forEach((key) => {
      if (key === 'gid') {
        const groups = value[key];
        for (let i = 0; i < groups.length; i++) {
          formData.append(key, groups[i].toString());
        }
      } else {
        formData.append(key, value[key as keyof DoSubscribeValues].toString());
      }
    });
    const response = await postDoSubscribe(formData);
    // console.log(response);
    setOpen(false);
  };

  function CustomizedInputBase() {
    return (
      <Box
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto' }}
      >
        <IconButton sx={{ p: '10px' }} disabled>
          <MenuIcon />
        </IconButton>
        <TextField
          sx={{ ml: 1, mr: 1, flex: 1 }}
          autoFocus
          variant="standard"
          {...register('search_name', { required: true })}
        />
        <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
        <IconButton sx={{ p: '20px' }} aria-label="search" onClick={handleSubmit(onSubmit)}>
          <SearchIcon />
        </IconButton>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <PageHeader />
        <PageSider drawerWidth={drawerWidth} />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
          /* this is content */
        >
          <Toolbar />
          <Typography variant="h5" sx={{ my: 1 }}>
            搜索要订阅的创作者
            <Divider sx={{ my: 1 }} />
            <Box sx={{ my: 3, mx: 3 }}>
              <Box sx={{ my: 2 }}>
                <CustomizedInputBase />
              </Box>

              {loaded &&
                (found ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      padding: 0,
                    }}
                  >
                    <SimpleDialog
                      selectedMid={searchData!.data[selectedIndex].mid}
                      groupList={groupListData!}
                      initSelectedGids={selectedGids}
                      open={open}
                      onClose={handleDoSubscribe}
                      onConfirm={handleDoSubscribe}
                    />
                    <List
                      sx={{
                        width: '100%',
                        maxWidth: 2000,
                        boxShadow: 2,
                        bgcolor: 'background.paper',
                      }}
                    >
                      {searchData!.data.map((item, idx) => {
                        return (
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <Avatar
                                  variant="rounded"
                                  src={`http://ddd.edrows.top/txcos/pic/?url=${item.upic}@60w_60h.webp`}
                                />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemButton
                              sx={{ mx: 1, my: 1, p: 2, position: 'absolute', left: '90%' }}
                              onClick={(event) => handleClickOpen(event, item.mid)}
                            >
                              <AddIcon />
                            </ListItemButton>
                            <ListItemText
                              primary={
                                <Link
                                  variant="subtitle2"
                                  underline="hover"
                                  color="inherit"
                                  href={`https://space.bilibili.com/${item.mid}`}
                                >
                                  {item.uname}
                                </Link>
                              }
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  ></Typography>
                                </React.Fragment>
                              }
                            />
                            <ListItemText
                              primary={`粉丝数 ${item.fans}`}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    uid {item.mid}
                                  </Typography>
                                </React.Fragment>
                              }
                              sx={{
                                position: 'absolute',
                                left: '50%',
                              }}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Box>
                ) : (
                  <Typography variant="h6" sx={{ mx: 8 }}>
                    no data
                  </Typography>
                ))}
            </Box>
          </Typography>

          <Divider />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SearchPageView;
