import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Comments from "./components/pages/Comments";
import Posts from "./components/pages/Posts";
import Users from "./components/pages/Users";
import Post from "./components/pages/Post";
import User from "./components/pages/User";
import { ReactQueryDevtools } from "react-query-devtools";

export default function App() {
  console.log("hi");
  return (
    <Router>
      <ReactQueryDevtools />
      <Switch>
        <Route exact path="/posts" component={Posts} />
        <Route exact path="/posts/:postId" component={Post} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/:userId" component={User} />
        <Route path="/user" component={User} />
        <Route exact path="/posts/:postId/comments" component={Comments} />
      </Switch>
    </Router>
  );
}
