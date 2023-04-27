import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    // Make a request to the /api/data endpoint
    axios
      .get('http://localhost:19006/api/data')
      .then((response) => {
        console.log('Data fetched successfully:', response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error);
      });
  }, []);

  console.log(data);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 28, textAlign: 'center' }}>
          Welcome to the first FH Social App
        </Text>
      </View>
    </SafeAreaView>
  );
}
