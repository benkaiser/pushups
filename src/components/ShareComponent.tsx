import Card from 'react-bootstrap/Card';
import React from 'react';
import Button from 'react-bootstrap/Button';

export interface IShareComponentProps {
  gravatar?: string;
  name?: string;
  goal: number;
  increase: number;
  onClick: () => void;
}

export default function ShareComponent({ gravatar, name, goal, increase, onClick }: IShareComponentProps) {
  return (
    <Card className='text-center w-100'>
      <Card.Body>
        { gravatar && <Card.Text className='text-center'>
          <img className='shareImage' src={`https://s.gravatar.com/avatar/${gravatar}?s=200`} />
        </Card.Text> }
        <Card.Title>Join My Pushup Challenge!</Card.Title>
        <Card.Text>
          {name} is doing {goal} pushups today, and increasing by {increase} every day!
        </Card.Text>
        <Button variant="primary" className='w-100' onClick={onClick}>Let's go!</Button>
      </Card.Body>
    </Card>
  );
}