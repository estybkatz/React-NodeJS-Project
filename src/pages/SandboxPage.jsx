import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

const SandboxPage = () => {
  return (
    <Fragment>
      <h1>Nested page</h1>
      <Link to="/sandbox/nestedpage1">nested page 1 </Link> |
      <Link to="/sandbox/nestedpage2"> nested page 2</Link> |
      <Link to="/sandbox/RP1"> RP1</Link> |
      
      <Link to="/sandbox/RP2"> RP2</Link>
      <Outlet />
    </Fragment>
  );
};

export default SandboxPage;
