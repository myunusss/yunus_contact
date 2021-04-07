import * as React from 'react';
import { View } from 'react-native';

const Divider = (props) => {
  return (
    <View
      style={{
        height: props.height ? props.height : 5,
        width: '100%',
        backgroundColor: '#f1f1f1',
        marginTop: 13
      }}
    />
  );
};

export default Divider;
