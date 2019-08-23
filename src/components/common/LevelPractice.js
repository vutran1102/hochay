import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AppIcon from '../../utils/AppIcon';

export default LevelPractice = ({
    levelPractice,
    isLarge = false
}) => {
    console.log("LevelPractice--------: ", levelPractice);
    return (
        <View style={styles.container}>
            {/* {levelPractice == 4 &&
                <View style={styles.rows}>
                    <Image source={AppIcon.icon_apple} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    <Image source={AppIcon.icon_apple} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    <Image source={AppIcon.icon_apple} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                </View>
            } */}
            {levelPractice == 4 &&
                <View style={styles.rows}>
                    <Image source={AppIcon.icon_apple} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    <Image source={AppIcon.icon_apple} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    <Image source={AppIcon.icon_apple} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                </View>
            }
            {levelPractice == 3 &&
                <View style={styles.rows}>
                    <Image source={AppIcon.icon_apple} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    <Image source={AppIcon.icon_apple} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    <Image source={AppIcon.icon_apple_ina} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                </View>
            }
            {levelPractice == 2 &&
                <View style={styles.rows}>
                    <Image source={AppIcon.icon_apple} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    <Image source={AppIcon.icon_apple_ina} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    <Image source={AppIcon.icon_apple_ina} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                </View>
            }
            {(levelPractice == 1) &&
                <View style={styles.rows}>
                    <Image source={AppIcon.icon_apple_ina} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    <Image source={AppIcon.icon_apple_ina} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    <Image source={AppIcon.icon_apple_ina} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                </View>
            }
            {levelPractice == 0 &&
                <View style={styles.rows}>
                    <Image source={AppIcon.icon_apple_ina} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    <Image source={AppIcon.icon_apple_ina} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    <Image source={AppIcon.icon_apple_ina} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        left: 10,
        alignItems:'center',
        justifyContent:'center',
    },
    iconApple: {
        width: 16,
        height: 20,
        marginRight: 5,
    },
    iconAppleLg: {
        width: 36,
        height: 42,
        marginRight: 5,
    },
    rows: {
        alignItems:'center',
        justifyContent:'center',
        flexDirection: 'row'
    }
});