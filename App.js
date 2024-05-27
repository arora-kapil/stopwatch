import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Stopwatch from './components/Stopwatch';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stopwatch />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
