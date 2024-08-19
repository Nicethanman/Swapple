import { StyleSheet, View, Text, SafeAreaView, Button, TouchableOpacity, Image, TextInput, Alert} from 'react-native'
import { CameraView, Camera, CameraCapturedPicture } from 'expo-camera';
import { useRef, useState, useEffect } from 'react';
import { router } from 'expo-router';
import React from 'react'
import { uploadItem } from '../utils/uploadPhoto';

const camera = () => {

  const [photo, setPhoto] = useState<string>();
  const [uri, setUri] = useState<string>();
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [itemDescription, setItemDescription] = useState('');
  const [itemTitle, setItemTitle] = useState('');
  let cameraRef = useRef<Camera>(null);

    useEffect(() => {
      (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting for camera permissions</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>Camera permissions are turned off, please turn on in settings</Text>
    );
  }

  //Saves a temporary photo
  const takePic = async () => {
    if(cameraRef.current){
      const options = { quality: 1, base64: true };
      let data = await cameraRef.current.takePictureAsync(options)
      .then((data: CameraCapturedPicture) => {
        setPhoto(data.base64);
        return data;
      });
      setPhoto(data.base64);
      setUri(data.uri);

      // console.log(data.base64);
      console.log(data.uri);
    }
  }

  //Saves the confirmed photo to the database
  const confirmPhoto = () => {
    if(uri){
      uploadItem(itemTitle, uri, itemDescription);
      Alert.alert("Trade Item added to inventory!");
      router.replace("profile");
    }
  }

  const retakePhoto = () => {
    setPhoto(undefined);
  }

  return (
    (<SafeAreaView style={styles.container}>
      {photo ? (
        <View style={styles.previewContainer}>
          <Text style={styles.uploadTitleText}>Image Preview</Text>
          <Image style={styles.stretch} source={{uri: "data:image/jpg;base64," + photo}}/>
          <TextInput placeholder='Name of Item' style={styles.description} value={itemTitle} onChangeText={setItemTitle}></TextInput>
          <TextInput placeholder="Add a description" style={styles.description} value={itemDescription} onChangeText={setItemDescription}></TextInput>
          <View style={styles.confirmOrRetake}>
            <Button onPress={retakePhoto} title="Retake Photo"/>
            <Button onPress={confirmPhoto} title="Confirm"/>
          </View>
        </View>
        ) : (
        <CameraView ref={cameraRef} animateShutter={true} style={styles.camera}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={takePic} style={styles.button}>
              <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}

    </SafeAreaView>)
  )
}

export default camera

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  uploadTitleText: {
    fontSize: 36,
    fontWeight: 'bold',
    padding: 10,
  },
  stretch: {
    width: 200,
    height: 400,
    alignItems: "center",
    resizeMode: 'cover',
    borderRadius: 20,
  },
  previewContainer: {
    alignItems: "center",
    // flex: 1,
  },
  title: {
    width: 200,
    borderWidth: 1,
    padding: 10,
  },
  description: {
    width: 300,
    marginTop: 10, 
    borderWidth: 1,
    padding: 10,
  },
  confirmOrRetake: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: '80%',
  }
});