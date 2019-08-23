import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground , Image} from 'react-native';
import RippleButton from '../common/RippleButton';
import { tab_main_width } from '../../constants/const';
import AppIcon from '../../utils/AppIcon';
import { playSoundButton } from '../../utils/AudioUtils';

const sizeButton = 50;

export default class Tabs extends Component {
    onPress(type) {
        this.props.onPress(type);
        playSoundButton();
    }
    render() {
        const { index, Role, RoleParent } = this.props;
        return (
            <ImageBackground source={AppIcon.tab_menu} style={styles.tabs}>
                <View style={styles.tab}>
                    <RippleButton size={60} duration={300} color={'rgba(255,255,255,0.3)'}
                        onPress={() => this.onPress(1)}
                        style={index == 1 ? styles.wrapTabsActive : styles.wrapTabs}>
                        <Image source={AppIcon.icon_practice} style={styles.imageIcon} />
                    </RippleButton>
                    <Text style={Role == 'STUDENT' ? styles.title : styles.titleParent}>Tự Luyện</Text>
                </View>
                <View style={styles.tab}>
                    <RippleButton size={60} duration={300} color={'rgba(255,255,255,0.3)'}
                        onPress={() => this.onPress(2)}
                        style={index == 2 ? styles.wrapTabsActive : styles.wrapTabs}>
                        <Image source={AppIcon.icon_exam} style={styles.imageIcon} />
                    </RippleButton>
                    <Text style={Role == 'STUDENT' ? styles.title : styles.titleParent}>Kiểm Tra</Text>
                </View>
                <View style={styles.tab}>
                    <RippleButton size={60} duration={300} color={'rgba(255,255,255,0.3)'}
                        onPress={() => this.onPress(3)}
                        style={index == 3 ? styles.wrapTabsActive : styles.wrapTabs}>
                        <Image source={AppIcon.icon_robot} style={styles.imageIcon} />
                    </RippleButton>
                    <Text style={Role == 'STUDENT' ? styles.title : styles.titleParent}>Kiwi</Text>
                </View>
                <View style={styles.tab}>
                    <RippleButton size={60} duration={300} color={'rgba(255,255,255,0.3)'}
                        onPress={() => this.onPress(4)}
                        style={index == 4 ? styles.wrapTabsActive : styles.wrapTabs}>
                        <Image source={AppIcon.icon_trophy} style={styles.imageIcon} />
                    </RippleButton>
                    <Text style={Role == 'STUDENT' ? styles.title : styles.titleParent}>Thành Tích</Text>
                </View>
                {Role=='PARENT' &&
                    <View style={styles.tab}>
                        <RippleButton size={60} duration={300} color={'rgba(255,255,255,0.3)'}
                            onPress={() => this.onPress(5)}
                            style={index == 5 ? styles.wrapTabsActive : styles.wrapTabs}>
                            <Image source={AppIcon.icon_parent} style={styles.imageIcon} />
                        </RippleButton>
                        <Text style={styles.title}>Phụ Huynh</Text>
                    </View>
                }
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    tabs: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: tab_main_width,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageIcon: {
        width: 50,
        height: 50
    },
    wrapTabsActive: {
        width: sizeButton+ 5,
        height: sizeButton +5,
        backgroundColor: 'rgba(255,255,255,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    wrapTabs: {
        width: sizeButton,
        height: sizeButton,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    title: {
        fontFamily: 'SVN-Gumley',
        fontSize: 12,
        color: 'white'
    },
    titleParent: {
        fontFamily: 'SVN-Gumley',
        fontSize: 12,
        color: '#999'
    },
});