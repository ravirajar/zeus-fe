import React, { userState } from "react";
import { useHistory } from "react-router-dom";

const SelectDeviceTypeComponent = (props) => {
  const history = useHistory();

  const deviceSelected = (event, device) => {
    event.preventDefault();
    if (props.type === "repair") {
      history.push("/repair/" + device);
    } else {
      history.push("/sell-device/" + device);
    }
  };

  return (
    <div className="device-type-comp container">
      <section className="content-wrapper flex-ds-cl col-lg-8 col-sm-12">
        <h2 className="content-heading ">
          {props.type === "repair"
            ? "Get your Repair estimate for your device"
            : "Sell your Mobile Phone, Tablet and Laptop for Best value"}
        </h2>
        {props.type === "repair" ? (
          <p className="benifits-wrapper d-none d-md-flex flex-ds-rw col-sm-12">
            <span className="benifits append-tick flex-dis-rw layout-center">
              <i className="bi bi-check-all"></i>
              Trained Professionals
            </span>
            <span className="benifits append-tick flex-dis-rw layout-center">
              <i className="bi bi-check-all"></i>
              6-months warranty
            </span>
          </p>
        ) : (
          <p className="benifits-wrapper d-none d-md-flex flex-ds-rw col-sm-12">
            <span className="benifits append-tick flex-dis-rw layout-center">
              <i className="bi bi-check-all"></i>
              Maximum value
            </span>
            <span className="benifits append-tick flex-dis-rw layout-center">
              <i className="bi bi-check-all"></i>
              Hassle-free
            </span>
          </p>
        )}
        <div className="flex-ds-cl mt-20">
          <p className="select-device-text">Select your device</p>
          <div className="select-gadgets-wrapper flex-ds-rw">
            <a
              title="Sell Old Mobiles"
              href="#"
              onClick={(event) => {
                deviceSelected(event, "mobile");
              }}
            >
              <div className="device-container">
                <span className="device-label flex-ds-rw">
                  <i className="bi bi-phone-fill"></i>
                  <span className="d-none d-sm-inline-block">Mobile</span>
                </span>
              </div>
            </a>
            <a
              title="Sell Old Tablet"
              href="#"
              onClick={(event) => {
                deviceSelected(event, "tablet");
              }}
            >
              <div className="device-container">
                <span className="device-label flex-ds-rw">
                  <i className="bi bi-tablet-landscape-fill"></i>
                  <span className="d-none d-sm-inline-block">Tablet</span>
                </span>
              </div>
            </a>
            <a
              title="Sell Old Laptops"
              href="#"
              onClick={(event) => {
                deviceSelected(event, "laptop");
              }}
            >
              <div className="device-container">
                <span className="device-label flex-ds-rw">
                  <i className="bi bi-laptop-fill"></i>
                  <span className="d-none d-sm-inline-block">Laptop</span>
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SelectDeviceTypeComponent;
