import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import IconMI from 'react-native-vector-icons/MaterialIcons';

const ErrorText = (props) => {
  const {
    data,
    dataStyle,
    containerStyle
  } = props;

  return (
    <View style={[myStyles.containerStyle, containerStyle]}>
      <View style={{width: 12, height: 12, resizeMode: 'contain', marginRight: 5, tintColor: 'orange'}}>
        <IconMI name="error-outline" size={12} color={'orange'}/>
      </View>
      <Text style={[myStyles.dataStyle, dataStyle]}>
        {data}
      </Text>
    </View>
  );
};

export default ErrorText;

const myStyles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center'
  },

  dataStyle: {
    color: 'orange',
    fontSize: 12,
  }
});
