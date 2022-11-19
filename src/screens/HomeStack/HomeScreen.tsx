import { AnyAction } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersAsync, selectUser } from "../../redux/user/reducer";
import { EApiState } from "../../enums";
import { IUser } from "../../interfaces";
import UserCard from "../../components/HomeScreenElements/UserCard";
import useToast from "../../hooks/useToast";
import { PRIMARY } from "../../theme/colors";

function HomeScreen() {
  const { value: users, status } = useSelector(selectUser);
  const dispatch = useDispatch();
  const { show } = useToast();

  function renderUserItem({ item }: { item: IUser }) {
    return <UserCard user={item} />;
  }

  function fetchData(): void {
    dispatch(fetchUsersAsync() as any);
    show({ message: "Fetching users...", color: PRIMARY });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        contentContainerStyle={styles.container}
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(user) => user?.login?.uuid}
        onRefresh={fetchData}
        refreshing={status === EApiState.LOADING}
      />
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
