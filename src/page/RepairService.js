import React, { useState } from "react";
import { useParams } from "react-router-dom";

import "../sass/RepairDevice.scss";
import "../sass/common.scss";

import SelectDeviceTypeComponent from "../components/SelectDeviceTypeComponent";
import SelectBrandComponent from "../components/SelectBrandComponent";
import SelectDeviceComponent from "../components/SelectDeviceComponent";

const RepairDevice = () => {
  const { device } = useParams();
  const { brand } = useParams();

  if (device === undefined) {
    return <SelectDeviceTypeComponent type="repair" />;
  } else if (device !== undefined && brand === undefined) {
    switch (device) {
      case "mobile":
        return <SelectBrandComponent device={device} type="repair" />;

      case "tablet":
        break;

      case "laptop":
        break;

      default:
        break;
    }
  } else if (device !== undefined && brand !== undefined) {
    return (
      <SelectDeviceComponent device={device} brand={brand} type="repair" />
    );
  }
};

export default RepairDevice;
