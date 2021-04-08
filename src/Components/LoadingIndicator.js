import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const LoadingIndicator = () => {
  return(
    <View style={styles.container}>
      <ActivityIndicator
        size={'small'}
        color='#ccc'
      />
      <Text style={styles.infoText}>
        Please wait
      </Text>
    </View>
  )
}

export default LoadingIndicator;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  infoText: {
    marginTop: 5,
    justifyContent: 'center',
    color: '#aaa',
    fontSize: 12
  }
})