import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../constants/Colors";

import { SafeAreaView } from 'react-native-safe-area-context';
import { useSimuladoViewModel } from "../viewmodels/useSimuladoViewModel";

export default function SimuladoScreen() {
  const { materiaId, materiaNome } = useLocalSearchParams();

  const {
    loading,
    questoes,
    respostas,
    indiceAtual,
    totalQuestoes,
    salvando,
    handleSelecionarOpcao,
    irProxima,
    irAnterior,
    finalizarSimulado,
  } = useSimuladoViewModel({ materiaId, materiaNome });

  if (loading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator />
        <Text>Carregando questões...</Text>
      </View>
    );
  }

  if (!questoes.length) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Nenhuma questão disponível para esta matéria.</Text>
      </View>
    );
  }

  const questaoAtual = questoes[indiceAtual];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 4 }}>
          Simulado de {materiaNome || materiaId}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Questão {indiceAtual + 1} de {totalQuestoes}
        </Text>

        <ScrollView style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, marginBottom: 12 }}>
            {questaoAtual.enunciado}
          </Text>

          {questaoAtual.opcoes.map((op, idx) => {
            const selecionada = respostas[questaoAtual.id] === idx;
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => handleSelecionarOpcao(questaoAtual.id, idx)}
                style={{
                  padding: 12,
                  marginBottom: 8,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: selecionada ? Colors.Blue : "#ccc",
                  backgroundColor: selecionada ? "#e6f0ff" : "#fff",
                }}
              >
                <Text>{op}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View 
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            disabled={indiceAtual === 0}
            onPress={irAnterior}
            style={{
              padding: 10,
              opacity: indiceAtual === 0 ? 0.4 : 1,
            }}
          >
            <Text>Anterior</Text>
          </TouchableOpacity>

          {indiceAtual < totalQuestoes - 1 ? (
            <TouchableOpacity
              onPress={irProxima}
              style={{
                padding: 12,
                borderRadius: 8,
                backgroundColor: Colors.Blue,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Próxima
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={finalizarSimulado}
              disabled={salvando}
              style={{
                padding: 12,
                borderRadius: 8,
                backgroundColor: "green",
                opacity: salvando ? 0.6 : 1,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {salvando ? "Salvando..." : "Finalizar simulado"}
              </Text>
            </TouchableOpacity>
          )}
        </View >
     
    </SafeAreaView>
  );
}
