import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

const SandboxPage = () => {
  return (
    <Fragment>
      <h1>management Interface</h1>
      <Link to="/managementInterface/workersList">workers list </Link> |
      <Link to="/managementInterface/customersList"> customers list</Link> |
      <Link to="/managementInterface/tasks"> tasks</Link> |
      {/* <Link to="/managementInterface/RP2"> RP2</Link> */}
      <Outlet />
    </Fragment>
  );
};

export default SandboxPage;
