

import React from "react";
import { Audio } from "react-loader-spinner";

const Loader: React.FC = () => (
  <div className="loader-container">
    <Audio color="#00BFFF" height={100} width={100} />
    <p>Loading data, please wait...</p>
  </div>
);

export default Loader;
