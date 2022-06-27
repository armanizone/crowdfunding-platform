import * as yup from 'yup'

const loginSchema = yup.object({
  email: yup.string().required("Почта обязательна для заполнения").email("Это не почта"),
  password: yup.string().required("Пароль обязателен для заполнения").min(8, "Минимум 8 символов"),
})

const optionalSchema = yup.object().shape({
  name: yup.string().required("Имя обязательно для заполнения").min(3, "Миниум 3 символа").matches(/^[A-Za-z]+$/, "Только латинские буквы"),
  password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают')
})

const forgotPasswordSchema = yup.object({
  email: yup.string().required("Почта обязательна для заполнения").email("Это не почта"),
  password: yup.string().required("Пароль обязателен для заполнения").min(8, "Минимум 8 символов"),
  password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают')
})

const merged = loginSchema.concat(optionalSchema)

const profileSchema = yup.object().shape({
  name: yup.string().required("Имя обязательно для заполнения").min(3, "Миниум 3 символа").matches(/^[A-Za-z]+$/, "Только латинские буквы"),
  current_password: yup.string().required("Пароль обязателен для заполнения").min(8, "Минимум 8 символов"),
  password: yup.string().required("Пароль обязателен для заполнения").min(8, "Минимум 8 символов"),
  password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
})

const changePasswordSchema = yup.object().shape({
  current_password: yup.string().required("Пароль обязателен для заполнения").min(8, "Минимум 8 символов"),
  password: yup.string().required("Пароль обязателен для заполнения").min(8, "Минимум 8 символов"),
  password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
})


const paymentSchema = yup.object().shape({
  name: yup.string().required("Имя обязательно для заполнения"),
  phone: yup.string().required("Номер телефона обязателен для заполнения").min("Минимум 10 цифр"),
  
})


export {
  merged,
  loginSchema,
  forgotPasswordSchema,
  profileSchema,
  changePasswordSchema
}