import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useProgressoViewModel } from "../../viewmodels/useProgressoViewModel";

import SemSimulado from "../../components/Home/SemSimulado";

export default function Progresso() {
  const {
    loading,
    userLogado,
    semSimulados,
    stats,
    ultimosSimulados,
    formatarData,
  } = useProgressoViewModel();

  if (loading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator />
        <Text>Carregando seu progresso...</Text>
      </View>
    );
  }

  if (!userLogado) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ textAlign: "center" }}>
          Faça login para visualizar seu progresso.
        </Text>
      </View>
    );
  }

  if (semSimulados) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <SemSimulado />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 16,
        }}
      >
        Seu progresso por matéria
      </Text>

      {stats.map((m) => (
        <View
          key={m.materiaId}
          style={{
            marginBottom: 12,
            padding: 16,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#ccc",
            backgroundColor: "#fff",
          }}
        >
          <Text
            style={{ fontSize: 18, fontWeight: "bold", marginBottom: 4 }}
          >
            {m.materiaNome}
          </Text>

          <Text>Simulados realizados: {m.qtdSimulados}</Text>
          <Text>Média de notas: {m.mediaNota.toFixed(1)}</Text>
          <Text>Taxa de acertos: {m.percAcertos.toFixed(1)}%</Text>
        </View>
      ))}

      {ultimosSimulados.length > 0 && (
        <View style={{ marginTop: 24 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 12,
            }}
          >
            Últimos simulados
          </Text>

          {ultimosSimulados.map((s) => (
            <View
              key={s.id}
              style={{
                marginBottom: 10,
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#ddd",
                backgroundColor: "#fff",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                {s.materiaNome} — Nota {s.score.toFixed(1)}
              </Text>
              <Text>
                Acertos: {s.acertos}/{s.totalQuestoes}
              </Text>
              <Text>Concluído em: {formatarData(s.completedAt)}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
