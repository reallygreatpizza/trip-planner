import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Pressable, Dimensions, Image } from 'react-native';
import {NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import cityImage from './images/city.jpg';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const targetHeight = screenHeight * 0.5;
const scaleFactor = targetHeight / 1205; // since the original image height is 4032
const newWidth = 1805 * scaleFactor; // since the original image width is 2268
const dummyTrips = [
  {
    id: '1',
    destination: 'New York City',
    dates: '2023-05-10 - 2023-05-15',
    activities: 'Statue of Liberty, Central Park, Broadway',
  },
  {
    id: '2',
    destination: 'Paris',
    dates: '2023-06-01 - 2023-06-10',
    activities: 'Eiffel Tower, Louvre Museum, Notre Dame',
  },
  {
    id: '3',
    destination: 'Tokyo',
    dates: '2023-07-15 - 2023-07-25',
    activities: 'Shibuya Crossing, Tsukiji Fish Market, Akihabara',
  },
];



SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);


const Stack = createStackNavigator();


const TripForm = () => {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [activities, setActivities] = useState('');

  const navigation = useNavigation();

  const handleSubmit = () => {

    // Reset form fields
    setDestination('');
    setDates('');
    setActivities('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <Text style={styles.title}>Create Trip</Text>
        <TouchableOpacity onPress={() => navigation.navigate('TripsList')}>
          <Text style={styles.tripListButton}>Trips List</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Destination:</Text>
        <TextInput
          style={styles.input}
          value={destination}
          onChangeText={setDestination}
          isRequired
        />
        <Text style={styles.label}>Dates:</Text>
        <TextInput
          style={styles.input}
          value={dates}
          onChangeText={setDates}
          isRequired
        />
        <Text style={styles.label}>Activities:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={activities}
          onChangeText={setActivities}
          multiline
          numberOfLines={4}
          isRequired
        />
                <Pressable
        style={styles.Button}
        title="View Recipe"
        onPress={() => handleSubmit()}
        ><Text style={styles.ButtonText}>Submit</Text></Pressable>
      </View>
    </View>
  );
};

const TripsList = () => {
  const [trips, setTrips] = useState(dummyTrips);
  const navigation = useNavigation();

  const renderTripItem = ({ item }) => (
    <View style={styles.tripItem}>
      <Text style={styles.tripItemText}>Destination: {item.destination}</Text>
      <Text style={styles.tripItemText}>Dates: {item.dates}</Text>
      <Text style={styles.tripItemText}>Activities: {item.activities}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <Text style={styles.title}>Trips List</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Form')}>
          <Text style={styles.createTripButton}>Create Trip</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={trips}
          renderItem={renderTripItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image source={cityImage} style={{ width: newWidth, height: targetHeight }} />
      </View>
    </View>
  );
};

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Form">
        <Stack.Screen name="Form" component={TripForm} options={{ headerTitle: '' }} />
        <Stack.Screen name="TripsList" component={TripsList} options={{ headerTitle: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
},
titleBar: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
padding: 20,
backgroundColor: '#4a00ba',
},
title: {
fontSize: 24,
fontWeight: 'bold',
color: '#fff',
},
tripListButton: {
color: '#fff',
},
createTripButton: {
color: '#fff',
},
formContainer: {
padding: 20,
},
label: {
fontSize: 16,
fontWeight: 'bold',
marginBottom: 5,
},
input: {
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 4,
padding: 10,
marginBottom: 10,
},
textArea: {
height: 100,
textAlignVertical: 'top',
},
listContainer: {
flex: 1,
padding: 20,
},
tripItem: {
marginBottom: 10,
borderBottomWidth: 1,
borderBottomColor: '#ccc',
paddingBottom: 10,
},
tripItemText: {
fontSize: 16,
},
imageContainer: {
  width: screenWidth,
  height: screenHeight * 0.5,
  overflow: 'hidden',
  alignItems: 'center',
},
Button: {
  backgroundColor: '#4a00ba',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 1,
  paddingHorizontal: 22,
  borderRadius: 4,
  elevation: 3,
},
ButtonText: {
  color: '#ffffff',
  fontSize: 20,
  marginTop: 8,
  marginBottom: 8,
},
});

export default App;