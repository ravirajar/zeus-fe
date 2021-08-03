import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { getDeviceList, getRepairDeviceList } from "../api/index";

const SelectDeviceComponent = (props) => {
  const history = useHistory();
  const { device } = useParams();
  const { brand } = useParams();

  const [modelList, setModelList] = useState();

  const deviceSelected = (event, model) => {
    event.preventDefault();
    if (props.type === "repair") {
      history.push(
        "/repair/" + device + "/" + brand + "/" + model + "/question"
      );
    } else {
      history.push(
        "/sell-device/" + device + "/" + brand + "/" + model + "/question"
      );
    }
  };

  useEffect(() => {
    if (props.type === "repair") {
      getRepairDeviceList(device + "&brandName=" + brand).then((results) => {
        setModelList(results.data);
      });
    } else {
      getDeviceList(device + "&brandName=" + brand).then((results) => {
        setModelList(results.data);
      });
    }
  }, []);

  return (
    <div className="select-brand container">
      <section className="content-wrapper flex-ds-cl col-lg-12 col-sm-12">
        <h2 className="select-brand-heading">Select Model</h2>
        <div className="select-brand-container">
          {modelList
            ? modelList.map((data, id) => {
                const image = require("../assets/mobile/" + data + ".jpeg");
                return (
                  <div
                    key={id}
                    className="individual-brand-container"
                    onClick={(event) => {
                      deviceSelected(event, data);
                    }}
                  >
                    <a className="individual-brand">
                      <div className="individual-brand-wrapper">
                        <img
                          className="individual-brand-img"
                          src={image.default}
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

export default SelectDeviceComponent;
