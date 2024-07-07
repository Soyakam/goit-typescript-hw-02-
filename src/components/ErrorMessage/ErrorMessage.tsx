import React, { useEffect } from "react";
import toast from "react-hot-toast";

const Error: React.FC = () => {
  useEffect(() => {
    toast.error("Wrong.");
  }, []);

  return null;
};

export default Error;
