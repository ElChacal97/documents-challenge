import React from "react";
import {
  Platform,
  FlatList as RNFlatList,
  FlatListProps as RNFlatListProps,
} from "react-native";

interface FlatListProps<T> extends RNFlatListProps<T> {}

const FlatList = <T,>({
  data,
  renderItem,
  keyExtractor,
  contentContainerStyle,
  ...props
}: FlatListProps<T>) => {
  return (
    <RNFlatList
      testID="flat-list"
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
      initialNumToRender={20}
      maxToRenderPerBatch={10}
      scrollEventThrottle={16}
      decelerationRate={Platform.OS === "android" ? "fast" : "normal"}
      onEndReachedThreshold={0.3}
      {...props}
    />
  );
};

export default FlatList;
