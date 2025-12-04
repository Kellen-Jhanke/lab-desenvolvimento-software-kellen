import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import Colors from "../constants/Colors";
import { useUserDetail } from "../context/UserDetailContext";

import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";

export default function Index() {
  const router = useRouter();
  const { user, loadingUser } = useUserDetail();

  useEffect(() => {
    const verificarPerfil = async () => {

      if (loadingUser) return;

      if (!user) return;

      try {
        const cleanEmail = user.email?.trim().toLowerCase();
        if (!cleanEmail) {
          await signOut(auth);
          return;
        }

        const ref = doc(db, "users", cleanEmail);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          router.replace("/(tabs)/home");
        } else {
          await signOut(auth);
        }
      } catch (err) {
        console.log("Erro ao verificar perfil do usuário:", err);
      }
    };

    verificarPerfil();
  }, [loadingUser, user, router]);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors.White,
      }}
    >
      <Image
        source={require("./../assets/images/landing.png")}
        style={{ width: "100%", height: 500, marginTop: 30 }}
      />

      <View
        style={{
          padding: 50,
          backgroundColor: Colors.PrimaryBlue,
          height: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            color: Colors.White,
          }}
        >
          Bem-vindo
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/auth/signUp")}
        >
          <Text style={styles.buttonText}>Comece aqui</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/auth/signIn")}
        >
          <Text style={styles.buttonText}>Já possui conta?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: Colors.White,
    marginTop: 30,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
  },
});
