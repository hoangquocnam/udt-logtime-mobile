import * as React from "react";
import { View, SafeAreaView, FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";
import UserCard from "../../components/HomeScreenElements/UserCard";
import { selectUser } from "../../redux/user/reducer";
import { IUser } from "../../interfaces";
import t from "../../theme";

function FavoriteScreen() {
  const { value: users } = useSelector(selectUser);
  const favoriteUsers: IUser[] = users.filter((user) => user.isFavorite);

  function renderUserItem({ item }: { item: IUser }) {
    return <UserCard user={item} />;
  }

  const EmptyListText = (
    <View style={styles.emptyListContainer}>
      <Text style={[styles.emptyListText, t.fontSansBold]}>Your favorite list is empty!</Text>
    </View>
  );

  return (
    <SafeAreaView>
      <FlatList
        contentContainerStyle={styles.container}
        data={favoriteUsers}
        renderItem={renderUserItem}
        keyExtractor={(user) => user?.login?.uuid}
        ListEmptyComponent={EmptyListText}
      />
    </SafeAreaView>
  );
}

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  emptyListContainer: {
    alignItems: "center",
    height: "100%",
  },
  emptyListText: {
    fontSize: 20,

  }
});
