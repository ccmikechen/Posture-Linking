const validate = values => {
  const errors = {}
  if (!values.get('username')) {
    errors.username = 'Required'
  } else if (values.get('username').length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.get('email')) {
    errors.email = 'Required'
  } else if (!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(values.get('email'))) {
    errors.email = 'Invalid email address'
  }
  if (!values.get('password')) {
    errors.password = 'Required'
  } else if (values.get('password').length < 8) {
    errors.password = 'Must be 8 characters or more'
  }
  if (!values.get('confirmPassword')) {
    errors.confirmPassword = 'Required'
  } else if (values.get('confirmPassword') != values.get('password')) {
    errors.confirmPassword = 'Password and Confirm Password are different'
  }
  if (!values.get('nickname')) {
    errors.nickname = 'Required'
  } 
  if (!values.get('firstname')) {
    errors.firstname = 'Required'
  } 
  if (!values.get('lastname')) {
    errors.lastname = 'Required'
  } 
  return errors
}

export default validate