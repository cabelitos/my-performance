import * as Yup from 'yup';

const numberValidator = (fieldName: string): Yup.NumberSchema =>
  Yup.number()
    .positive(`${fieldName} must be positive`)
    .required(`${fieldName} is required`);

const dateValidator = (fieldName: string): Yup.Lazy =>
  Yup.lazy(
    (): Yup.DateSchema =>
      Yup.date()
        .max(new Date(), `${fieldName} can't be in the future`)
        .required(`${fieldName} is Required`),
  );

export default {
  performanceEntry: Yup.object().shape({
    calories: numberValidator('Calories'),
    distance: numberValidator('Distance'),
    energy: numberValidator('Energy'),
    date: dateValidator('Date'),
    time: dateValidator('Time'),
  }),
};
