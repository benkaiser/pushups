import { deleteLog, getTodayLogs, ILogData } from '../data/logs';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import dayjs from 'dayjs';

export default function Logs() {
  const [logs, setLogs] = useState(getTodayLogs());

  function deleteEntry(log: ILogData) {
    deleteLog(log);
    setLogs(getTodayLogs());
  }

  return (
    <React.Fragment>
      <h1>Log</h1>
      <ListGroup className='mt-2'>
        { logs.map((log) =>
          <ListGroupItem>
            <span className='log-line'>
              <span className='text-muted'>{dayjs(log.date).format('hh:mm A')}</span> {log.numberOfPushups} { log.numberOfPushups === 1 ? 'pushup' : 'pushups' }
            </span>
            <Button size='sm' variant='danger' className='float-end' onClick={deleteEntry.bind(this, log)}>X</Button>
          </ListGroupItem>
        ) }
      </ListGroup>
    </React.Fragment>
  );
};