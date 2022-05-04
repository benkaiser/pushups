import { setGoalData } from '../data/goals';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { importData } from './Settings';

interface ICreateGoalProps {
  onSetGoal: () => void;
}

export default function CreateGoal(props: ICreateGoalProps) {
  const goalStartRef = React.useRef<HTMLInputElement>();
  const goalIncreaseRef = React.useRef<HTMLInputElement>();
  const onSetGoal = () => {
    setGoalData({
      goalStart: Number(goalStartRef.current && goalStartRef.current.value),
      goalIncrease: Number(goalIncreaseRef.current && goalIncreaseRef.current.value)
    });
    props.onSetGoal();
  }

  return (
    <React.Fragment>
      <h1>Welcome, let's set your goal!</h1>
      <Form>
        <Form.Group className="mb-3" controlId="goalStart">
          <Form.Label>How many pushups would you like to start with?</Form.Label>
          <Form.Control type="number" defaultValue="10" ref={goalStartRef} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="goalIncrease">
          <Form.Label>How much should this goal increase by each day?</Form.Label>
          <Form.Control type="number" defaultValue="1" ref={goalIncreaseRef} />
        </Form.Group>
        <Button variant="primary" size='lg' type="submit" onClick={onSetGoal}>
          Let's Go!
        </Button>
      </Form>

      <h3 className='mt-4'>Have a previous export?</h3>
      <Button variant='secondary' className='mb-2' onClick={() => importData().then(_ => props.onSetGoal())}>Import data</Button>
    </React.Fragment>
  );
}