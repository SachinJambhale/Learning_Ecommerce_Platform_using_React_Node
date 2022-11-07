import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AdminRoutes from "../../shared/routes/AdminRoutes";

interface ISideBarProps {}

const SideBar: React.FunctionComponent<ISideBarProps> = (props) => {
  return (
    <>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Routes>
          {Array.isArray(AdminRoutes) &&
            AdminRoutes.map((route, i) => {
              return (
                <Route
                  key={route.path + i}
                  path={`${route.hasNested ? route.path + "/*" : route.path}`}
                  element={route.component}
                />
              );
            })}
        </Routes>
      </Suspense>
    </>
  );
};

export default SideBar;
