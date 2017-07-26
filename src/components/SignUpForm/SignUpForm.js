import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import { reduxForm, Field } from 'redux-form/immutable';
import validate from './validate'

const renderField = ({ input: { onChange, ...restInput }, isPassword, label,  meta: { touched, error } }) => {
  return <View>
    <TextInput 
      style={styles.input} 
      placeholder={label}
      onChangeText={onChange} 
      secureTextEntry = {isPassword}
      autoCapitalize = 'none'
      underlineColorAndroid='transparent'
      {...restInput} 
    />
    {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
}

const SingUpForm = (props) => {
  const { handleSubmit, onSubmit } = props;
  
  return (
    <View style={styles.container}>
      <Field
        name="username"
        component={renderField}
        isPassword = {false}
        label="User Name"
      />
      <Field
        name="password"
        component={renderField}
        isPassword = {true}
        label="Password"
      />
      <Field
        name="confirmPassword"
        component={renderField}
        isPassword = {true}
        label="Confirm Password"
      />
      <Field name="email" 
        component={renderField}
        isPassword = {false}
        label="Email Address" />
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <View style={styles.button}>
           <Text style={styles.buttonText}>Sign Up</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
};

export default reduxForm({
  form: 'signUp',
  validate
})(SingUpForm);