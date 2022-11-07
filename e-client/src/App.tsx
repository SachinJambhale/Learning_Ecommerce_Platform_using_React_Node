import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "./app/slices/authSlice";
import BlankLayout from "./layouts/blank/BlankLayout";
import FullLayout from "./layouts/full/FullLayout";
import AuthService from "./services/AuthService";
import { useAppDispatch } from "./app/hooks";
import Helmet from "react-helmet";
import { loadSingleUser } from "./features/admin/users/thunkactions";

interface IProtectedRoute {
  children: any;
}

const ProtectedRoute = ({ children }: IProtectedRoute) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loggedUser = useSelector(selectLoggedUser);
  const token = sessionStorage.getItem("token");

  let content;
  if (loggedUser?._id) {
    content = children;
  } else if (token) {
    // validate the token
    AuthService.validateToken(token)
      .then((response) => {
        console.log(response);
        // dispatch the thunk to load the current loggedin user after token varified

        if (response?.data?.data?.id)
          dispatch(loadSingleUser(response?.data?.data?.id));
      })
      .catch((err) => {
        console.log(err);
        sessionStorage.clear();
        navigate("/login");
      });
    content = children;
  } else {
    sessionStorage.clear();
    return <Navigate to="/login" />;
  }
  return <>{content}</>;
};

const App = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf8" />
        <title>Topper Skills Estore</title>
        <link rel="icon" href="/images/topper-skills.jpg" />
      </Helmet>
      <Routes>
        <Route path="/*" element={<BlankLayout />} />
        <Route
          path="secured/*"
          element={
            <ProtectedRoute>
              <FullLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
