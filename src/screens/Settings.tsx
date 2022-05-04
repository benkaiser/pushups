import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import bs5 from 'bs5-toast';
import { readLogData, setLogDataRaw } from '../data/logs';
import { readGoal, setGoalDataRaw } from '../data/goals';
import dayjs from 'dayjs';

const endpoint = 'https://notification.kaiser.lol';
function disableNotifications(): Promise<void> {
  return navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
    return serviceWorkerRegistration.pushManager
    .getSubscription()
    .then((pushSubscription) => {
      if (pushSubscription) {
        return fetch(`${endpoint}/unsubscribe`, {
          method: 'POST',
          body: JSON.stringify({
            endpoint: pushSubscription.endpoint
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(() => pushSubscription.unsubscribe())
        .then(() => {});
      }
    });
  });
}

function exportData() {
  const logData = readLogData();
  const goalData = readGoal();
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
    logData,
    goalData
  }));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", `data-export-${dayjs().format('YYYY-MM-DD')}.json`);
  downloadAnchorNode.click();
}

function importDataInternal(callback, event) {
  const { logData, goalData } = JSON.parse(event.currentTarget.result);
  setGoalDataRaw(goalData);
  setLogDataRaw(logData);
  callback();
}

export function importData(): Promise<void> {
  let resolve;
  const importPromise = new Promise<void>((r) => resolve = r);
  var inputElement = document.createElement('input');
  inputElement.setAttribute('type', 'file');
  inputElement.addEventListener('change', (event: any) => {
    const reader = new FileReader();
    reader.onload = importDataInternal.bind(this, resolve)
    reader.onerror = error => console.error(error)
    reader.readAsText(event.target.files[0]);
  });
  inputElement.click();
  return importPromise;
}

export default function Settings() {
  const timeRef = React.useRef<HTMLInputElement>();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const enableNotificationsClick = React.useCallback(() => {
    const [chosenHours, chosenMinutes] = timeRef.current.value.split(':');
    (window as any).notificationScheduler({
      interval: `${chosenMinutes} ${chosenHours} * * *`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    })
    .then(_ => {
      new bs5.Toast({
        body: notificationsEnabled ? 'Notification time updated' : 'Notifications enabled',
        className: 'border-0 bg-success text-white',
        placement: 'bottom-right',
        btnCloseWhite: true,
      }).show();
      setNotificationsEnabled(true);
    })
    .catch((error) => {
      console.error(error);
      new bs5.Toast({
        header: 'Unable to set notifications',
        body: 'Check your site notification settings',
        className: 'border-0 bg-danger text-white',
        placement: 'bottom-right',
        btnCloseWhite: true,
      }).show();
    });
  }, [notificationsEnabled]);
  const disableNotificationsClick = React.useCallback(() => {
    disableNotifications();
  }, []);
  React.useEffect(() => {
    navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
      return serviceWorkerRegistration.pushManager
      .getSubscription()
      .then((pushSubscription) => {
        if (pushSubscription) {
          setNotificationsEnabled(true);
        }
      });
    });
  });
  return (
    <React.Fragment>
      <h2>Notifications</h2>
      <p>
        What time of day would you like your notifications?
      </p>
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Time of Day</Form.Label>
          <Form.Control
            type="time"
            defaultValue="08:00"
            ref={timeRef}
          />
        </Form.Group>
      </Form>
      <Button variant='primary' className='mb-2' onClick={enableNotificationsClick}>{ notificationsEnabled ? 'Update Notifications' : 'Enable Notifications' }</Button>
      <Button variant='danger' onClick={disableNotificationsClick}>Disable Notifications</Button>
      <h2 className='mt-4'>Data</h2>
      <Button variant='secondary' className='mb-2' onClick={exportData}>Export data</Button>
      <Button variant='secondary' className='mb-2' onClick={importData}>Import data</Button>
    </React.Fragment>
  );
}