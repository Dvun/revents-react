import * as yup from 'yup'

export const schema = yup.object().shape({
  title: yup.string().required('Title is required!'),
  category: yup.string().required('Category is required!'),
  description: yup.string().required('Description is required!'),
  city: yup.string().required('City is required!'),
  venue: yup.string().required('Venue is required!'),
  date: yup.string().required('Date is required!'),
})

export const loginSchema = yup.object().shape({
  email: yup.string().required('Email is required!').email(),
  password: yup.string().required('Password is required!')
})