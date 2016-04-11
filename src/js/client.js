import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Home from "./components/Home";
import Layout from "./components/Layout";
import Login from "./components/FacebookButtons/Login";
import Constants from "./constants/constants";

const app = document.getElementById("app");

window.fbAsyncInit = function() {
  FB.init({
    appId  	: Constants.APP_ID,
    cookie 	: true,
    xfbml  	: true,
    version	: 'v2.5'
  });
};

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Home}>
      <IndexRoute component={Login}></IndexRoute>
      <Route path="user" component={Layout}></Route>
    </Route>
  </Router>,
app);