import React from "react";
import Home from "../pages/home/Home";
import JobVacancy from "../pages/jobvacancy/JobVacancy";
import LayoutLanding from "../widges/LayoutLanding";
import LayoutDasboard from "../widges/LayoutDasboard";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Dasboard from "../pages/dashboard/Dasboard";
import Login from "../pages/login/Login";
import Detail from "../pages/detail/detail";
import ListJob from "../pages/listjob/ListJob";

const RouterComponent = () => {
  const LoginRoute = (props) => {
    if (Cookies.get("token") === undefined) {
      return props.children;
    } else if (Cookies.get("token") !== undefined) {
      return <Navigate to={"/"} />;
    }
  };

  const DashboardRoute = (props) => {
    if (Cookies.get("token") === undefined) {
      return <Navigate to={"/"} />;
    } else if (Cookies.get("token") !== undefined) {
      return props.children;
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LayoutLanding>
                <Home />
              </LayoutLanding>
            }
          />
          <Route
            path="/job-vacancy"
            element={
              <LayoutLanding>
                <JobVacancy />
              </LayoutLanding>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <LayoutLanding>
                <Detail />
              </LayoutLanding>
            }
          />
          <Route
            path="/dasboard"
            element={
              <DashboardRoute>
                <LayoutDasboard>
                  <Dasboard />
                </LayoutDasboard>
              </DashboardRoute>
            }
          />
          <Route
            path="/dasboard/job-vacancy"
            element={
              <DashboardRoute>
                <LayoutDasboard>
                  <ListJob />
                  
                </LayoutDasboard>
              </DashboardRoute>
            }
          />
          <Route
            path="/login"
            element={
              <LoginRoute>
                <Login />
              </LoginRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouterComponent;
