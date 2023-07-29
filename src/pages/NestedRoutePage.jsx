import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

const NestedRoutePage = () => {
  return (
    <Fragment>
      <h1>management Interface</h1>
      <Link to="/managementInterface/workersList">workers list </Link>
      <Link to="/managementInterface/customersList">customers list</Link>
      <Outlet />
    </Fragment>
  );
};

export default NestedRoutePage;
