import { getTodayGoal } from '../data/goals';
import { recordPushups } from '../data/logs';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';


export default function Manual() {
  const pushupsDoneRef = React.useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const onSavePushups = React.useCallback(() => {
    recordPushups(Number(pushupsDoneRef.current.value));
    navigate('/');
  }, []);
  const goal = getTodayGoal();

  return (
    <React.Fragment>
      <h1>Enter Your Pushups!</h1>
      <p>Manually enter the number of pushups you did outside the app today</p>
      <Form>
        <Form.Group className="mb-3" controlId="goalStart">
          <Form.Control type="number" defaultValue={goal} ref={pushupsDoneRef} />
        </Form.Group>
        <Button variant="success" size='lg' type="submit" onClick={onSavePushups}>
          Save
        </Button>
      </Form>
    </React.Fragment>
  );
};