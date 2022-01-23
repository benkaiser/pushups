import React from 'react';
import ShareComponent from '../components/ShareComponent';
import { useNavigate } from "react-router-dom";
import { setGoalData } from '../data/goals';

export default function Shared() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');
  const gravatar = params.get('gravatar');
  const goal = parseInt(params.get('goal'));
  const increase = parseInt(params.get('increase'));
  const navigate = useNavigate();
  const setGoal = React.useCallback(() => {
    setGoalData({
      goalStart: goal,
      goalIncrease: increase
    });
    const urlWithoutParams = window.location.href.split('?')[0] + '#' + window.location.href.split('#')[1];
    window.history.replaceState({}, undefined, urlWithoutParams);
    navigate('/');
  }, [goal, increase]);
  return (
    <React.Fragment>
      <ShareComponent name={name} gravatar={gravatar} goal={goal} increase={increase} onClick={setGoal} />
    </React.Fragment>
  );
}