import { dayNumber } from "../utils/daynumber";

interface IGoalData {
  goalStart: number;
  goalIncrease: number;
  startDay: number;
}

export function readGoal(): IGoalData | undefined {
  try {
    return JSON.parse(localStorage.getItem('goal')) || undefined;
  } catch {
    return undefined;
  }
}

export function setGoalData(goalData: Omit<IGoalData, 'startDay'>) {
  const startDay = dayNumber(+new Date());
  localStorage.setItem('goal', JSON.stringify({ ...goalData, startDay: startDay }));
}

export function getTodayGoal() {
  const goal = readGoal();
  const today = dayNumber(+new Date());
  const dayDiff =  today - goal.startDay;
  const todaysGoal = goal.goalStart + goal.goalIncrease * dayDiff;
  return todaysGoal;
}

export function getIncrease() {
  const goal = readGoal();
  return goal.goalIncrease;
}