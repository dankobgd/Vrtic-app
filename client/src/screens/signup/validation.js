import * as Yup from 'yup';

const signumSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(5)
    .max(300)
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'passwords do not match')
    .required(),
});

export default signumSchema;
