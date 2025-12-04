import { router } from "expo-router";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { db } from "../../config/firebaseConfig";
import Colors from "../../constants/Colors";

export default function Explore() {
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const materiasRef = collection(db, "materias");

        const q = query(materiasRef, orderBy("nome", "asc"));

        const snap = await getDocs(q);

        const lista = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMaterias(lista);
      } catch (err) {
        console.log("Erro ao carregar matérias:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterias();
  }, []);

  const handleStartSimulado = (materia) => {
    router.push({
      pathname: "/simulado",
      params: {
        materiaId: materia.id,
        materiaNome: materia.nome,
      },
    });
  };

  if (loading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator />
        <Text>Carregando matérias...</Text>
      </View>
    );
  }

  if (materias.length === 0) {
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
          Nenhuma matéria cadastrada no momento.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 16 }}>
        Explorar simulados
      </Text>
      <Text style={{ fontSize: 12, color: "#666", marginTop: 4, marginBottom: 16 }}>
        Toque para gerar um simulado de uma das seguinte matérias
      </Text>

      {materias.map((m) => (
        <TouchableOpacity
          key={m.id}
          onPress={() => handleStartSimulado(m)}
          style={{
            padding: 16,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.Blue,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 16 }}>{m.nome}</Text>

        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
