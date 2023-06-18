import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

const NestedRoutePage = () => {
  return (
    <Fragment>
      <h1>Nested page</h1>
      <Link to="/sandbox/nestedpage1">nested page 1 </Link>
      <Link to="/sandbox/nestedpage2">nested page 2</Link>
      <Outlet />
    </Fragment>
  );
};

export default NestedRoutePage;
