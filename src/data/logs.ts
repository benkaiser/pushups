import { dayNumber } from "../utils/daynumber";
import { getTodayGoal } from "./goals";

export interface ILogData {
  date: number;
  numberOfPushups: number;
}

export function readLogData(): ILogData[] {
  try {
    return JSON.parse(localStorage.getItem('logData')) || [];
  } catch {
    return [];
  }
}

export function addToLogData(newLogData: ILogData) {
  const logData = readLogData();
  logData.push(newLogData);
  localStorage.setItem('logData', JSON.stringify(logData));
}

export function getTodayCount() {
  const logs = readLogData();
  const today = dayNumber(+new Date());
  const pushupsDone = logs
    .filter((log) => today == dayNumber(log.date))
    .reduce((previousValue: number, currentValue) => { return previousValue + currentValue.numberOfPushups }, 0);
  return pushupsDone;
}

export function recordPushups(numberOfPushups: number): void {
  addToLogData({date: +new Date(), numberOfPushups});

  const count = getTodayCount();
  const goal = getTodayGoal();
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
      serviceWorkerRegistration.getNotifications().then(notifications => {
        notifications.forEach(notification => notification.close());
        if (count < goal) {
          serviceWorkerRegistration.showNotification('Pushup Time', { body: `${goal - count} more to hit your daily goal` })
        }
      });
    });
  }
}
