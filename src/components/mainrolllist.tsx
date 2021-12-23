import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import CssBaseline from '@mui/material/CssBaseline';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';

import { useApi } from '../utils/apiClient';
import { GroupListApiReturn } from '../utils/apiModels';
import PageHeader from './parts/header';
import PageLoader from './parts/loader';
import PageSider from './parts/sider';

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

function ScrollTop() {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={true}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
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
      <Grid container spacing={2}>
        <Grid item xs={6} md={10}>
          {props.data.map((item, idx) => {
            const group = props.data.find((i) => i.gid === item.gid)!;
            return (
              <TabPanel value={value} index={idx}>
                <RolllistItem gid={group.gid} />
              </TabPanel>
            );
          })}
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Box>
  );
};
interface dynamicData {
  dynamic_id: number;
  mid: number;
  dynamic_type: number;
  timestamp: number;
  raw: any;
}

const RolllistItem: React.FC<{ gid: number }> = (props) => {
  const { getDynamic } = useApi();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [more, setMore] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const [dynamicListData, setDynamicListData] = useState<Array<dynamicData>>();

  useEffect(() => {
    async function fetch() {
      const dynamicResponse = await getDynamic({
        gid: props.gid,
        offset: offset,
        size: 10,
      });
      setDynamicListData(dynamicResponse.data.data);
      setOffset(dynamicResponse.data.offset);
      setMore(dynamicResponse.data.has_more);
      // console.log(dynamicResponse);
      // DO SOMETHING
      setLoaded(true);
    }
    fetch();
  }, [getDynamic, props.gid]);

  async function loadFunc() {
    const dynamicResponse = await getDynamic({
      gid: props.gid,
      offset: offset,
      size: 10,
    });
    setDynamicListData(dynamicListData?.concat(dynamicResponse.data.data));
    setOffset(dynamicResponse.data.offset);
    setMore(dynamicResponse.data.has_more);
  }
  return loaded ? (
    <List
      sx={{
        width: '90%',
        bgcolor: 'background.paper',
      }}
    >
      <InfiniteScroll
        initialLoad={false}
        pageStart={offset}
        loadMore={loadFunc}
        hasMore={more}
        useWindow={true}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {dynamicListData!.map((item, idx) => {
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
      </InfiniteScroll>
    </List>
  ) : (
    <PageLoader />
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
    <Card sx={{ maxWidth: 1000 }}>
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
    <Card sx={{ maxWidth: 1000 }}>
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
        <Box sx={{ maxWidth: 1000 }}>
          <ImageList variant="masonry" cols={3} gap={8}>
            {pics.map((item: any) => (
              <ImageListItem key={item.img}>
                <img
                  src={`http://ddd.edrows.top/txcos/pic/?url=${item.img_src}@360w.webp`}
                  // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  // alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
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
    <Card sx={{ display: 'flex', flexDirection: 'column', maxWidth: 1000 }}>
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
    <Card sx={{ display: 'flex', flexDirection: 'column', maxWidth: 1000 }}>
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

const MainrolllistPageView: React.FC<{}> = () => {
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
          {loaded ? (
            <VerticalTabs code={groupListData!.code} data={groupListData!.data} />
          ) : (
            <PageLoader />
          )}
          <ScrollTop />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MainrolllistPageView;
