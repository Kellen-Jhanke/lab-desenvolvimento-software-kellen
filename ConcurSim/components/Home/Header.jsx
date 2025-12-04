import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import { auth } from "../../config/firebaseConfig";
import { useUserDetail } from "../../context/UserDetailContext";

export default function Header() {
  const router = useRouter();
  const { user } = useUserDetail();

  const firstName = (() => {
    if (!user) return "USUÁRIO";

    const baseName =
      user.displayName ||
      (user.email ? user.email.split("@")[0] : null);

    if (!baseName) return "USUÁRIO";

    const first = baseName.split(" ")[0];
    return first.toUpperCase();
  })();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/");
    } catch (err) {
      console.log("Erro ao deslogar:", err);
      Alert.alert("Erro", "Não foi possível sair da conta. Tente novamente.");
    }
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Olá, {firstName}
        </Text>
      </View>

      <TouchableOpacity onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={25} color="black" />
      </TouchableOpacity>
    </View>
  );
}
