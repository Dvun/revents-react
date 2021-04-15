import * as yup from 'yup'

export const schema = yup.object().shape({
  title: yup.string().required('Title is required!'),
  category: yup.string().required('Category is required!'),
  description: yup.string().required('Description is required!'),
  city: yup.object().shape({
    address: yup.string().required('City is required!'),
  }),
  venue: yup.object().shape({
    address: yup.string().required('Venue is required!')
  }),
  date: yup.string().required('Date is required!'),
})

export const loginSchema = yup.object().shape({
  email: yup.string().required('Email is required!').email(),
  password: yup.string().required('Password is required!')
})

export const registerSchema = yup.object().shape({
  displayName: yup.string().required('Name is required!'),
  email: yup.string().required('Email is required!').email(),
  password: yup.string().required('Password is required!')
})

export const passwordSchema = yup.object().shape({
  newPassword1: yup.string().required('Password is required!'),
  newPassword2: yup.string().oneOf([yup.ref('newPassword1'), null], 'Password do not match!')
})

export const userUpdateSchema = yup.object().shape({
  displayName: yup.string().required('Display name required')
})