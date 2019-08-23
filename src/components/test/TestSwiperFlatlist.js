import React, { PureComponent } from 'react';
import { Text, Dimensions, Image, StyleSheet, View, FlatList } from 'react-native';
import { dataFlatlist } from '../../utils/DataTest';
import SwiperFlatList from 'react-native-swiper-flatlist';


export default class TestFlatlist extends PureComponent {

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          horizontal={true}
          data={dataFlatlist}
          keyExtractor={({ item, index }) => index.toString()}
          renderItem={({ item }) =>
            <View style={{ flex: 1 }}>
              <SwiperFlatList
                autoplayDelay={2}
                autoplayLoop
                index={0}
                showPagination={false}
              >
                <View style={[styles.child, { backgroundColor: 'tomato' }]}>
                  <Text style={styles.text}>{item.key}</Text>
                </View>
              </SwiperFlatList>
            </View>
          }
        />
        {/* <SwiperFlatList
          autoplayDelay={2}
          autoplayLoop
          index={0}
          vertical
          showPagination={false}
        >
          {dataFlatlist.map((val, key) => {
            return (
              <View key={key} style={[styles.child, { backgroundColor: 'tomato' }]}>
                <Text style={styles.text}>{val.key}</Text>
              </View>
            );
          })}
        </SwiperFlatList> */}
      </View>
    );
  }
}

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  child: {
    height: 60,
    width: width / 4,
    justifyContent: 'center'
  },
  text: {
    fontSize: 30,
    textAlign: 'center'
  }
});