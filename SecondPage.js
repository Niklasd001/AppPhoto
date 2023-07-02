import React from 'react';
import { View, Text, Button , Image, StyleSheet} from 'react-native';
import { Camera } from 'expo-camera';
import { NavigationContainer } from '@react-navigation/native';


export default function SecondPage({route}) {
  const photoUri = route.params;
    return (
      <View>
        <Text>GALLERIA</Text>
        <Image source={{ uri: photoUri }} style={styles.image} />
      </View>
    );
  } 

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '50%',
      height: '50%',
    },
  });
 