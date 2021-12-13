import storage, {firebase} from "@react-native-firebase/storage";
import Sound from "react-native-sound";

export default async function downloadAudio(id) {
    console.log(id)
    const store = await firebase.app().storage('gs://my-todo-app-be96d.appspot.com').ref(id).getDownloadURL()

    let audio = new Sound(
        await store,
        null,
        error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // if loaded successfully
            audio.play()
        console.log(
            'duration in seconds: ' +
             audio.getDuration() +
            'number of channels: ' +
             audio.getNumberOfChannels(),
        );
      },
    );
}