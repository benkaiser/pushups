import { getTodayCount } from '../data/logs';
import { getTodayGoal, readGoal } from '../data/goals';
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import CreateGoal from './CreateGoal';
import React from 'react';

function TodayInfo() {
  const count = getTodayCount();
  const goal = getTodayGoal();
  if (count === goal) {
    return (
      <Alert variant={'success'}>
        You reached your goal of {goal} pushups today!
      </Alert>
    );
  } else if (count > goal) {
    return (
      <Alert variant={'success'}>
        You smashed your goal of {goal} by doing {count - goal} extra pushups today!
      </Alert>
    );
  } else if (count < goal) {
    return (
      <Alert variant={'info'}>
        {goal - count} more pushups to go today!
      </Alert>
    );
  }
}

function GoalRenderer() {
  return (
    <React.Fragment>
      <h1>Record Some Push Ups</h1>
      <TodayInfo />
      <p>
        <Link className='d-flex' to="/record"><Button className='flex-grow-1' variant="primary" size="lg">Record Pushups</Button></Link>
      </p>
      <p>
        <Link className='d-flex' to="/manual"><Button className='flex-grow-1' variant="primary" size="lg">Manual Entry</Button></Link>
      </p>
      <p className='d-flex mt-auto'>
        <Button href="#/share" className='flex-grow-1' variant="info" size="lg">Share Goal</Button>
      </p>
    </React.Fragment>
  );
}

export default function Home() {
  const [goal, setGoal] = React.useState(readGoal());

  return (
    <React.Fragment>
      { goal ? <GoalRenderer /> : <CreateGoal onSetGoal={() => setGoal(readGoal())} />}
    </React.Fragment>
  );
}