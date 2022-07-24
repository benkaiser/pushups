import { getTodayCount } from '../data/logs';
import { getTodayGoal, readGoal } from '../data/goals';
import { Link } from "react-router-dom";
import { Calendar, Calculator, RecordCircle, Share, Gear } from 'react-bootstrap-icons';
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
        <Link className='d-flex' to="/record"><Button className='flex-grow-1' variant="primary" size="lg"><RecordCircle size={24} className='me-2' /> Record Pushups</Button></Link>
      </p>
      <p>
        <Link className='d-flex text-decoration-none' to="/manual"><Button className='flex-grow-1' variant="secondary" size="lg"><Calculator size={24} className='me-2' /> Manual Entry</Button></Link>
      </p>
      <p>
        <Link className='d-flex text-decoration-none' to="/history"><Button className='flex-grow-1' variant="secondary" size="lg"><Calendar size={24} className='me-2' /> History</Button></Link>
      </p>
      <p>
        <Link className='d-flex text-decoration-none' to="/logs"><Button className='flex-grow-1' variant="secondary" size="lg"><Calendar size={24} className='me-2' /> Log</Button></Link>
      </p>
      <p className='d-flex mt-auto'>
        <Button href="#/settings" className='flex-grow-1' variant="info" size="lg"><Gear size={24} className='me-2' /> Settings</Button>
      </p>
      <p className='d-flex'>
        <Button href="#/share" className='flex-grow-1' variant="info" size="lg"><Share size={24} className='me-2' /> Share Goal</Button>
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