/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react';
import { useField, useFormikContext } from 'formik';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MaterialUiPickersDate,
} from '@material-ui/pickers';

export enum DateTimeInputType {
  date = 'date',
  time = 'time',
}

interface Props {
  type: DateTimeInputType;
  name: string;
  [key: string]: unknown;
}

const FormDateTimeInput = ({ name, type, ...rest }: Props): JSX.Element => {
  const [{ value, onBlur }, { error, touched }] = useField(name);
  const { setFieldValue } = useFormikContext<unknown>();
  const handleOnChange = React.useCallback(
    (date: MaterialUiPickersDate | null): void => {
      // @ts-ignore - The name will be there...
      setFieldValue(name, date, true);
    },
    [name, setFieldValue],
  );
  const hasError = !!error && touched;
  const Component =
    type === DateTimeInputType.date ? KeyboardDatePicker : KeyboardTimePicker;
  return (
    <Component
      {...rest}
      onBlur={onBlur}
      inputVariant="outlined"
      key={error}
      name={name}
      helperText={hasError ? error : ''}
      error={hasError}
      value={value}
      onChange={handleOnChange}
    />
  );
};

export default FormDateTimeInput;
