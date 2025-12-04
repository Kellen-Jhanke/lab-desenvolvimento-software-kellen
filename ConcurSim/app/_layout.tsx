import { Stack } from "expo-router";
import React from "react";
import "react-native-reanimated";

import UserDetailProvider from "../context/UserDetailContext"; 

export default function RootLayout() {
  return (
    <UserDetailProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </UserDetailProvider>
  );
}
