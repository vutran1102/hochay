import { Dimensions } from 'react-native';
let { width, height } = Dimensions.get('window');
let s = width;
if (width < height) {
    width = height;
    height = s;
}
module.exports = {
    container: {
        width: width,
        height : height,
    },
    navBottom: {
        position: 'absolute',
        bottom: - 5,
        // right: 0,
        alignSelf:'center',
        flexDirection: 'row',
        // paddingHorizontal: 50,
        justifyContent:'center',
    },
    rowButton: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        marginHorizontal: 10
    },
    contents: {
        width: '95%',
        height: '90%',
        alignSelf: 'center',
        position: 'relative',
        top: -20,
    },
    webviewStyle: {
        flex: 1,
        borderWidth: 0,
    },
    viewButton: {
        flexDirection: 'row'
    },
    marg: {
        marginHorizontal: 5
    },
    centerAbsolute: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapTop: {
        position: 'absolute',
        width: width,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 60,
        zIndex: 1
    },
    wrapRowHeart: {
        width: '100%',
        height:'100%',
        flexDirection: 'row',
        paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}