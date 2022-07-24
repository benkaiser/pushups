import { daysSinceStart, getAllTimeGoal, getGoalStartDay, goalForDay } from '../data/goals';
import { getAllCount, getLogCountForDayNumebr } from '../data/logs';
import Button from 'react-bootstrap/Button';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { dayNumber } from '../utils/daynumber';
import { ApexOptions } from 'apexcharts';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

type IMode = 'week' | 'month' | 'all';

function getSeriesFor(mode: IMode) {
  const xSeries = [];
  const goalSeries = [];
  const completedSeries = [];
  const numDays = {
    'week': 7,
    'month': 30,
    'all': daysSinceStart() + 1
  };
  const goalStartDay = getGoalStartDay();
  const numberOfDaysToShow = numDays[mode];
  const startDay = dayNumber(+new Date()) - numberOfDaysToShow + 1;
  Array.from({ length: numberOfDaysToShow }).forEach((_, index) => {
    xSeries.push(startDay - goalStartDay + index);
    goalSeries.push(goalForDay(startDay + index));
    completedSeries.push(getLogCountForDayNumebr(startDay + index));
  });
  return {
    xSeries,
    goalSeries,
    completedSeries
  };
}

export default function History() {
  const [mode, setMode] = React.useState<IMode>('week');

  const data = getSeriesFor(mode);
  const alltime = getAllCount();
  const allTimeGoal = getAllTimeGoal();
  const allTimeGoalDiff = alltime - allTimeGoal;

  const series = [{
    name: "Goal",
    data: data.goalSeries
  }, {
    name: "Completed",
    data: data.completedSeries
  }]

  const chartOptions: ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      dashArray: [10, 0]
    },
    title: {
      text: 'Pushup History',
      align: 'left'
    },
    colors: ['#287bb5', '#2fb380'],
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      type: 'numeric',
      categories: data.xSeries,
      decimalsInFloat: 0,
      title: {
        text: 'Days Since Starting Goal'
      }
      // categories: data.xSeries,
    }
  };

  let diffText = 'On goal';
  let diffColor = 'text-success';
  if (allTimeGoalDiff < 0) {
    diffText = Math.abs(allTimeGoalDiff) + ' behind goal';
    diffColor = 'text-warning';
  } else if (allTimeGoalDiff > 0) {
    diffText = allTimeGoalDiff + ' ahead of goal';
  }

  return (
    <React.Fragment>
      <h1>History</h1>
      <ReactApexChart options={chartOptions} series={series} type="line" height={350} />
      <ButtonGroup className='mt-2' aria-label="Chart timeframe selector">
        <Button variant={mode === 'week' ? 'primary' : 'secondary'} onClick={() => setMode('week')}>Week</Button>
        <Button variant={mode === 'month' ? 'primary' : 'secondary'} onClick={() => setMode('month')}>Month</Button>
        <Button variant={mode === 'all' ? 'primary' : 'secondary'} onClick={() => setMode('all')}>All Time</Button>
      </ButtonGroup>
      <p className='mt-2 text-center'>
        <span className='alltime'>All time: <b>{alltime}</b></span><br/>
        <span className={diffColor}>({diffText})</span>
      </p>
    </React.Fragment>
  );
};