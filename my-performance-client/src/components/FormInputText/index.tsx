import React from 'react';
import { useField } from 'formik';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

interface Props extends Omit<TextFieldProps, 'name'> {
  name: string;
}

const FormInputText = ({ name, ...rest }: Props): JSX.Element => {
  const [{ onBlur, onChange, value }, { touched, error }] = useField(name);
  const hasError = touched && !!error;
  return (
    <TextField
      {...rest}
      error={hasError}
      helperText={hasError ? error : ''}
      onBlur={onBlur}
      value={value}
      onChange={onChange}
      name={name}
      margin="normal"
      variant="outlined"
    />
  );
};

export default FormInputText;
