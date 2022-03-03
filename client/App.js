import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import * as React from "react";

import { NativeBaseProvider, extendTheme } from "native-base";
import { QueryClient, QueryClientProvider } from "react-query";

import Container from "./Container";

const client = new QueryClient();

export default function App() {  
  return (
    <NativeBaseProvider>
      <QueryClientProvider client={client}>
        <Container />        
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
