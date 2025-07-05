import * as yup from 'yup';

export const studentInfoSchema = yup.object({
    studentName: yup.string().required('Name is required'),
    studentEmail: yup.string().email('Invalid email').required('Email is required'),
    studentPhone: yup.string().required('Phone number is required'),
    studentShirtSize: yup.string().required('T-shirt size is required'),
    studentGrade: yup.number().min(1).max(12).required('Grade is required'),
    studentSchoolName: yup.string().required('School name is required'),
    studentStreetAddress1: yup.string().required('Street Address is required'),
    studentCity: yup.string().required('City is required'),
    studentState: yup.string().required('State is required'),
    studentZip: yup.string().required('Zip Code is required'),
});
