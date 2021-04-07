import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect } from 'react';
import { Actions } from 'react-native-router-flux';

const LoadingIndicator = () => {
  return(
    <View style={styles.container}>
      <ActivityIndicator
        size={'large'}
        color='#ccc'
      />
      <Text style={styles.infoText}>
        Memuat data
      </Text>
    </View>
  )
}

export default LoadingIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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