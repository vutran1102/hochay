import Color from '../constants/colors';

module.exports = {
    iconCircleBlack: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#383838',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textHeadPrimary: {
        fontSize: 15,
        color: Color.textColorPrimary,
        fontWeight: 'bold'
    },
    textHeadSecond: {
        fontSize: 15,
        color: Color.textColorPrimary,
        fontWeight: 'bold'
    },
    textPrimary: {
        color: '#000',
        fontFamily: 'Roboto-Regular'
    },
    textSecond: {
        color: Color.textColorSecondary
    },
    textDesc: {
        color: 'rgb(166, 168, 171)',
        fontFamily: 'Roboto-Regular'
    },
    textBoldPrimary: {
        color: 'rgb(246, 176, 0)',
        fontFamily: 'Roboto-Bold',
    },
    textBoldSecond: {
        fontWeight: 'bold',
        color: Color.textColorSecondary
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowAround: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    rowsDef: {
        flexDirection: 'row',
    },
    vertical5: {
        marginVertical: 5
    },
    vertical10: {
        marginVertical: 10
    },
    paddingV5: {
        paddingVertical: 10
    },
    paddingV10: {
        paddingVertical: 10
    },

    //Icon
    iconL: {
        marginRight: 5
    },
    iconR: {
        marginLeft: 5
    },


    //center
    textHeadCenterPrimary: {
        fontSize: 15,
        color: Color.textColorPrimary,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    textHeadCenterSecond: {
        fontSize: 15,
        color: Color.textColorSecondary,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    viewCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    authValidate: {
        fontSize: 12,
        marginBottom: 5,
        fontFamily: 'Roboto-MediumItalic',
        color: '#d9534f',
        alignSelf: 'center'
    }

}

