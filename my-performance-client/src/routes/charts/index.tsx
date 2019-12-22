import React from 'react';
import * as chartjs from 'chart.js';
import { Line, ChartData } from 'react-chartjs-2';
import { useTheme, makeStyles } from '@material-ui/core/styles';

import LoaderView from '../../components/LoaderView';
import useGetPerformanceEntries from '../../graphql/get-performance-entries';
import { PerformanceEntries_performanceEntries_entries as PerfEntry } from '../../graphql/get-performance-entries/__generated__/PerformanceEntries';

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    position: 'relative',
  },
}));

const queryOptions = {
  notifyOnNetworkStatusChange: true,
  variables: {
    end: null,
    // TODO - Implement pagination with react-virtualized infinite scrolling
    first: null,
    skip: null,
    start: null,
  },
};

const baseDataSets: chartjs.ChartDataSets = {
  fill: false,
  lineTension: 0.1,
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
};

interface Point {
  x: Date;
  y: number;
}

interface Data {
  calories: Point[];
  distance: Point[];
  energy: Point[];
}

const Charts = (): JSX.Element | null => {
  const { loading, error, refetch, data } = useGetPerformanceEntries(
    queryOptions,
  );
  const styles = useStyles();
  const theme = useTheme();

  const onRetry = React.useCallback((): void => {
    refetch();
  }, [refetch]);

  const dataSets = React.useMemo(
    (): { [key: string]: chartjs.ChartDataSets } => ({
      distance: {
        ...baseDataSets,
        backgroundColor: theme.palette.primary.dark,
        borderColor: theme.palette.primary.dark,
        label: 'Distance',
      },
      energy: {
        ...baseDataSets,
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        label: 'Energy',
      },
      calories: {
        ...baseDataSets,
        backgroundColor: theme.palette.primary.light,
        borderColor: theme.palette.primary.light,
        label: 'Calories',
      },
    }),
    [theme],
  );

  const chartOptions = React.useMemo(
    (): chartjs.ChartOptions => ({
      responsive: true,
      maintainAspectRatio: false,
      legend: { labels: { fontColor: theme.palette.text.primary } },
      scales: {
        yAxes: [
          {
            gridLines: {
              color: theme.palette.grey[800],
            },
            scaleLabel: {
              display: true,
              fontColor: theme.palette.text.primary,
              labelString: 'Values',
            },
            ticks: {
              fontColor: theme.palette.text.primary,
            },
          },
        ],
        xAxes: [
          {
            type: 'time',
            distribution: 'linear',
            time: {
              minUnit: 'day',
              unit: 'day',
              displayFormats: {
                day: 'DD/MM/YYYY',
              },
            },
            gridLines: {
              color: theme.palette.grey[800],
            },
            scaleLabel: {
              display: true,
              fontColor: theme.palette.text.primary,
              labelString: 'Time',
            },
            ticks: {
              fontColor: theme.palette.text.primary,
            },
          },
        ],
      },
      title: {
        display: true,
        fontColor: theme.palette.text.primary,
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: 25,
        text: 'My performance chart',
      },
    }),
    [theme],
  );

  const chartData = React.useMemo((): ChartData<chartjs.ChartData> => {
    const r: chartjs.ChartData = {};
    if (!data) return r;
    const {
      performanceEntries: { entries },
    } = data;
    r.datasets = Object.entries(
      entries.reduce(
        (acc: Data, { calories, distance, energy, date }: PerfEntry): Data => {
          acc.calories.push({ y: calories, x: date });
          acc.distance.push({ y: distance, x: date });
          acc.energy.push({ y: energy, x: date });
          return acc;
        },
        {
          calories: [],
          distance: [],
          energy: [],
        },
      ),
    ).map(
      ([key, value]: [string, unknown]): chartjs.ChartDataSets => ({
        ...dataSets[key],
        data: value as chartjs.ChartPoint[],
      }),
    );
    return r;
  }, [data, dataSets]);

  return (
    <LoaderView data={data} loading={loading} error={error} onRetry={onRetry}>
      <div className={styles.container}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </LoaderView>
  );
};

export default Charts;
