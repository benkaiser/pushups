import { Routes, Route, HashRouter } from "react-router-dom";
import About from "./screens/About";
import Container from 'react-bootstrap/Container';
import History from "./screens/History";
import Home from "./screens/Home";
import Manual from "./screens/manual";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import ReactDOM from 'react-dom';
import Record from "./screens/Record";
import Settings from "./screens/Settings";
import Share from "./screens/Share";
import Shared from "./screens/Shared";
import toast from 'bootstrap/js/dist/toast';
import Logs from "./screens/Logs";

(window as any).bootstrap = { Toast: toast };


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
          <Route path="/history" element={<History />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/share" element={<Share />} />
          <Route path="/settings" element={<Settings />} />
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