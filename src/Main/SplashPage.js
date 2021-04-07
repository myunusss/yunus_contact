import React from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
import { useEffect } from 'react';
import { Actions } from 'react-native-router-flux';

const SplashPage = () => {
  // COMPONENTDIDMOUNT
  useEffect(() => {
    console.log("COMPONENT DID MOUNT")
    setTimeout(() => {
      Actions.reset('home')
    }, 1000);
  }, [])
  
  //COMPONENTDIDUPDATE
  useEffect(() => {
    console.log('COMPONENT DID UPDATE');
  })

  //COMPONENTWILLUNMOUNT
  useEffect(() => {
    return() => {
      console.log('COMPONENT WILL UNMOUNT 2');
    }
  }, [])

  return(
    <View style={styles.container}>
      <Image
        source={require('../Shared/assets/images/splashscreen.png')}
        style={{width: 200, height: 200, resizeMode: 'cover'}}
      />
      <Text style={styles.versionText}>
        v 0.0.1 - 2021
      </Text>
    </View>
  )
}

export default SplashPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  versionText: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center'
  }
})