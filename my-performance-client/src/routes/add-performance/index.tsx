import React from 'react';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { set as setDate } from 'date-fns';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';

import FormSchemas from '../../schema/forms';
import FormInputText from '../../components/FormInputText';
import FormDateTimeInput, {
  DateTimeInputType,
} from '../../components/FormDateTimeInput';
import useAddPerformanceEntry from '../../graphql/add-performance';
import useShowSnackBar from '../../hooks/useShowSnackBar';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
    flexGrow: 1,
    flexShrink: 0,
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  btn: {
    alignSelf: 'center',
  },
  spacer: {
    marginBottom: theme.spacing(4),
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
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
  inputProps: {
    inputMode: 'numeric',
    pattern: '[0-9]*',
  } as InputBaseComponentProps,
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
    async (
      { calories, distance, energy, date, time }: FormValues,
      { resetForm }: FormikHelpers<FormValues>,
    ): Promise<void> => {
      await addPerformanceEntry({
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
      });
      resetForm();
    },
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
            inputProps={Constants.inputProps}
            type="number"
            name="calories"
            label="Calories"
            className={styles.spacer}
          />
          <FormInputText
            required
            type="number"
            inputProps={Constants.inputProps}
            label="Distance"
            name="distance"
            className={styles.spacer}
          />
          <FormInputText
            required
            type="number"
            inputProps={Constants.inputProps}
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
