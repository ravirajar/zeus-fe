import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { getBrandList, getRepairBrandList } from "../api/index";

const SelectBrandComponent = (props) => {
  const history = useHistory();
  const { device } = useParams();

  const brandSelected = (event, brand) => {
    event.preventDefault();
    if (props.type === "repair") {
      history.push("/repair/" + device + "/" + brand);
    } else {
      history.push("/sell-device/" + device + "/" + brand);
    }
  };

  const [deviceList, setDeviceList] = useState();

  useEffect(() => {
    if (props.type === "repair") {
      getRepairBrandList(device).then((results) => {
        setDeviceList(results.data);
      });
    } else {
      getBrandList(device).then((results) => {
        setDeviceList(results.data);
      });
    }
  }, []);

  return (
    <div className="select-brand container">
      <section className="content-wrapper flex-ds-cl col-lg-12 col-sm-12">
        <h2 className="select-brand-heading">Select Brand</h2>
        <div className="select-brand-container">
          {deviceList
            ? deviceList.map((data, id) => {
                let imgName;
                if (
                  data.toLowerCase() === "apple" ||
                  data.toLowerCase() === "asus" ||
                  data.toLowerCase() === "google" ||
                  data.toLowerCase() === "honor" ||
                  data.toLowerCase() === "htc" ||
                  data.toLowerCase() === "lenovo" ||
                  data.toLowerCase() === "lg" ||
                  data.toLowerCase() === "mi" ||
                  data.toLowerCase() === "apple" ||
                  data.toLowerCase() === "motorola" ||
                  data.toLowerCase() === "nokia" ||
                  data.toLowerCase() === "oneplus" ||
                  data.toLowerCase() === "oppo" ||
                  data.toLowerCase() === "realme" ||
                  data.toLowerCase() === "samsung" ||
                  data.toLowerCase() === "vivo"
                ) {
                  imgName = imgName.toLowerCase();
                } else {
                  imgName = "apple";
                }
                const image = require("../assets/logo/" + imgName + ".jpeg");
                return (
                  <div
                    key={id}
                    className="individual-brand-container"
                    onClick={(event) => {
                      brandSelected(event, data);
                    }}
                  >
                    <a className="individual-brand" href="#">
                      <div className="individual-brand-wrapper">
                        <img
                          className="individual-brand-img"
                          src={image.default}
                          alt={data}
                        />
                      </div>
                    </a>
                  </div>
                );
              })
            : null}
        </div>
      </section>
    </div>
  );
};

export default SelectBrandComponent;
