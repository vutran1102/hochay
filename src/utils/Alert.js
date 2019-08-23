import { Alert } from 'react-native'
export const alertExitApp = (BackHandler) => {
    Alert.alert(
        '',
        'Bạn có chắc chắn muốn thoát app!',
        [
            { text: 'Không', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'Có', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
    )
}
