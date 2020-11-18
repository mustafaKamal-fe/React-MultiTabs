import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';

interface ActiveTasInterface {
  index: number;
  active: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-block',
      color: 'black',
      overflow: 'hidden',
      flexShrink: 1,
      padding: '5px',
      width: '200px',
      maxWidth: '200px',
      minWidth: '10px',
      height: '30px',
      marginLeft: '0.3rem',
      marginRight: '0.3rem',
      borderBottomRightRadius: '0',
      borderBottomLeftRadius: '0',
      borderBottomColor: 'transparent',
      borderRightColor: (props: ActiveTasInterface) =>
        props.active === props.index
          ? theme.palette.grey[100]
          : theme.palette.grey[400],
      borderLeftColor: (props: ActiveTasInterface) =>
        props.active === props.index
          ? theme.palette.grey[100]
          : theme.palette.grey[400],
      borderTop: (props: ActiveTasInterface) =>
        props.active === props.index
          ? '2px solid orange'
          : `1px solid ${theme.palette.grey[400]}`,
      background: (props: ActiveTasInterface) =>
        props.active === props.index
          ? theme.palette.background.default
          : theme.palette.grey[200],
      '&:hover': {
        cursor: 'pointer',
        '& button': {
          visibility: 'visible',
        },
      },
    },
    remove: {
      visibility: (props: ActiveTasInterface) =>
        props.active === props.index ? 'visible' : 'hidden',
      padding: '0',
      margin: '0',
      minWidth: '15px',
      width: 'auto',
      border: 'none',
      borderRadius: '50%',
      '&:hover': {
        color: 'red',
        background: 'none',
      },
    },
    name: {
      flexShrink: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    innerFlex: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  })
);

const TabNav = ({
  tab,
  index,
  setPages,
  pages,
  setActive,
  active,
}: {
  tab: any;
  index: number;
  setPages: any;
  pages: any;
  setActive: any;
  active: number;
}) => {
  // removes the tab based on its index number inside the pages array

  const handleRemoveTab = (e: any) => {
    // stop propgation when hiting the 'x' button so we don't run the activate tab event
    e.preventDefault();
    e.stopPropagation();

    const prev = [...pages];
    prev.splice(index, 1);
    // handle who should be the active tab
    const lastActive = active - 1000;
    setPages(prev);
    if (pages[lastActive]) {
      setActive(lastActive);
    } else {
      setActive(prev.length - 1);
    }
  };

  // activates a tab based on its index number

  const handleActiveTab = (e: any) => {
    e.preventDefault();
    // this setter value 'active' is used inside 'Home' component to
    // mount a tab over others
    setActive(index);
  };

  const styles = useStyles({ active, index });

  return (
    <div
      key={index}
      onClick={handleActiveTab}
      className={styles.root}
    >
      <div className={styles.innerFlex}>
        <Typography variant="caption" className={styles.name}>
          {tab.name}
        </Typography>

        <Button
          type="button"
          variant="outlined"
          onClick={handleRemoveTab}
          className={styles.remove}
        >
          <Typography variant="caption">X</Typography>
        </Button>
      </div>
    </div>
  );
};

export default TabNav;
