import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AutoSizer,
  Table,
  Column,
  TableHeaderProps,
  TableCellProps,
  TableCellDataGetterParams,
} from 'react-virtualized';
import { format as formatDate } from 'date-fns';

import useGetPerformanceEntries from '../../graphql/get-performance-entries';
import FullScreenLoader from '../../components/FullScreenLoader';
import ErrorView from '../../components/ErrorView';
import TableItem, { Constants as TableItemConstants } from './TableItem';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flex: 1,
    width: '100%',
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
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

enum ColumnEntryKeys {
  date = 'date',
  distance = 'distance',
  calories = 'calories',
  energy = 'energy',
  delete = 'delete',
}

interface ColumnEntry {
  dataKey: ColumnEntryKeys;
  label: string;
}

const columns: ColumnEntry[] = [
  {
    dataKey: ColumnEntryKeys.date,
    label: 'Date',
  },
  {
    dataKey: ColumnEntryKeys.distance,
    label: 'Distance\u00A0(km)',
  },
  {
    dataKey: ColumnEntryKeys.energy,
    label: 'Energy\u00A0(kJ)',
  },
  {
    dataKey: ColumnEntryKeys.calories,
    label: 'Calories\u00A0(kCal)',
  },
  {
    dataKey: ColumnEntryKeys.delete,
    label: 'Delete',
  },
];

const headerRenderer = ({
  label,
  columnData,
}: TableHeaderProps): JSX.Element => (
  <TableItem isHeader isFirst={columnData}>
    {label}
  </TableItem>
);

const cellRenderer = ({
  cellData,
  dataKey,
  columnData,
}: TableCellProps): JSX.Element => (
  <TableItem
    isHeader={false}
    id={dataKey === ColumnEntryKeys.delete ? cellData : undefined}
    isFirst={columnData}
    isDelete={dataKey === ColumnEntryKeys.delete}
  >
    {cellData}
  </TableItem>
);

const cellDataGetter = ({
  dataKey,
  rowData,
}: TableCellDataGetterParams): number | string => {
  if (dataKey === ColumnEntryKeys.date) {
    return formatDate(new Date(rowData[dataKey]), 'dd/MM/y HH:mm');
  }
  if (dataKey === ColumnEntryKeys.delete) {
    return rowData.id;
  }
  return rowData[dataKey];
};

const isFirst = { isFirst: true };

const Classes = (): JSX.Element => {
  const styles = useStyles();
  const { loading, error, refetch, data } = useGetPerformanceEntries(
    queryOptions,
  );
  const onRetry = React.useCallback((): void => {
    refetch();
  }, [refetch]);

  const rowGetter = React.useCallback(
    ({ index }: { index: number }) =>
      data ? data.performanceEntries.entries[index] : null,
    [data],
  );

  if (loading) {
    return <FullScreenLoader />;
  }

  if (error || !data) {
    return <ErrorView onClick={onRetry} />;
  }

  const {
    performanceEntries: { totalCount },
  } = data;

  return (
    <div className={styles.container}>
      <AutoSizer>
        {({ height, width }): JSX.Element => (
          <Table
            rowGetter={rowGetter}
            rowCount={totalCount}
            height={height}
            width={width}
            rowClassName={styles.flexContainer}
            rowHeight={TableItemConstants.itemHeight}
            headerHeight={TableItemConstants.headerHeight}
          >
            {columns.map(
              ({ dataKey, label }: ColumnEntry, i: number): JSX.Element => (
                <Column
                  disableSort
                  className={styles.flexContainer}
                  columnData={!i ? isFirst : undefined}
                  label={label}
                  key={dataKey}
                  width={width / columns.length}
                  dataKey={dataKey}
                  cellRenderer={cellRenderer}
                  headerRenderer={headerRenderer}
                  cellDataGetter={cellDataGetter}
                />
              ),
            )}
          </Table>
        )}
      </AutoSizer>
    </div>
  );
};

export default Classes;
