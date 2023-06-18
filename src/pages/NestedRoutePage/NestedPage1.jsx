import { useEffect } from "react";
import { toast } from "react-toastify";

let intervalId;

const NestedPage1 = () => {
  useEffect(() => {
    toast.success("component loaded");
    intervalId = setInterval(() => {
      toast.success("yes");
    }, 1000);

    return () => {
      clearInterval(intervalId);
      toast.success("component terminated");
    };
  }, []);
  return <h2>Nested page 1</h2>;
};
export default NestedPage1;
