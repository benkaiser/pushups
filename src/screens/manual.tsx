import { getTodayGoal } from '../data/goals';
import { getTodayCount, recordPushups } from '../data/logs';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export default function Manual() {
  const pushupsDoneRef = React.useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const onSavePushups = React.useCallback(() => {
    recordPushups(Number(pushupsDoneRef.current.value));
    navigate('/');
  }, []);
  const onSavePushupsNum = React.useCallback((numPushups: number) => {
    recordPushups(numPushups);
    navigate('/');
  }, []);
  const goal = getTodayGoal();
  const count = getTodayCount();
  const sizes = [5, 10, 15, 20, 25, 30];

  return (
    <React.Fragment>
      <h1>Enter Your Pushups!</h1>
      <p>Manually enter the number of pushups you completed:</p>
      <Form>
        <Form.Group className="mb-3" controlId="goalStart">
          <Form.Control type="number" defaultValue={goal - count} ref={pushupsDoneRef} />
        </Form.Group>
        <Button variant="success" size='lg' type="submit" onClick={onSavePushups}>
          Save
        </Button>
        <h3 className='mt-4'>Quick Entry</h3>
        <Row>
          {sizes.map(size =>
            <Col key={size} xs='6' sm='4' className='mt-3'><div className='d-flex'><Button variant='info' className='flex-grow-1' onClick={onSavePushupsNum.bind(this, size)}>{size}</Button></div></Col>
          )}
        </Row>
      </Form>
    </React.Fragment>
  );
};