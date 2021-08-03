import React, { useState } from "react";
import { useParams } from "react-router-dom";

import "../sass/SellOldDevice.scss";
import "../sass/common.scss";

import SelectDeviceTypeComponent from "../components/SelectDeviceTypeComponent";
import SelectBrandComponent from "../components/SelectBrandComponent";
import SelectDeviceComponent from "../components/SelectDeviceComponent";

const SellOldMobile = () => {
  const { device } = useParams();
  const { brand } = useParams();

  if (device === undefined) {
    return <SelectDeviceTypeComponent />;
  } else if (device !== undefined && brand === undefined) {
    switch (device) {
      case "mobile":
        return <SelectBrandComponent device={device} />;

      case "tablet":
        break;

      case "laptop":
        break;

      default:
        break;
    }
  } else if (device !== undefined && brand !== undefined) {
    return <SelectDeviceComponent device={device} brand={brand} />;
  }
};

export default SellOldMobile;
