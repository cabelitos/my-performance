import React from 'react';
import { Formik, FormikProps } from 'formik';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { set as setDate } from 'date-fns';

import FormSchemas from '../../schema/forms';
import FormInputText from '../../components/FormInputText';
import FormDateTimeInput, {
  DateTimeInputType,
} from '../../components/FormDateTimeInput';
import useAddPerformanceEntry from '../../graphql/add-performance';
import useShowSnackBar from '../../hooks/useShowSnackBar';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(0, 4),
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  btn: {
    alignSelf: 'center',
    marginBottom: theme.spacing(2),
  },
  spacer: {
    marginBottom: theme.spacing(4),
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
}));

interface FormValues {
  calories: string;
  distance: string;
  energy: string;
  date: Date;
  time: Date;
}

const Constants = {
  dummyValues: {
    calories: '',
    distance: '',
    energy: '',
    date: '',
    time: '',
  },
  dateKeyboardButtonProps: { 'aria-label': 'Change date' },
  timeKeyboardButtonProps: { 'aria-label': 'Change time' },
};

const AddPerformance = (): JSX.Element => {
  const styles = useStyles();
  const initialValues = React.useMemo(
    (): FormValues => ({
      ...Constants.dummyValues,
      date: new Date(),
      time: new Date(),
    }),
    [],
  );
  const [addPerformanceEntry, { data, error }] = useAddPerformanceEntry();
  useShowSnackBar('Performance entry saved', !!data, error);
  const onSubmit = React.useCallback(
    ({
      calories,
      distance,
      energy,
      date,
      time,
    }: FormValues): ReturnType<typeof addPerformanceEntry> =>
      addPerformanceEntry({
        variables: {
          input: {
            date: setDate(new Date(date), {
              hours: time.getHours(),
              minutes: time.getMinutes(),
            }).toISOString(),
            calories: parseInt(calories, 10),
            distance: parseInt(distance, 10),
            energy: parseInt(energy, 10),
          },
        },
      }),
    [addPerformanceEntry],
  );
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={FormSchemas.performanceEntry}
    >
      {({
        handleSubmit,
        isSubmitting,
      }: FormikProps<FormValues>): JSX.Element => (
        <form
          onSubmit={handleSubmit}
          className={styles.root}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h2" className={styles.title}>
            New Performance Metric
          </Typography>
          <FormInputText
            required
            name="calories"
            label="Calories"
            className={styles.spacer}
          />
          <FormInputText
            required
            label="Distance"
            name="distance"
            className={styles.spacer}
          />
          <FormInputText
            required
            name="energy"
            label="Energy"
            className={styles.spacer}
          />
          <FormDateTimeInput
            className={styles.spacer}
            name="date"
            disableFuture
            type={DateTimeInputType.date}
            margin="normal"
            label="Class date"
            format="dd/MM/yyyy"
            KeyboardButtonProps={Constants.dateKeyboardButtonProps}
          />
          <FormDateTimeInput
            className={styles.spacer}
            type={DateTimeInputType.time}
            margin="normal"
            ampm={false}
            label="Class time"
            KeyboardButtonProps={Constants.timeKeyboardButtonProps}
            name="time"
          />
          {isSubmitting ? (
            <div className={styles.progressContainer}>
              <CircularProgress color="primary" />
            </div>
          ) : (
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={styles.btn}
            >
              Save
            </Button>
          )}
        </form>
      )}
    </Formik>
  );
};

export default AddPerformance;
