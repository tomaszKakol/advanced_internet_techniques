import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import { history } from "./store.js";
import App from "./components/App";
import Home from "./components/Home";
import ItemEdit from "./components/ItemEdit";
import NotFound from "./components/NotFound";

const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="item-edit(/:id)" component={ItemEdit}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

export { router };
