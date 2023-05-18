import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
const FlatListComponent = () => {
  const friends = [
    {name: 'Friend #1'},
    {name: 'Friend #2'},
    {name: 'Friend #3'},
    {name: 'Friend #4'},
    {name: 'Friend #5'},
    {name: 'Friend #6'},
    {name: 'Friend #7'},
    {name: 'Friend #8'},
  ];
  return (
    <View>
      <FlatList
        keyExtractor={friend => friend.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={friends}
        renderItem={({item}) => {
          return <Text style={styles.textItem}>{item.name}</Text>;
        }}></FlatList>
    </View>
  );
};
const styles = StyleSheet.create({
  textItem: {
    marginVertical: 0,
  },
});

export default FlatListComponent;
