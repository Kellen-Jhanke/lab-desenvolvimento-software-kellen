import { UserDetailContext } from '@/context/UserDetailContext';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, db } from '../../config/firebaseConfig';
import Colors from '../../constants/Colors';

export default function SignUp() {
  const router = useRouter();
  const { setUserDetail } = useContext(UserDetailContext);

  const [name, setName] = useState('');   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const SaveUser = async (user) => {
    const upperName = name.trim().toUpperCase();
    const cleanEmail = email.trim().toLowerCase();

    const data = {
      name: upperName,
      email: cleanEmail,
      uid: user?.uid,
    };

    await setDoc(doc(db, 'users', cleanEmail), data);
    setUserDetail(data);
  };

  const CreateNewAccount = async () => {
    const upperName = name.trim().toUpperCase();
    const cleanEmail = email.trim().toLowerCase();
    const pass = password;

    if (!upperName || !cleanEmail || !pass) {
      ToastAndroid.show(
        'Preencha nome, e-mail e senha.',
        ToastAndroid.SHORT
      );
      return;
    }

    setLoading(true);

    try {
      const resp = await createUserWithEmailAndPassword(
        auth,
        cleanEmail,
        pass
      );

      const user = resp.user;
      console.log('Usuário criado:', user?.email);

      await SaveUser(user);

      ToastAndroid.show(
        'Conta criada com sucesso!',
        ToastAndroid.SHORT
      );
  
      router.replace('/(tabs)/home');
    } catch (e) {
      console.log('Erro ao criar conta:', e);

      if (e.code === 'auth/email-already-in-use') {
        ToastAndroid.show(
          'Este e-mail já está em uso. Use a tela de login.',
          ToastAndroid.LONG
        );
      } else if (e.code === 'auth/invalid-email') {
        ToastAndroid.show(
          'E-mail inválido. Verifique o endereço informado.',
          ToastAndroid.LONG
        );
      } else if (e.code === 'auth/weak-password') {
        ToastAndroid.show(
          'Senha fraca. Use pelo menos 6 caracteres.',
          ToastAndroid.LONG
        );
      } else {
        ToastAndroid.show(
          'Não foi possível criar a conta. Tente novamente.',
          ToastAndroid.LONG
        );
      }
    } finally {
      setLoading(false);
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
        Criar nova conta
      </Text>

      <TextInput
        placeholder="Nome"
        onChangeText={(value) => setName(value.toUpperCase())}
        value={name}
        style={styles.textInput}
      />

      <TextInput
        placeholder="E-mail"
        onChangeText={(value) => setEmail(value)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.textInput}
      />

      <TextInput
        placeholder="Senha"
        onChangeText={(value) => setPassword(value)}
        value={password}
        secureTextEntry={true}
        style={styles.textInput}
      />

      <TouchableOpacity
        onPress={CreateNewAccount}
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
            Criar conta
          </Text>
        ) : (
          <ActivityIndicator color={Colors.White} size="large" />
        )}
      </TouchableOpacity>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 5,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: 'outfit',
          }}
        >
          Já tem uma conta?{' '}
        </Text>

        <TouchableOpacity onPress={() => router.push('/auth/signIn')}>
          <Text
            style={{
              color: Colors.Blue,
              fontFamily: 'outfit-bold',
            }}
          >
            Clique aqui para fazer login
          </Text>
        </TouchableOpacity>
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
