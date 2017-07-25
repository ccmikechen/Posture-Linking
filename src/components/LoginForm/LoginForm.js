import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import { reduxForm, Field } from 'redux-form/immutable';

const renderField = ({ input: { onChange, ...restInput }, isPassword, label}) => {
  return <TextInput 
    style={styles.input} 
    placeholder={label}
    onChangeText={onChange} 
    secureTextEntry = {isPassword}
    autoCapitalize = 'none'
    {...restInput} 
    />
}

const LoginForm = (props) => {
  const { handleSubmit, onSubmit, navigator } = props;
  const handleSignUp = () => {
    navigator.push({
      screen: 'SignUpScreen',
      title: '',
      passProps: {},
      navigatorStyle: {
        navBarBackgroundColor: '#616161',
        drawUnderNavBar: true,
        navBarNoBorder: true
      }
    })
  }
  return (
    <View style={styles.container}>
      <Field
        name="username"
        component={renderField}
        isPassword = {false}
        label="Username"
      />
      <Field
        name="password"
        component={renderField}
        isPassword = {true}
        label="Password"
      />
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <View style={styles.button}>
           <Text style={styles.buttonText}>Login</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUp}>
        <View style={styles.signUpButton}>
           <Text style={styles.buttonText}>Sign Up</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
};

export default reduxForm({
  form: 'Login'
})(LoginForm);