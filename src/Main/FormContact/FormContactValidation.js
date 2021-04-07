import * as Yup from 'yup';

const contactValidation = Yup.object().shape({
  firstName: Yup.string()
    .required('First name wajib diisi'),
  lastName: Yup.string()
    .required('Last name wajib diisi'),
  age: Yup.number()
    .required('Usia wajib diisi').nullable(),
});

export default contactValidation;