import React from 'react';
import { Formik, FormikProps } from 'formik';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import FormSchemas from '../../schema/forms';
import FormInputText from '../../components/FormInputText';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(0, 2),
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(4),
  },
}));

interface FormValues {
  calories: string;
  distance: string;
  energy: string;
  date: string;
}

const initialValues = {
  calories: '',
  date: '',
  distance: '',
  energy: '',
};

const AddPerformance = (): JSX.Element => {
  const styles = useStyles();
  return (
    <Formik
      onSubmit={(): void => {}}
      initialValues={initialValues}
      validationSchema={FormSchemas.performanceEntry}
    >
      {({ handleSubmit }: FormikProps<FormValues>): JSX.Element => (
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
            className={styles.textField}
          />
          <FormInputText
            required
            label="Distance"
            name="distance"
            className={styles.textField}
          />
          <FormInputText
            required
            name="energy"
            label="Energy"
            className={styles.textField}
          />
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default AddPerformance;
