import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AppIcon from '../../utils/AppIcon';
import LevelAnim from '../anim/LevelAnim';

export default LevelPracticeBig = ({
    levelPractice,
    isLarge = false
}) => {
    return (
        <View style={styles.container}>
            {levelPractice == 4 &&
                <View style={styles.rows}>
                    <LevelAnim delay={0}>
                        <Image source={AppIcon.icon_apple} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    </LevelAnim>
                    <LevelAnim delay={400}>
                        <Image source={AppIcon.icon_apple} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    </LevelAnim>
                    <LevelAnim delay={800}>
                        <Image source={AppIcon.icon_apple} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    </LevelAnim>
                </View>
            }
            {levelPractice == 3 &&
                <View style={styles.rows}>
                    <LevelAnim delay={0}>
                        <Image source={AppIcon.icon_apple} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    </LevelAnim>
                    <LevelAnim delay={400}>
                        <Image source={AppIcon.icon_apple} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    </LevelAnim>
                    <LevelAnim delay={800}>
                        <Image source={AppIcon.icon_apple_ina} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    </LevelAnim>
                </View>
            }
            {levelPractice == 2 &&
                <View style={styles.rows}>
                    <LevelAnim delay={0}>
                        <Image source={AppIcon.icon_apple} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    </LevelAnim>
                    <LevelAnim delay={400}>
                        <Image source={AppIcon.icon_apple_ina} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    </LevelAnim>
                    <LevelAnim delay={800}>
                        <Image source={AppIcon.icon_apple_ina} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    </LevelAnim>
                </View>
            }
            {(levelPractice == 0 || levelPractice == 1) &&
                <View style={styles.rows}>
                    <LevelAnim delay={0}>
                        <Image source={AppIcon.icon_apple_ina} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    </LevelAnim>
                    <LevelAnim delay={400}>
                        <Image source={AppIcon.icon_apple_ina} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    </LevelAnim>
                    <LevelAnim delay={800}>
                        <Image source={AppIcon.icon_apple_ina} style={isLarge ? styles.iconAppleLg : styles.iconApple} />
                    </LevelAnim>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        left: 8
    },
    iconApple: {
        width: 16,
        height: 20,
        marginRight: 15,
    },
    iconAppleLg: {
        width: 36,
        height: 42,
        marginRight: 20,
    },
    rows: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
});