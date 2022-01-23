import { getTodayCount, recordPushups } from '../data/logs';
import { Check } from 'react-bootstrap-icons';
import { getTodayGoal } from '../data/goals';
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import React from 'react';

const DEBOUNCE_TIMEOUT = 300;
export default function Record() {
  const [count, setCount] = React.useState(0);
  const [touching, setTouching] = React.useState(false);
  const [ignore, setIgnore] = React.useState(false);
  const navigate = useNavigate();
  const save = React.useCallback(() => {
    recordPushups(count);
    navigate('/');
  }, [count]);

  const completedPushups = getTodayCount() + count;
  const goal = getTodayGoal();
  let message = '';
  let messageVariant = 'success';
  if (completedPushups < goal) {
    message = `${goal - completedPushups} left to go!`;
    messageVariant = 'primary';
  } else if (completedPushups === goal) {
    message = 'Goal achieved!';
  } else {
    message = 'You\'re killing it!';
  }

  return (
    <React.Fragment>
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
      <Alert variant={messageVariant} className='goalInfo'>{message}</Alert>
      <Button className='saveBtn' variant='success' size='sm' onClick={save}><Check size={48} /></Button>
    </React.Fragment>
  )
}