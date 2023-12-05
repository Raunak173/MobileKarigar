import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Home from './pages/Home';

const App = () => {
  const captureLayout = async () => {
    try {
      const response = await fetch('http://localhost:3000/capture-layout', {
        method: 'POST',
      });
      console.log('Response:', await response.text());
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Home />
      <TouchableOpacity style={styles.captureButton} onPress={captureLayout}>
        <Text style={{color: 'white'}}>Capture Layout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    position: 'absolute',
    top: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    right: 20,
  },
});
