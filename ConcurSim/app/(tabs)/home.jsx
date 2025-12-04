import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

import ComSimulado from "../../components/Home/ComSimulado";
import Header from "../../components/Home/Header";
import SemSimulado from "../../components/Home/SemSimulado";

import { useUserDetail } from "../../context/UserDetailContext";
import { buscarSimuladosPorUsuario } from "../../services/simuladosService";

export default function Home() {
  const { user, loadingUser } = useUserDetail();
  const [temSimulados, setTemSimulados] = useState(false);
  const [carregandoSimulados, setCarregandoSimulados] = useState(true);

  useEffect(() => {
    const verificarSimulados = async () => {
      if (!user) {
        setTemSimulados(false);
        setCarregandoSimulados(false);
        return;
      }

      try {
        setCarregandoSimulados(true);

        // usa a service
        const lista = await buscarSimuladosPorUsuario(user.uid);

        setTemSimulados(lista.length > 0);
      } catch (err) {
        console.log("Erro ao verificar simulados:", err);
        setTemSimulados(false);
      } finally {
        setCarregandoSimulados(false);
      }
    };

    if (!loadingUser) {
      verificarSimulados();
    }
  }, [user, loadingUser]);

  if (loadingUser || carregandoSimulados) {
    return (
      <View
        style={{
          flex: 1,
          padding: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
        <Text style={{ marginTop: 8, color: "white" }}>
          Carregando seu painel...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        padding: 25,
        flex: 1,
      }}
    >
      <Header />
      <View
        style={{
          marginTop: 40,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          source={require("./../../assets/images/simulado.png")}
          style={{
            height: 200,
            width: 200,
          }}
        />
      </View>

      {temSimulados ? <ComSimulado /> : <SemSimulado />}
    </View>
  );
}

const styles = StyleSheet.create({});
