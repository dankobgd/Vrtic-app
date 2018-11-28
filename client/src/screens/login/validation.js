import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(5)
    .max(300)
    .required(),
});

export default loginSchema;
