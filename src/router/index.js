import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//custom imports below
import Login from "../login";
import Gameslist from "../modules/gameslist";
import Userlist from "../modules/userlist";
import RouteNames from "./routernames";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={RouteNames.LOGIN_PATH} element={<Login />} />
        <Route exact path={RouteNames.USER_LIST} element={<Userlist />} />
        <Route exact path={RouteNames.GAMES_LIST} element={<Gameslist />} />
      </Routes>
    </BrowserRouter>
  );
}
