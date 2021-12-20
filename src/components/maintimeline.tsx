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
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import PageHeader from './parts/header';
import PageSider from './parts/sider';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import { DynamicApiReturn, GroupListApiReturn, TimelineApiReturn } from '../utils/apiModels';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useApi } from '../utils/apiClient';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';

const theme = createTheme();
const drawerWidth = 240;

function timestampToTime(timestamp: number) {
  let date = new Date(timestamp * 1000); // timestamp 10 digits
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}

function timestampToDate(timestamp: number) {
  let date = new Date(timestamp * 1000); // timestamp 10 digits
  let Y = date.getFullYear();
  let M = date.getMonth() + 1 < 10 ? Number('0' + (date.getMonth() + 1)) : date.getMonth() + 1;
  let D = date.getDate() < 10 ? Number('0' + date.getDate()) : date.getDate();
  return {
    year: Y,
    month: M,
    day: D,
  };
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
          <div>
            <TimelineTree gid={group.gid} />
            <TabPanel value={value} index={idx}>
              <Timeline position="alternate">
                <TimelineItem>
                  <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    9:30 am
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                      <FastfoodIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                      抽奖
                    </Typography>
                    <Typography>去转发抽奖</Typography>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    variant="body2"
                    color="text.secondary"
                  >
                    10:00 am
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary">
                      <LaptopMacIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                      直播
                    </Typography>
                    <Typography>去看直播</Typography>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    variant="body2"
                    color="text.secondary"
                  >
                    5:00 pm
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary" variant="outlined">
                      <HotelIcon />
                    </TimelineDot>
                    <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                      新视频更新
                    </Typography>
                    <Typography>去看新视频</Typography>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    variant="body2"
                    color="text.secondary"
                  >
                    9:00 pm
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                    <TimelineDot color="secondary">
                      <RepeatIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                      直播
                    </Typography>
                    <Typography>去看新的直播</Typography>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </TabPanel>
          </div>
        );
      })}
    </Box>
  );
};

const TimelineTree: React.FC<{ gid: number }> = (props) => {
  const { getTimeline } = useApi();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [pageOffset, setPageOffset] = useState<number>(0);
  const [timelineData, setTimelineData] = useState<TimelineApiReturn>();
  const [sortedEvents, setSortedEvents] = useState<Array<any>>();

  useEffect(() => {
    async function fetch() {
      const timelineResponse = await getTimeline({
        gid: props.gid,
        offset: pageOffset,
        size: 100,
      });
      console.log(timelineResponse);
      let times = [];
      for (let idx in timelineResponse!.data.data) {
        // times.push(timestampToDate(timelineResponse!.data.data[idx].event_time));
        times.push(new Date(timelineResponse!.data.data[idx].event_time * 1000));
      }
      let today = new Date().setHours(0, 0, 0, 0);
      let tempDayData = [];
      let sortedTimelineData = [];
      let prevDuration = 65536;
      for (let idx in times) {
        let duration = Math.floor((times[idx].valueOf() - today.valueOf()) / (24 * 60 * 60 * 1000));
        console.log(duration, prevDuration);
        if (duration > -2 && duration <= 5) {
          tempDayData.push(timelineResponse.data.data[idx]);
          if (duration < prevDuration) {
            prevDuration = duration;
            sortedTimelineData.push(tempDayData);
            console.log(1);
            tempDayData = [];
          }
        }
      }
      setSortedEvents(sortedTimelineData);
      // DO SOMETHING
      // setLoaded(true);
    }
    fetch();
  }, [getTimeline, props.gid]);

  return loaded ? (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
      }}
    >
      {sortedEvents!.map((item, idx) => {
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
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
        {pics.map((item: any) => {
          return (
            <CardMedia
              component="img"
              image={`http://ddd.edrows.top/txcos/pic/?url=${item.img_src}@360w.webp`}
              sx={{ my: 2 }}
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
  let desc = props.card.desc;
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
          <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
            {desc}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const MainTimelinePageView: React.FC<{}> = () => {
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

/*
< >
{< > for item in []}
</ >
*/
export default MainTimelinePageView;
