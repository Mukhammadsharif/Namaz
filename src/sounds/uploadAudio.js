import {Platform} from "react-native";
import storage from "@react-native-firebase/storage";
import {useEffect} from "react";
import {firebase} from "@react-native-firebase/auth";

export default async function uploadAudio (id) {

    await firebase.auth().signInAnonymously()


    let editedUri = Platform.select({
      ios: 'sound.mp4',
      android: 'file:////data/user/0/com.namaz/cache/sound.mp4',
    });
    // const filename = editedUri.substring(editedUri.lastIndexOf('/') + 1);
          const uploadUri = Platform.OS === 'ios' ? editedUri.replace('file://', '') : editedUri;
          console.log(uploadUri)
          const task = storage()
            .ref(id)
            .putFile(uploadUri);
          // set progress state
          try {
            await task;
          } catch (e) {
            console.error(e);
          }
          console.log(
            'Audio uploaded!',
            'Your audio has been uploaded to Firebase Cloud Storage!'
          );
}