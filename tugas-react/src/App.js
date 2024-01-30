import React from "react";
import CodeMateri from "./Code Materi/CodeMateri";
import { GlobalProvider } from "./context/GlobalContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import Navbar from "./component1/navbar";
import CodeMateriForm from "./component2/CodeMateriForm";
import Login from "./Login";
import Layout from "./component1/layout";
import Cookies from "js-cookie";

const App = () => {
  const LoginRoute = (props) => {
    if (Cookies.get("token") === undefined) {
      // belum login
      return props.children;
    } else if (Cookies.get("token") !== undefined) {
      return <Navigate to={"/"} />;
    }
  };

  return (
    <>
      <BrowserRouter>
        <GlobalProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/login"
              element={
                <LoginRoute>
                  <Layout>
                    <Login />
                  </Layout>
                </LoginRoute>
              }
            />
            {/* <Route path="/code-materi" element={<CodeMateri />} />
            <Route path="/create" element={<CodeMateriForm />} />
            <Route path="/edit/:idData" element={<CodeMateriForm />} /> */}
          </Routes>
        </GlobalProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
