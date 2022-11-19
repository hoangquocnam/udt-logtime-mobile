import { AnyAction } from "@reduxjs/toolkit";
import React, { ReactNode, useEffect } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersAsync, selectUser } from "../../redux/user/reducer";
import { EApiState } from "../../enums";
import { IUser } from "../../interfaces";
import UserCard from "../../components/HomeScreenElements/UserCard";

function HomeScreen() {
  const { value: users, status } = useSelector(selectUser);
  const dispatch = useDispatch();

  function renderUserItem({ item }: { item: IUser }) {
    return <UserCard user={item} />;
  }

  function fetchData(): void {
    dispatch(fetchUsersAsync() as any);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(user) => user?.login?.uuid}
          onRefresh={fetchData}
          refreshing={status !== EApiState.IDLE}
        />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  loadingContainer: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
});
