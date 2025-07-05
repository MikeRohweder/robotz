import * as yup from 'yup';

export const teacherInfoSchema = yup.object({
    teacherName: yup.string().required('Name is required'),
    teacherEmail: yup.string().email('Invalid email').required('Email is required'),
});
