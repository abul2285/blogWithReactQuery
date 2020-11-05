import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Post from "./pages/Post";
import User from "./pages/User";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import Fallback from "./pages/Fallback";
import Comments from "./pages/Comments";
import Navbar from "./components/Nav/Nav";
import { ReactQueryDevtools } from "react-query-devtools";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/posts" component={Posts} />
        <Route exact path="/posts/:postId" component={Post} />
        <Route exact path="/" component={Users} />
        <Route exact path="/users/:userId" component={User} />
        <Route exact path="/user" component={User} />
        <Route exact path="/posts/:postId/comments" component={Comments} />
        <Route component={Fallback} />
      </Switch>
      <ReactQueryDevtools />
    </Router>
  );
}
