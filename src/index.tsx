import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";

const Home = function() {
  return (
    <div>
      <h1>Record Some Push Ups</h1>
      <Link to="/record"><Button variant="primary" size="lg">Record</Button></Link>
    </div>
  );
}

const DEBOUNCE_TIMEOUT = 300;
const Record = function() {
  const [count, setCount] = React.useState(0);
  const [touching, setTouching] = React.useState(false);
  const [ignore, setIgnore] = React.useState(false);

  return (
    <div
      className={'clickSurface ' + (touching ? 'touching': '')}
      onTouchStart={() => {
        if (ignore) {
          return;
        }
        setTouching(true)
      }}
      onTouchEnd={() => {
        if (ignore) {
          return;
        }
        setTouching(false);
        setCount(count => count + 1);
        setIgnore(true);
        setTimeout(() => setIgnore(false), DEBOUNCE_TIMEOUT);
      }}
    >
      <div className='counter display-1'>{ count }</div>
    </div>
  )
}

const About = function() {
  return (
    <h1>About</h1>
  );
}

const App = function() {
  return (
    <React.Fragment>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            Mono Pushups
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
          </Nav>
        </Container>
      </Navbar>
      <div className='container mainContent'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/record" element={<Record />} />
          <Route path="about" element={<About />} />
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