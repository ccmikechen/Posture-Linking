import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import { reduxForm, Field } from 'redux-form/immutable';
import validate from './validate';

const renderField = ({ input: { onChange, ...restInput }, isPassword, label, keyboardType, returnKeyType,  meta: { touched, error } }) => {
  if (touched && error) {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.errorInput}
          keyboardType ={keyboardType}
          placeholder={label}
          onChangeText={onChange}
          secureTextEntry = {isPassword}
          autoCapitalize = 'none'
          underlineColorAndroid='transparent'
          returnKeyType = {returnKeyType}
          autoCorrect = {false}
          selectTextOnFocus = {true}
          {...restInput}
        />
        {touched && error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  } else {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType ={keyboardType}
          placeholder={label}
          onChangeText={onChange}
          secureTextEntry = {isPassword}
          autoCapitalize = 'none'
          underlineColorAndroid='transparent'
          returnKeyType = {returnKeyType}
          autoCorrect = {false}
          selectTextOnFocus = {true}
            {...restInput}
        />
      </View>
    );
  }
}

const SingUpForm = (props) => {
  const { handleSubmit, onSubmit } = props;

  return (
    <View style={styles.container}>
      <Field
        name="username"
        component={renderField}
        isPassword = {false}
        keyboradType = {'default'}
        returnKeyType = {'next'}
        label= {R.strings.USERNAME}
      />
      <Field
        name="password"
        component={renderField}
        isPassword = {true}
        keyboradType = {'default'}
        returnKeyType = {'next'}
        label={R.strings.PASSWORD}
      />
      <Field
        name="confirmPassword"
        component={renderField}
        isPassword = {true}
        keyboradType = {'default'}
        returnKeyType = {'next'}
        label={R.strings.CONFIRM_PASSWORD}
      />
      <Field name="email"
        component={renderField}
        isPassword = {false}
        keyboradType = {'email-address'}
        returnKeyType = {'send'}
        label={R.strings.EMAIL} />
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <View style={styles.button}>
           <Text style={styles.buttonText}>{R.strings.SIGNUP}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default reduxForm({
  form: 'signUp',
  validate
})(SingUpForm);
