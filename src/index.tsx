/// <reference no-default-lib="true"/>
/// <reference lib="es2020" />
/// <reference lib="dom" />

import { Routes, Route, Link, HashRouter } from "react-router-dom";
import About from "./screens/About";
import Container from 'react-bootstrap/Container';
import Home from "./screens/Home";
import Manual from "./screens/manual";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import ReactDOM from 'react-dom';
import Record from "./screens/Record";
import Share from "./screens/Share";
import Shared from "./screens/Shared";

const App = function() {
  return (
    <React.Fragment>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="#/">
            More Pushups
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <Nav.Link href="#/">Home</Nav.Link>
              <Nav.Link href="#/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='container mainContent'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/record" element={<Record />} />
          <Route path="/manual" element={<Manual />} />
          <Route path="/share" element={<Share />} />
          <Route path="/shared" element={<Shared />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js');
}