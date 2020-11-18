import React from "react";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Home from "./components/home/Home";

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: "0",
    margin: "0",
  },
});

const App = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Switch>
        <Route component={Home} path="/" />
      </Switch>
    </div>
  );
};

export default App;
