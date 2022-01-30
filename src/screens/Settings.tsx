import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import bs5 from 'bs5-toast';

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

function ensurePermission(): Promise<void> {
  if (Notification.permission === "granted") {
    return Promise.resolve();
  }
  return Notification.requestPermission().then(function (permission) {
    // If the user accepts, let's create a notification
    if (permission === "granted") {
      return Promise.resolve();
    } else {
      return Promise.reject('Permission denied');
    }
  });
}

export default function Settings() {
  const timeRef = React.useRef<HTMLInputElement>();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const enableNotificationsClick = React.useCallback(() => {
    const [chosenHours, chosenMinutes] = timeRef.current.value.split(':');
    ensurePermission()
    .then(() => {
      fetch(`${endpoint}/vapid`)
      .then(response => response.text())
      .then(vapidKey => {
        navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
          disableNotifications().then(() => {
            var options = {
              userVisibleOnly: true,
              applicationServerKey: vapidKey
            };
            serviceWorkerRegistration.pushManager.subscribe(options)
            .then((pushSubscription) => {
                fetch(`${endpoint}/subscribe`, {
                  method: 'POST',
                  body: JSON.stringify({
                    subscription: pushSubscription,
                    interval: `${chosenMinutes} ${chosenHours} * * *`,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                  }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
                .then(() => {
                  new bs5.Toast({
                    body: notificationsEnabled ? 'Notification time updated' : 'Notifications enabled',
                    className: 'border-0 bg-success text-white',
                    placement: 'bottom-right',
                    btnCloseWhite: true,
                  }).show();
                  setNotificationsEnabled(true);
                })
                .catch(() => console.log('Failed to create push subscription'));
              }, function(error) {
                console.log(error);
                console.log('Failed to request notification permission')
              }
            );
          });
        });
      });
    });
  }, []);
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
    </React.Fragment>
  );
}