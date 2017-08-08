const validate = values => {
  const errors = {}
  if (!values.get('username')) {
    errors.username = '必填'
  } else if (values.get('username').length > 15 || (values.get('username').length < 8)) {
    errors.username = '最多15字元最少8字元'
  }
  if (!values.get('email')) {
    errors.email = '必填'
  } else if (!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(values.get('email'))) {
    errors.email = 'Email格式錯誤'
  }
  if (!values.get('password')) {
    errors.password = '必填'
  } else if (values.get('password').length < 8) {
    errors.password = '需要8字元以上'
  }
  if (!values.get('confirmPassword')) {
    errors.confirmPassword = '必填'
  } else if (values.get('confirmPassword') != values.get('password')) {
    errors.confirmPassword = '密碼與確認密碼不同'
  }
  return errors
}

export default validate