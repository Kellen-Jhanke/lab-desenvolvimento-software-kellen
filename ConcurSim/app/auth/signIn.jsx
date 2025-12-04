import { auth, db } from '@/config/firebaseConfig';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../constants/Colors';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);

  const getUserDetail = async (cleanEmail) => {
    const ref = doc(db, 'users', cleanEmail);
    const result = await getDoc(ref);

    if (!result.exists()) {
      return null;
    }

    return result.data();
  };

  const onSignInClick = async () => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      ToastAndroid.show('Preencha e-mail e senha.', ToastAndroid.SHORT);
      return;
    }

    setLoading(true);

    try {
      // 1) Autentica no Firebase Auth
      const resp = await signInWithEmailAndPassword(auth, cleanEmail, password);
      const firebaseUser = resp.user;
      console.log('Usuário autenticado:', firebaseUser.email);

      // 2) Busca o perfil correspondente na coleção "users"
      const perfil = await getUserDetail(cleanEmail);

      if (!perfil) {
        // não há documento em "users" para esse e-mail
        await signOut(auth); // garante que não fique logado só no Auth

        ToastAndroid.show(
          'Conta não encontrada. Faça o cadastro antes de entrar.',
          ToastAndroid.LONG
        );

        setLoading(false);
        return; // NÃO navega pra Home
      }

      // 3) Perfil encontrado -> salva no contexto e segue
      setUserDetail(perfil);
      setLoading(false);
      router.replace('/(tabs)/home');
    } catch (e) {
      console.log('Erro ao fazer login:', e);
      setLoading(false);
      ToastAndroid.show(
        'E-mail e/ou senha está incorreto',
        ToastAndroid.BOTTOM
      );
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
        flex: 1,
        backgroundColor: Colors.White,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontFamily: 'outfit-bold',
        }}
      >
        Bem-vindo de volta
      </Text>

      <TextInput
        placeholder="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={(value) => setEmail(value)}
        style={styles.textInput}
        value={email}
      />

      <TextInput
        placeholder="Senha"
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}
        style={styles.textInput}
        value={password}
      />

      <TouchableOpacity
        onPress={onSignInClick}
        disabled={loading}
        style={{
          padding: 15,
          backgroundColor: Colors.Blue,
          width: '100%',
          marginTop: 20,
        }}
      >
        {!loading ? (
          <Text
            style={{
              fontFamily: 'outfit',
              fontSize: 20,
              color: Colors.White,
              textAlign: 'center',
            }}
          >
            Entrar
          </Text>
        ) : (
          <ActivityIndicator size={'large'} color={Colors.White} />
        )}
      </TouchableOpacity>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontFamily: 'outfit',
          }}
        >
          Ainda não tem uma conta?{' '}
        </Text>
        <Pressable onPress={() => router.push('/auth/signUp')}>
          <Text
            style={{
              color: Colors.Blue,
              fontFamily: 'outfit-bold',
            }}
          >
            Clique aqui para criar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: '100%',
    padding: 10,
    fontSize: 20,
    marginTop: 20,
  },
});
