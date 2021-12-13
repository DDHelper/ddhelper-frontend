import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import PageHeader from './parts/header';
import PageSider from './parts/sider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { GroupListApiReturn, GroupMemberApiReturn } from '../utils/apiModels';
import { useApi } from '../utils/apiClient';
import { useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import EnhancedTable from './parts/enhancedtable';
import { Button, Modal, TextField } from '@mui/material';
import { serialize } from 'object-to-formdata';

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const newGroupRef = useRef<HTMLInputElement>(null);

  const [newGroupNameEmpty, setNewGroupNameEmpty] = useState<boolean>(true);

  const { postAddGroup, deleteDelGroup } = useApi();
  const checkNewGroupNameEmpty = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    handleClose();
    const response = await postAddGroup(formData);
    // if (response.code !== 200) alert(`操作失败: ${response.msg}`);
    alert('新增成功');
    window.location.reload();
  };

  const handleDelGroup = async () => {
    let delvalue = `gid=${props.data[value - 1].gid}`;
    // delvalue = Object.assign(delvalue, {})
    const response = await deleteDelGroup(delvalue);
    // if (response.code !== 200) alert(`操作失败: ${response.msg}`);
    alert('删除成功');
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
      <Modal
        open={open}
        onClose={handleClose}
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
          <TextField variant="standard" inputRef={newGroupRef} onChange={checkNewGroupNameEmpty} />
          <Button onClick={handleAddGroup} disabled={newGroupNameEmpty}>
            确认
          </Button>
        </Box>
      </Modal>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Button onClick={handleOpen}>新增分组</Button>
        {props.data.map((item, idx) => {
          return (
            <Tab label={item.group_name} {...a11yProps(idx + 1)} key={idx + 1} value={idx + 1} />
          );
        })}
      </Tabs>
      {props.data.map((item, idx) => {
        const rows = props.details.find((i) => i.gid === item.gid)!.data;
        return (
          <TabPanel value={value} index={idx + 1}>
            <EnhancedTable rows={rows} />
            {idx + 1 !== 1 && <Button onClick={handleDelGroup}>删除分组</Button>}
          </TabPanel>
        );
      })}
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
          {loaded && (
            <VerticalTabs
              data={groupListData!.data}
              details={GroupMemberData!.map((item) => item.data)}
            />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default GroupingPageView;
