import * as yup from 'yup';

export const OtherSignupVS = yup.object().shape({
  name: yup
    .string()
    .required('Please enter your name')
    .min(2)
    .max(33)
    .label('Name'),
  dob: yup
    .date()
    .required('Please enter your date of birth')
    .label('date of birth'),
  state: yup.string().label('state').required('Please enter your State name'),
  school: yup.string().label('school').required('Please enter your school name'),
});
