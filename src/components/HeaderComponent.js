import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

import "../sass/header.scss";

function HeaderComponent() {
  return (
    <>
      <div className="header-top">
        <div className="header-top--social-media-container">
          <a href="#" className="social-link">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" className="social-link">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="#" className="social-link">
            <i className="bi bi-instagram"></i>
          </a>
        </div>
        <div>
          <p>Business Hours: Mon‑Sun 09:00AM‑07:00PM</p>
        </div>
        <div>
          <p>Call now: (65) 86958239</p>
        </div>
      </div>
      <Navbar bg="white" expand="lg">
        <Navbar.Brand href="/home">
          <img
            src="http://livedemo.in.net/zuesmobileshop/wp-content/uploads/2021/05/ZuesGlobe2019-min3.png"
            className="logo-img"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">HOME</Nav.Link>
            <Nav.Link href="/repair">SERVICE</Nav.Link>
            <Nav.Link href="/sell-device">SELL MOBILE</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default HeaderComponent;
