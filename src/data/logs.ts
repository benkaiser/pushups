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

export function getAllCount() {
  const logs = readLogData();
  const pushupsDone = logs
    .reduce((previousValue: number, currentValue) => previousValue + currentValue.numberOfPushups, 0);
  return pushupsDone;
}

export function getLogCountForDayNumebr(day: number) {
  const logs = readLogData();
  const pushupsDone = logs
    .filter((log) => day == dayNumber(log.date))
    .reduce((previousValue: number, currentValue) => previousValue + currentValue.numberOfPushups, 0);
  return pushupsDone;
}

export function getTodayCount() {
  return getLogCountForDayNumebr(dayNumber(+new Date()));
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
