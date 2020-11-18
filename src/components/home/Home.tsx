import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import operations from '../../operations';
import TabNav from './TabNav';
import TransactionsTree from './TransactionsTree';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      height: '8vh',
      boxShadow: 'none',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      backgroundColor: theme.palette.grey[200],
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: theme.palette.grey[200],
    },
    content: {
      height: `92vh`,
      marginTop: '8vh',
      flexGrow: 1,
      backgroundColor: theme.palette.grey[200],
    },
    tabsSpliter: {
      height: '8vh',
    },
    toolbar: { height: '8vh' },
    transactionContainer: {
      height: '100%',
      position: 'relative',
      margin: '0',
      padding: '0',
      width: '100%',
      '@media (max-width: 800px)': {
        overflowX: 'scroll',
      },
    },
  })
);

export default function Home() {
  const classes = useStyles();
  // sets an controls the pages/tabs rendered
  const [pages, setPages] = useState([]);
  // controls and sets the current active tab
  const [active, setActive] = useState(pages.length - 1);

  const handleAddPage = (newPage: any) => {
    const prevPage: any = [...pages];
    prevPage.push(newPage);
    setPages(prevPage);
    setActive(prevPage.length - 1);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar className={classes.appBar}>
        {pages.map((tab: any, index) => {
          return (
            <TabNav
              key={index}
              tab={tab}
              index={index}
              pages={pages}
              setPages={setPages}
              setActive={setActive}
              active={active}
            />
          );
        })}
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem>
            <TransactionsTree
              operations={operations}
              handleAddPage={handleAddPage}
            />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.transactionContainer}>
          {pages.map((page: any, index) => (
            <page.render key={index} index={index} active={active} />
          ))}
        </div>
      </main>
    </div>
  );
}
