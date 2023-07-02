import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image, PixelRatio } from 'react-native';
import { Camera } from 'expo-camera';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SecondPage from './SecondPage';
import { useIsFocused } from '@react-navigation/native';
import { OpenCvProvider, useOpenCv } from 'opencv-react'

export default function HomePage({navigation}){
  const[hasPermission, setHasPermission]= useState(null);
  const[type,setType] = useState(Camera.Constants.Type.back);
  const[photoUri, setPhotoUri] = useState(null);
  const[camera, setCamera] = useState(null);
  const[zoom, setZoom] = useState(0); // Valore iniziale dello zoom
  const[flash,setFlash] = useState(Camera.Constants.FlashMode.off);// valore in off inzialmente
  const isFocused = useIsFocused();
  
  function Prova() {
    const data = useOpenCv()
    console.log(data)
    return <p>OpenCv React test: {data.cv ? 'loaded.' : 'loading...'}</p>
  }

  //richiesta dei permessi
  useEffect(() => {

    Camera.requestCameraPermissionsAsync() 
    .then(result => {
      
      console.log(result);
      setHasPermission(result.granted)
    
      }) 
    .catch(e => {

      console.log(e);

    })

  },[]);


// funzione per scattare la foto
const takePhoto = async () => {

  try {

    if (hasPermission && camera) {
      const photo = await camera.takePictureAsync({quality: 0.5, ratio:'4:3'});
      setPhotoUri(photo.uri);
    
    }
    
    
  } catch (error) {

    console.log(error);
    
  }

};

const handleCameraRef = (ref) => {
  setCamera(ref);
};




// funzioni per lo zoom
const handleZoomIn = () => {

  if(zoom < 0.9 ) {
  
    setZoom(zoom + 0.1);
  
  }else {setZoom(1);}

}

const handleZoomOut = () => {

  if(zoom > 0.1) {
   
    setZoom(zoom - 0.1);

  } else {setZoom(0);}

}

//controllo dei permessi
if(hasPermission == null || !isFocused){
  return <View/>
}
if(hasPermission == false){
  return <Text> no access to camera </Text>
}
return(
   
  <View style={styles.container}>

    <Camera style={styles.camera} type={type} autoFocus={Camera.Constants.AutoFocus.on} zoom={zoom} flashMode={flash} ref={handleCameraRef}>

    
    <View style={styles.overlay} >    

      <Button
        title='flipCamera'
        style={styles.button}
        onPress={()=>{
          setType(
            type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
          );
        }}
      />

      <Button
      style={styles.button}
      title='takePhoto'
      onPress={takePhoto}
      />

      <Button
        title='flash'
        style={styles.button}
        onPress={()=>{
          setFlash(
            flash === Camera.Constants.FlashMode.off
            ? Camera.Constants.FlashMode.on
            : Camera.Constants.FlashMode.off
          );
        }}
      />
     <Button
        title="Go to Second Page"
        onPress={() => navigation.navigate('Second',photoUri)}
      />
      
      <View style={styles.buttonContainer}>
        <Button title="+" onPress={handleZoomIn} />
        <Button title="-" onPress={handleZoomOut} />
      </View>

      </View>
   
    </Camera>

   </View>

);
    

}

//stili
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%',
  },

  buttonContainer: {
    position:'absolute',
    bottom: 10,
    left: 300,
    right: 0,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  camera: {
    width: '100%',
    height: '95%',
  },

  button: {
    fontSize: 59,
    color: 'red',
    borderColor: 'black',
    width: 50 ,
    paddingHorizontal: 20,
    backgroundColor: 'trasparent'
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  previewImage: {
    position: "absolute",
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },

});

    