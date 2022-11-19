import * as React from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { Avatar } from "react-native-paper";

import { PRIMARY } from "../../../theme/colors";
import { IUser } from "../../../interfaces";
import { getFullName } from "../../../utils";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "../../../redux/user/reducer";
import t from "../../../theme";
import styles from "./UserCard.styles";

interface IUserCardProps {
  user: IUser;
}

function UserCard({ user }: IUserCardProps) {
  const { name, location, picture, isFavorite } = user;
  const dispatch = useDispatch();
  const fullName: string = getFullName(name?.first, name?.last);
  const address: string = `${location?.city ?? ""}, ${location?.state ?? ""}`;

  function handleToggleFavorite(): void {
    dispatch(toggleFavorite(user?.login?.uuid));
  }

  return (
    <View style={[t.relative, t.flexRow, t.itemsCenter, styles.container]}>
      <Image
        style={styles.avatar}
        source={{
          uri: picture?.thumbnail,
        }}
      />
      <View style={styles.contentContainer}>
        <Text style={[t.fontSansBold, styles.fullName]}>{fullName}</Text>
        <View style={styles.addressInfo}>
          <AntDesignIcon name="enviroment" color={"gray"} size={14} />
          <Text style={styles.address} numberOfLines={1}>
            {address}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleToggleFavorite}>
        <Ionicons
          name={`star${!isFavorite ? "-outline" : ""}`}
          size={20}
          color={PRIMARY}
        />
      </TouchableOpacity>
    </View>
  );
}

export default UserCard;
