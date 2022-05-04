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

export function setGoalDataRaw(goalData: IGoalData) {
  localStorage.setItem('goal', JSON.stringify(goalData));
}

export function setGoalData(goalData: Omit<IGoalData, 'startDay'>) {
  const startDay = dayNumber(+new Date());
  localStorage.setItem('goal', JSON.stringify({ ...goalData, startDay: startDay }));
}

export function daysSinceStart() {
  const goal = readGoal();
  const today = dayNumber(+new Date());
  return today - goal.startDay;
}

export function getTodayGoal() {
  const goal = readGoal();
  const dayDiff = daysSinceStart();
  return goal.goalStart + goal.goalIncrease * dayDiff;
}

export function getAllTimeGoal() {
  const goal = readGoal();
  const dayDiff = daysSinceStart();
  return Array.from({ length: dayDiff + 1 }).reduce<number>((counter, _, index) => counter + goal.goalStart + index * goal.goalIncrease, 0);
}

export function goalForDay(day: number) {
  const goal = readGoal();
  const dayDiff = day - goal.startDay;
  return goal.goalStart + goal.goalIncrease * dayDiff;
}

export function getGoalStartDay() {
  const goal = readGoal();
  return goal.startDay;
}

export function getGoalIncrease() {
  const goal = readGoal();
  return goal.goalIncrease;
}

export function getGoalStart() {
  const goal = readGoal();
  return goal.goalStart;
}