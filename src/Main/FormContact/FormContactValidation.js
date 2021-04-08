import * as Yup from 'yup';

const contactValidation = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required'),
  lastName: Yup.string()
    .required('Last name is required'),
  age: Yup.number()
    .required('Usia is required').nullable(),
});

export default contactValidation;