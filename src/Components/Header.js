import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import IconAws from 'react-native-vector-icons/FontAwesome';

const Header = (props) => {
  return (
    <View style={{height: 55, flexDirection: 'row', justifyContent: 'space-between'}}>
      <TouchableOpacity
        onPress={() => props.actionBackPress()}
        style={{padding: 13, paddingBottom: 13, width: 50}}>
        <IconAws
          style={{color: '#000'}}
          name={'chevron-left'}
          size={24}
        />
      </TouchableOpacity>
      {
        props.componentTitle ? props.componentTitle : null
      }
      {
        props.componentRight ? props.componentRight : <View style={{width: 50}}/>
      }
    </View>
  );
};

export default Header;
