import * as React from 'react';
import {View, TextInput, Text} from 'react-native';
import FaIcon from "react-native-vector-icons/Feather";
import ErrorText from './ErrorText';
import * as _ from 'lodash';

const FormInput = (props) => {
  const {
    defaultValue,
    label,
    name,
    placeholder,
    p, // props from formik
    keyboardType,
    textContentType,
    secureTextEntry,
    actionShowPassword,
    autoFocus,
    multiline,
    maxLength,
  } = props;

  return (
    <View style={{width: '94%', marginTop: 10, alignSelf: 'center'}}>
      <Text style={{fontSize: 14, color: '#000', marginBottom: 5}}>{label}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 10, height: multiline ? 80 : null, backgroundColor: '#fff', elevation: 1}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            style={{height: multiline ? 80 : null, padding: 10, flex: 1, width: '100%', color: '#000'}}
            defaultValue={defaultValue}
            value={_.get(props, 'value') ? String(_.get(props, 'value')) : ''}
            autoFocus={autoFocus || false}
            placeholder={placeholder}
            onChangeText={(val) => p.setFieldValue(name, val)}
            keyboardType={keyboardType}
            textContentType={textContentType}
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            maxLength={maxLength ? maxLength : null}
          />
          {
            name === 'password' || name == 'konfirmasi_password' ?
            <FaIcon
              onPress={actionShowPassword}
              style={{
                marginHorizontal: 10,
                width: 18,
                fontSize: 18,
                color: color.theme3
              }}
              name={secureTextEntry ? "eye-off" : "eye"}
            />
            :
            null
          }
        </View>
      </View>
      {
        p.errors[name]
        &&
        <View style={{paddingVertical: 5}}>
          <ErrorText data={p.errors[name]}/>
        </View>
      }
    </View>
  );
};

export default FormInput;
