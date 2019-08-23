
import { TabNavigator, TabBarBottom } from 'react-navigation';
import ParentSettingTab from '../../containers/parent/ParrentInfoSettingContainer';
import ParentPackageContainer from '../../containers/parent/ParentPackageContainer';
import ParentSetting from './SettingParent';
import ParentStack from './ParentStack'
import StudentList from '../../containers/parent-student/StudentListContainer';
import Orientation from 'react-native-orientation';
import { Image } from 'react-native';
import React, { Component } from 'react';
import AppIcon from '../../utils/AppIcon';

Orientation.lockToPortrait();
const TabNavigatorComp = TabNavigator({
    Student: {
        screen : StudentList,
        navigationOptions:({navigation})=> ({
            title: 'Học sinh',
            tabBarVisible: false,
            tabBarIcon: ({ tintColor }) => {
                return (<Image src={AppIcon.icon_hoc_sinh} style={{width: 50, height: 50}} color={tintColor}/>)
            }
        })
    },
    Course:{
        screen: ParentPackageContainer,
        navigationOptions:{
            title: 'Khóa học',
            tabBarVisible: false,

            tabBarIcon: ({ tintColor }) => {
                return (<Image src={AppIcon.icon_khoa_hoc} style={{width: 50, height: 50}} color={tintColor}/>)
            }
        }
    },
    Info: {
        screen : ParentSettingTab,
        navigationOptions:({navigation})=> ({
            tabBarVisible: false,
            title: 'Tài khoản',
            tabBarIcon: ({ tintColor }) => {
                return (<Image src={AppIcon.icon_tai_khoan} style={{width: 50, height: 50}} color={tintColor}/>)
            }
        })
    }
},{
    tabBarPosition: 'bottom',
    backBehavior:'none',
    tabBarVisible: false,    
    tabBarOptions: {
        activeTintColor: "#6200EE",      
        inactiveTintColor: "#858585",      
        style: {        
            height: 100,        
            paddingBottom: 10,        
            backgroundColor: "red",
            borderWidth:1      
        },      
        labelStyle: {        
            fontSize: 15,               
        }  
    }      
})

export default TabNavigatorComp;
