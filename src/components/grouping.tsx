import { serialize } from 'object-to-formdata';
import React, { useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useApi } from '../utils/apiClient';
import { GroupListApiReturn, GroupMemberApiReturn } from '../utils/apiModels';
import EnhancedTable from './parts/enhancedtable';
import PageHeader from './parts/header';
import PageLoader from './parts/loader';
import PageSider from './parts/sider';

const theme = createTheme();
const drawerWidth = 240;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

// const FC

interface GroupingData {
  data: Array<{
    gid: number;
    group_name: string;
    count: number;
  }>;
  details: Array<{
    has_more: boolean;
    gid: number;
    group_name: string;
    count: number;
    page: number;
    pages: number;
    data: Array<{
      mid: number;
      name: string;
      face: string;
    }>;
  }>;
}
const VerticalTabs: React.FC<GroupingData> = (props) => {
  const [value, setValue] = React.useState(1);
  const [openNew, setOpenNew] = React.useState(false);
  const [openRename, setOpenRename] = React.useState(false);
  const [openDel, setOpenDel] = React.useState(false);
  const handleOpenNew = () => setOpenNew(true);
  const handleCloseNew = () => setOpenNew(false);
  const handleOpenRename = () => setOpenRename(true);
  const handleCloseRename = () => setOpenRename(false);
  const handleOpenDel = () => setOpenDel(true);
  const handleCloseDel = () => setOpenDel(false);
  const newGroupRef = useRef<HTMLInputElement>(null);
  const renameGroupRef = useRef<HTMLInputElement>(null);

  const [groupNameEmpty, setNewGroupNameEmpty] = useState<boolean>(true);

  const { postAddGroup, deleteDelGroup, postRenameGroup } = useApi();
  const checkGroupNameEmpty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGroupName = e.target.value;
    if (newGroupName !== undefined && newGroupName !== '') setNewGroupNameEmpty(false);
    else setNewGroupNameEmpty(true);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleAddGroup = async () => {
    let value = { group_name: newGroupRef.current!.value };
    const formData = serialize(value);
    handleCloseNew();
    const response = await postAddGroup(formData);
    // if (response.code !== 200) alert(`操作失败: ${response.msg}`);
    alert('新增成功');
    window.location.reload();
  };

  const handleDelGroup = async () => {
    let delvalue = `gid=${props.data[value - 1].gid}`;
    const response = await deleteDelGroup(delvalue);
    alert('删除成功');
    window.location.reload();
  };

  const handleRenameGroup = async () => {
    let renameValue = { gid: props.data[value - 1].gid, group_name: renameGroupRef.current!.value };
    const formData = serialize(renameValue);
    handleCloseRename();
    const response = await postRenameGroup(formData);
    alert('更名成功');
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
      <Modal
        open={openNew}
        onClose={handleCloseNew}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            新分组的名称
          </Typography>
          <TextField
            variant="standard"
            inputRef={newGroupRef}
            onChange={checkGroupNameEmpty}
            autoFocus
          />
          <Button onClick={handleAddGroup} disabled={groupNameEmpty}>
            确认
          </Button>
        </Box>
      </Modal>
      <Modal
        open={openRename}
        onClose={handleCloseRename}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            重命名
          </Typography>
          <TextField
            variant="standard"
            inputRef={renameGroupRef}
            onChange={checkGroupNameEmpty}
            defaultValue={props.data[value - 1].group_name}
            autoFocus
          />
          <Button onClick={handleRenameGroup} disabled={groupNameEmpty}>
            确认
          </Button>
        </Box>
      </Modal>
      <Modal
        open={openDel}
        onClose={handleCloseDel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            确认删除
          </Typography>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Button onClick={handleDelGroup} variant="outlined" size="large" sx={{ marginTop: 2 }}>
              确认
            </Button>
          </Grid>
        </Box>
      </Modal>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Button onClick={handleOpenNew}>新增分组</Button>
        {props.data.map((item, idx) => {
          return (
            <Tab label={item.group_name} {...a11yProps(idx + 1)} key={idx + 1} value={idx + 1} />
          );
        })}
      </Tabs>
      <Grid container spacing={2}>
        <Grid item xs={1}></Grid>
        <Grid item xs={6} md={7}>
          {props.data.map((item, idx) => {
            const rows = props.details.find((i) => i.gid === item.gid)!.data;
            return (
              <TabPanel value={value} index={idx + 1}>
                <EnhancedTable rows={rows} gid={item.gid} />
                {idx + 1 !== 1 && <Button onClick={handleOpenDel}>删除分组</Button>}
                {idx + 1 !== 1 && <Button onClick={handleOpenRename}>重命名分组</Button>}
              </TabPanel>
            );
          })}
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Box>
  );
};

const GroupingPageView: React.FC<{}> = () => {
  /*
    groups.map({<Tab>
    {items.map({<box />})}
    </Tab>})
  */
  const { getGroupList, getGroupMember } = useApi();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [groupListData, setGroupListData] = useState<GroupListApiReturn>();
  const [GroupMemberData, setGroupMemberData] = useState<Array<GroupMemberApiReturn>>();
  useEffect(() => {
    async function fetch() {
      const ListResponse = await getGroupList();
      setGroupListData(ListResponse);
      let MemberResponses = [];
      for (let group of ListResponse.data) {
        MemberResponses.push(
          await getGroupMember(
            group.count === 0
              ? { gid: group.gid, page: 0 }
              : {
                  gid: group.gid,
                  page: 0,
                  size: group.count,
                }
          )
        );
      }
      setGroupMemberData(MemberResponses);
      console.log(MemberResponses);
      // DO SOMETHING
      setLoaded(true);
    }
    fetch();
  }, [getGroupList, getGroupMember]);
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
          {loaded ? (
            <VerticalTabs
              data={groupListData!.data}
              details={GroupMemberData!.map((item) => item.data)}
            />
          ) : (
            <PageLoader />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default GroupingPageView;
