import React, { Component } from 'react';
import { Modal, Text, StyleSheet, View, Alert, FlatList, Image } from 'react-native';
import { Button } from '../../components/common/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppIcon from '../../utils/AppIcon';
import RippleButton from '../common/RippleButton';


export default class ModalExample extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    console.log(this.props.dataIndex);
  }

  render() {
    return (
      <Modal
        style={styles.modal}
        animationType="fade"
        transparent={true}
        supportedOrientations={['portrait', 'landscape']}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.container}>
          <View style={styles.containerChild}>
            <RippleButton style={styles.closeBtn} size={40}
              onPress={() => {
                this.setModalVisible(false)
              }}>
              <Image source={AppIcon.icon_close}
                style={{ width: 45, height: 45 }}
              />
            </RippleButton>
            <View style={styles.header}>
              <View style={{ top: 15, left: 15, flexDirection: 'row' }}>
                <Image source={AppIcon.mother_avatar} style={{ width: 70, height: 70 }} />
                <Text style={styles.titleModal}>Con làm bài tập này nhé. Tối về mẹ xem!</Text>
              </View>
            </View>
            <FlatList
              data={[{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }]}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              renderItem={() =>
                <View style={styles.rowItem}>
                  <View style={styles.rowTop}>
                    <Image source={require('../../asserts/icon/mission.png')} style={styles.image} />
                    <Text style={styles.textDesc}>Nhiều hơn, ít hơn, Nhiều hơn ít hơn, ít hơn nhiều hơn</Text>
                  </View>
                  <View style={styles.rowBottom}>
                    <Text style={styles.textPt}>Phần thưởng</Text>
                    <Image source={require('../../asserts/icon/mission_icon.png')} style={styles.icon} />
                    <Text style={styles.textScore}>20</Text>
                    <Button width={100} title='Làm ngay'
                      onPress={() => {

                      }}
                    />
                  </View>
                </View>
              }
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90
  },
  containerChild: {
    width: '90%',
    height: '90%',
    borderRadius: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderWidth:2,
    paddingLeft: 10
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowItem: {
    flex: 1,
    padding: 5,
    marginTop: 20,
    marginRight: 20,
    borderWidth: 1,
    paddingRight: 10,
    borderColor: '#333',
    borderRadius: 10
  },
  rowTop: {
    flexDirection: 'row'
  },
  rowBottom: {
    flexDirection: 'row'
  },
  textDesc: {
    color: '#383838',
    fontSize: 15,
    flex: 1,
    fontFamily: 'Roboto-Bold',
    marginHorizontal: 10,
  },
  textScore: {
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginTop: 10
  },
  textPt: {
    fontFamily: 'Roboto-Regular',
    color: '#333',
    fontSize: 15,
    marginTop: 10,
    fontWeight: '400'
  },
  image: {
    width: 60,
    height: 60,
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 7
  }, 
  closeBtn: {
    width:40, 
    height: 40,
    position: 'absolute',
    right: 10,
    top: 6,
    zIndex: 99
  },
  titleModal: {
    fontSize: 22,
    fontFamily: 'SVN-Gumley',
    alignSelf: 'center', 
    left: 50
  }
})