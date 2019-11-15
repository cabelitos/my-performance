import * as Yup from 'yup';

const numberValidator = (fieldName: string): Yup.NumberSchema =>
  Yup.number()
    .positive(`${fieldName} must be positive`)
    .required(`${fieldName} is required`);

export default {
  performanceEntry: Yup.object().shape({
    calories: numberValidator('Calories'),
    distance: numberValidator('Distance'),
    energy: numberValidator('Energy'),
  }),
};
