import React from 'react';
import { View, Text, Button , Image, StyleSheet} from 'react-native';
import { Camera } from 'expo-camera';
import { NavigationContainer } from '@react-navigation/native';
import { OpenCvProvider, useOpenCv } from 'opencv-react'

const cv = require()

// Pagina realmente visualizzabile
function RealPage() {

  // Load openCV
  const { loaded, cv } = useOpenCv()

  useEffect(() => {

    if (cv) {

      // Usare opencv

    }

  }, [cv])
  
  return (
          
    <View>

      <Text>GALLERIA</Text>
      <Image source={{ uri: photoUri }} style={styles.image} />
    
    </View>
  )
}

// Componente visibile esternamente 
function SecondPage({route}) {

    // Uri immagine scattata
    const photoUri = route.params;

    // Serve per capire se openCV è stato caricato correttamente
    const onLoaded = (cv) => {

      console.log('opencv loaded', cv);

    }

    return (

        // Provide OpenCV
        <OpenCvProvider onLoad={onLoaded}>

          {/* Pagine vera */}
          <RealPage />

        </OpenCvProvider>

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
 
export default SecondPage;