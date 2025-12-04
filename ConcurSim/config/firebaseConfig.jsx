import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyBgKP3QRDA8ubjMXkAQp60sSICe1l2yOfo",
  authDomain: "concursim-app.firebaseapp.com",
  projectId: "concursim-app",
  storageBucket: "concursim-app.firebasestorage.app",
  messagingSenderId: "1075985855635",
  appId: "1:1075985855635:web:919d4fb6d8a93582a3c966",
  measurementId: "G-2NGTB2FWRJ"
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth =
  Platform.OS === 'web'
    ? getAuth(app) 
    : initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });