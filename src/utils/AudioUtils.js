import Sound from 'react-native-sound';
import button_sound from '../asserts/sound/button.mp3';
import soundtrack from '../asserts/sound/soundtrack.mp3';
import Helper from './Helpers';

var buttonSound = new Sound('button.mp3', Sound.MAIN_BUNDLE, (res, error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
    // loaded successfully
    console.log('duration in seconds: ' + buttonSound.getDuration() + 'number of channels: ' + buttonSound.getNumberOfChannels());
});


// var soundTrack1 = new Sound(soundtrack, Sound.MAIN_BUNDLE, (error) => {
// if (error) {
//     console.log('failed to load the sound', error);
//     return;
// }
// // loaded successfully
// console.log('duration in seconds: ' + soundTrack1.getDuration() + 'number of channels: ' + soundTrack1.getNumberOfChannels());
// });


export const playSoundButton = () => {
    Helper.getSoundVolume().then(volume => {
        if (volume > 0) {
            buttonSound.setVolume(volume);
            buttonSound.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                    // reset the player to its uninitialized state (android only)
                    // this is the only option to recover after an error occured and use the player again
                    buttonSound.reset();
                }
            });
        }
    })
}

export const playSoundTrack = () => {
    // soundTrack1.setVolume(1);
    // soundTrack1.stop(()=>{
    //     soundTrack1.play((success) => {
    //         if (success) {
    //             console.log('successfully finished playing');
    //         } else {
    //             console.log('playback failed due to audio decoding errors');
    //             // reset the player to its uninitialized state (android only)
    //             // this is the only option to recover after an error occured and use the player again
    //             soundTrack1.reset();
    //         }
    //     });
    // })
}

export const stopSoundTrack1 = () => {
    // soundTrack1.pause();
}