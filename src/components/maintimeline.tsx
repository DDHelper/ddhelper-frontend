import React, { useEffect, useState } from 'react';

import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useApi } from '../utils/apiClient';
import { GroupListApiReturn, TimelineApiReturn } from '../utils/apiModels';
import PageHeader from './parts/header';
import PageSider from './parts/sider';

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
  let Mstr = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let Ystr = date.getFullYear() + '-';
  let Dstr = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  return {
    year: Y,
    month: M,
    day: D,
    date: Ystr + Mstr + Dstr,
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
  const [value, setValue] = React.useState(0);

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
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: 96 }}
      >
        {props.data.map((item, idx) => {
          return <Tab label={item.group_name} {...a11yProps(idx)} key={idx} value={idx} wrapped />;
        })}
      </Tabs>
      {props.data.map((item, idx) => {
        const group = props.data.find((i) => i.gid === item.gid)!;
        return (
          <div>
            <TabPanel value={value} index={idx}>
              <TimelineTree gid={group.gid} />
            </TabPanel>
          </div>
        );
      })}
    </Box>
  );
};

interface TimelineEvent {
  dynamic_id: number;
  event_time: number;
  raw: any;
  text: { extract: string };
  type: string;
}

const TimelineTree: React.FC<{ gid: number }> = (props) => {
  const { getTimeline } = useApi();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [pageOffset, setPageOffset] = useState<number>(0);
  const [timelineData, setTimelineData] = useState<TimelineApiReturn>();
  const [sortedTimelineData, setSortedTimelineData] = useState<Array<Array<any>>>();
  const [dates, setDates] = useState<any[]>();

  useEffect(() => {
    async function fetch() {
      const timelineResponse = await getTimeline({
        gid: props.gid,
        offset: pageOffset,
        size: 32,
      });
      // console.log(timelineResponse);
      let today = new Date().setHours(0, 0, 0, 0);
      let trimedTimelineData = [];
      let tempDayData = [];
      let sortedTimelineData = [];
      for (let idx in timelineResponse.data.data) {
        let duration = Math.floor(
          (timelineResponse!.data.data[idx].event_time * 1000 - today.valueOf()) /
            (24 * 60 * 60 * 1000)
        );
        if (duration > -2 && duration <= 5) {
          trimedTimelineData.push(timelineResponse.data.data[idx]);
        }
      }
      let prevDuration =
        Math.floor(
          (new Date(trimedTimelineData[0].event_time * 1000).valueOf() - today.valueOf()) /
            (24 * 60 * 60 * 1000)
        ) + 1;
      for (let idx in trimedTimelineData) {
        let duration = Math.floor(
          (new Date(trimedTimelineData[idx].event_time * 1000).valueOf() - today.valueOf()) /
            (24 * 60 * 60 * 1000)
        );
        if (duration - prevDuration == -1) {
          tempDayData.push(trimedTimelineData[idx]);
        } else {
          prevDuration = duration + 1;
          sortedTimelineData.push(tempDayData);
          tempDayData = [];
          tempDayData.push(trimedTimelineData[idx]);
        }
      }
      sortedTimelineData.push(tempDayData);
      setSortedTimelineData(sortedTimelineData);
      // DO SOMETHING
      setLoaded(true);
    }
    fetch();
  }, [getTimeline, props.gid]);

  return loaded ? (
    <Stack
      direction="row-reverse"
      //justifyContent="center"
      alignItems="baseline"
      spacing={0}
      sx={{ display: 'flex', overflowX: 'auto' }}
    >
      {sortedTimelineData!.map((item, idx) => {
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Chip label={timestampToDate(item[0].event_time).date} sx={{ mx: 2 }} />
            <Timeline sx={{ maxWidth: 400 }}>
              {item.map((item, idx) => {
                switch (item.type) {
                  case 'LO':
                    return (
                      <ItemLO
                        dynamic_id={item.dynamic_id}
                        event_time={item.event_time}
                        raw={item.raw}
                        text={item.text}
                        type={item.type}
                      />
                    );

                  case 'RE':
                    return (
                      <ItemRE
                        dynamic_id={item.dynamic_id}
                        event_time={item.event_time}
                        raw={item.raw}
                        text={item.text}
                        type={item.type}
                      />
                    );
                  case 'ST':
                    return (
                      <ItemST
                        dynamic_id={item.dynamic_id}
                        event_time={item.event_time}
                        raw={item.raw}
                        text={item.text}
                        type={item.type}
                      />
                    );
                  case 'UN':
                    return (
                      <ItemUN
                        dynamic_id={item.dynamic_id}
                        event_time={item.event_time}
                        raw={item.raw}
                        text={item.text}
                        type={item.type}
                      />
                    );
                }
                return (
                  <ItemST
                    dynamic_id={item.dynamic_id}
                    event_time={item.event_time}
                    raw={item.raw}
                    text={item.text}
                    type={item.type}
                  />
                );
              })}
            </Timeline>
          </Box>
        );
      })}
    </Stack>
  ) : (
    <Typography variant="h6" sx={{ mx: 8 }}>
      no data
    </Typography>
  );
};

const ItemRE: React.FC<TimelineEvent> = (props) => {
  // post content
  return (
    <TimelineItem>
      <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="inherit">
        <Typography variant="h6" component="span" color="primary">
          视频
        </Typography>
        <Divider />
        <Typography variant="subtitle2" component="span">
          {timestampToTime(props.event_time).slice(-8)}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        <Link href={`https://t.bilibili.com/${props.raw.desc.dynamic_id_str}`}>
          <TimelineDot color="primary" variant="outlined">
            <PlayCircleOutlineOutlinedIcon />
          </TimelineDot>
        </Link>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="body2">{props.text.extract}</Typography>
      </TimelineContent>
    </TimelineItem>
  );
};
const ItemST: React.FC<TimelineEvent> = (props) => {
  // live stream
  return (
    <TimelineItem>
      <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="inherit">
        <Typography variant="h6" component="span" color="primary">
          直播
        </Typography>
        <Divider />
        <Typography variant="subtitle2" component="span">
          {timestampToTime(props.event_time).slice(-8)}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        <Link href={`https://t.bilibili.com/${props.raw.desc.dynamic_id_str}`}>
          <TimelineDot color="primary" variant="outlined">
            <TvOutlinedIcon />
          </TimelineDot>
        </Link>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="body2">{props.text.extract}</Typography>
      </TimelineContent>
    </TimelineItem>
  );
};
const ItemLO: React.FC<TimelineEvent> = (props) => {
  // lottery
  return (
    <TimelineItem>
      <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="inherit">
        <Typography variant="h6" component="span" color="primary">
          抽奖
        </Typography>
        <Divider />
        <Typography variant="subtitle2" component="span" color="primary">
          {timestampToTime(props.event_time).slice(-8)}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        <Link href={`https://t.bilibili.com/${props.raw.desc.dynamic_id_str}`}>
          <TimelineDot color="primary" variant="outlined">
            <EmojiEventsOutlinedIcon />
          </TimelineDot>
        </Link>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="body2">{props.text.extract}</Typography>
      </TimelineContent>
    </TimelineItem>
  );
};

const ItemUN: React.FC<TimelineEvent> = (props) => {
  // other
  return (
    <TimelineItem>
      <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="inherit">
        <Typography variant="h6" component="span" color="primary">
          其他
        </Typography>
        <Divider />
        <Typography variant="subtitle2" component="span">
          【预期当日消息】
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        <Link href={`https://t.bilibili.com/${props.raw.desc.dynamic_id_str}`}>
          <TimelineDot color="primary" variant="outlined">
            <TextSnippetOutlinedIcon />
          </TimelineDot>
        </Link>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="body2">{props.text.extract}</Typography>
      </TimelineContent>
    </TimelineItem>
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
      // console.log(ListResponse);
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
