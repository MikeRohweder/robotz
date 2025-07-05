import * as yup from 'yup';

export const parentInfoSchema = yup.object({
    parentName: yup.string().required('Name is required'),
    parentEmail: yup.string().email('Invalid email').required('Email is required'),
    parentPhone: yup.string().required('Phone number is required'),
});
