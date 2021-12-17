import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import PageHeader from './parts/header';
import PageSider from './parts/sider';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';

import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import { useApi } from '../utils/apiClient';
import { DynamicApiReturn, GroupListApiReturn } from '../utils/apiModels';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from '@mui/material/Link';
import { Chip } from '@mui/material';

/*
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}


const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
*/

const theme = createTheme();
const drawerWidth = 240;

function timestampToTime(timestamp: number) {
  let date = new Date(timestamp * 1000); //timestamp 为10位需*1000，timestamp 为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}

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

const VerticalTabs: React.FC<GroupListApiReturn> = (props) => {
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {props.data.map((item, idx) => {
          return <Tab label={item.group_name} {...a11yProps(idx)} key={idx} value={idx} />;
        })}
      </Tabs>
      {props.data.map((item, idx) => {
        const group = props.data.find((i) => i.gid === item.gid)!;
        return (
          <TabPanel value={value} index={idx}>
            <RolllistItem gid={group.gid} />
          </TabPanel>
        );
      })}
    </Box>
  );
};

const RolllistItem: React.FC<{ gid: number }> = (props) => {
  const { getDynamic } = useApi();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [pageOffset, setPageOffset] = useState<number>(0);
  const [dynamicData, setDynamicData] = useState<DynamicApiReturn>();

  useEffect(() => {
    async function fetch() {
      const dynamicResponse = await getDynamic({
        gid: props.gid,
        offset: pageOffset,
        size: 10,
      });
      setDynamicData(dynamicResponse);
      // console.log(dynamicResponse);
      // DO SOMETHING
      setLoaded(true);
    }
    fetch();
  }, [getDynamic, props.gid]);

  return loaded ? (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
      }}
    >
      {dynamicData!.data.data.map((item, idx) => {
        const card = JSON.parse(item.raw.card);
        const desc = item.raw.desc;
        const dtype = item.dynamic_type;
        console.log(card);
        // console.log(dtype);
        switch (dtype) {
          case 1:
            return (
              <ListItem alignItems="flex-start">
                <ItemType1 card={card} desc={desc} time={timestampToTime(item.timestamp)} />
              </ListItem>
            );

          case 2:
            return (
              <ListItem alignItems="flex-start">
                <ItemType2 card={card} desc={desc} time={timestampToTime(item.timestamp)} />
              </ListItem>
            );
          case 4:
            return (
              <ListItem alignItems="flex-start">
                <ItemType4 card={card} desc={desc} time={timestampToTime(item.timestamp)} />
              </ListItem>
            );
          case 8:
            return (
              <ListItem alignItems="flex-start">
                <ItemType8 card={card} desc={desc} time={timestampToTime(item.timestamp)} />
              </ListItem>
            );
        }
      })}
    </List>
  ) : (
    <Typography variant="h6" sx={{ mx: 8 }}>
      no data
    </Typography>
  );
};

const ItemType1: React.FC<{ card: any; desc?: any; time: string }> = (props) => {
  // repost
  let uname = props.card.user.uname;
  let uid = props.card.user.uid;
  let face = props.card.user.face;
  let time = props.time;
  let item = props.card.item;
  let card_origin = JSON.parse(props.card.origin);
  let origin_dtype = props.card.item.orig_type;

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            variant="circular"
            src={`http://ddd.edrows.top/txcos/pic/?url=${face}@60w_60h.webp`}
          />
        }
        title={uname}
        subheader={time}
        action={<Chip label="转发" variant="outlined" />}
      />
      {origin_dtype === 2 && (
        <Box sx={{ margin: 2 }}>
          <ItemType2 card={card_origin} />
        </Box>
      )}
      {origin_dtype === 4 && (
        <Box sx={{ margin: 2 }}>
          <ItemType4 card={card_origin} />
        </Box>
      )}
      {origin_dtype === 8 && (
        <Box sx={{ margin: 2 }}>
          <ItemType8 card={card_origin} />
        </Box>
      )}
    </Card>
  );
};

const ItemType2: React.FC<{ card: any; desc?: any; time?: string }> = (props) => {
  // pic and text
  let uname = props.card.user.name;
  let uid = props.card.user.uid;
  let face = props.card.user.head_url;
  let time = timestampToTime(props.card.item.upload_time);
  let item = props.card.item;
  let content = props.card.item.description;
  let pics = props.card.item.pictures;
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            variant="circular"
            src={`http://ddd.edrows.top/txcos/pic/?url=${face}@60w_60h.webp`}
          />
        }
        title={uname}
        subheader={time}
        action={<Chip label="图文" variant="outlined" />}
      />
      <CardContent sx={{display: 'flex', flexDirection: 'column' }}>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
          {pics.map((item: any) => {
            return (
              <CardMedia
                component="img"
                image={`http://ddd.edrows.top/txcos/pic/?url=${item.img_src}@360w.webp`}
                sx= {{my: 2}}
              />
            );
          })}
      </CardContent>
    </Card>
  );
};

const ItemType4: React.FC<{ card: any; desc?: any; time?: string }> = (props) => {
  // pure text
  let uname = props.card.user.uname;
  let uid = props.card.user.mid;
  let face = props.card.user.face;
  let time = timestampToTime(props.card.item.timestamp);
  let content = props.card.item.content;
  let origin = props.card.origin;
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        avatar={
          <Avatar
            variant="circular"
            src={`http://ddd.edrows.top/txcos/pic/?url=${face}@60w_60h.webp`}
          />
        }
        title={uname}
        subheader={time}
        action={<Chip label="文字" variant="outlined" />}
      />

      <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle2" sx={{ ml: 2, maxWidth: 360 }}>
            {content}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const ItemType8: React.FC<{ card: any; desc?: any; time?: string }> = (props) => {
  // video
  let uname = props.card.owner.name;
  let uid = props.card.owner.mid;
  let face = props.card.owner.face;
  let time = timestampToTime(props.card.ctime);
  let title = props.card.title;
  let origin = props.card.origin;
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        avatar={
          <Avatar
            variant="circular"
            src={`http://ddd.edrows.top/txcos/pic/?url=${face}@60w_60h.webp`}
          />
        }
        title={uname}
        subheader={time}
        action={<Chip label="视频" variant="outlined" />}
      />

      <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
        <Link
          variant="h6"
          href={props.card.short_link_v2}
          color="inherit"
          underline="hover"
          sx={{ ml: 2 }}
        >
          <CardMedia
            sx={{ display: 'flex', flexDirection: 'row' }}
            component="img"
            image={`http://ddd.edrows.top/txcos/pic/?url=${props.card.pic}@360w.webp`}
          />
        </Link>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Link
            variant="h6"
            href={props.card.short_link_v2}
            color="inherit"
            underline="hover"
            sx={{ ml: 2, maxWidth: 360 }}
          >
            {title}
          </Link>
          <Typography sx={{ ml: 2 }}>miaoshu</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const MainrolllistPageView: React.FC<{}> = () => {
  const [expanded, setExpanded] = React.useState(false);

  const { getGroupList } = useApi();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [groupListData, setGroupListData] = useState<GroupListApiReturn>();
  useEffect(() => {
    async function fetch() {
      const ListResponse = await getGroupList();
      setGroupListData(ListResponse);
      console.log(ListResponse);
      // DO SOMETHING
      setLoaded(true);
    }
    fetch();
  }, [getGroupList]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
          {loaded && <VerticalTabs code={groupListData!.code} data={groupListData!.data} />}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MainrolllistPageView;
