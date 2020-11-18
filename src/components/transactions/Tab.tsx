import React from 'react';
import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      backgroundColor: theme.palette.background.default,
      zIndex: (props: { index: number; active: number }) =>
        props.index === props.active ? props.active + 1000 : props.index,
    },
  })
);

const TrscOne = ({ index, active }: { index: number; active: number }) => {
  const styles = useStyles({ index, active });
  return (
    <div className={styles.root}>
      <Container>
  <h3>Random Number: {Math.round(Math.random() * 10)}</h3>
        </Container>
    </div>
  );
};

export default TrscOne;
