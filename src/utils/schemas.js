import * as Yup from 'yup';


const newContactSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    surname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string()
        .min(11, 'Short!')
        .max(20, 'Long!')
        .required('Required')
});

export { newContactSchema }