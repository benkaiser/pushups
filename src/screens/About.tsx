import React from 'react';
import Button from 'react-bootstrap/Button';

export default function About() {
  return (
    <React.Fragment>
      <h1>About</h1>
      <p>
        This is a passion project from <a href='https://benkaiser.dev/about/' target='_blank'>Benjamin Kaiser</a>.
      </p>
      <p>
        <Button href='https://github.com/benkaiser/pushups' target='_blank'>Source code available here on Github.</Button>
      </p>
    </React.Fragment>
  );
}