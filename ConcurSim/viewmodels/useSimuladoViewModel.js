import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { useUserDetail } from "../context/UserDetailContext";
import { buscarQuestoesPorMateria } from "../services/questoesService";
import { salvarSimulado } from "../services/simuladosService";

export function useSimuladoViewModel({ materiaId, materiaNome }) {
  const router = useRouter();
  const { user } = useUserDetail();

  const [loading, setLoading] = useState(true);
  const [questoes, setQuestoes] = useState([]);
  const [respostas, setRespostas] = useState({});
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [salvando, setSalvando] = useState(false);

  const totalQuestoes = questoes.length;

  useEffect(() => {
    const carregar = async () => {
      try {
        setLoading(true);
        const lista = await buscarQuestoesPorMateria(materiaId);

        if (!lista.length) {
          Alert.alert(
            "Atenção",
            "Ainda não há questões cadastradas para esta matéria."
          );
          router.back();
          return;
        }

        setQuestoes(lista);
        setIndiceAtual(0);
        setRespostas({});
      } catch (err) {
        console.log("Erro ao buscar questões:", err);
        Alert.alert("Erro", "Não foi possível carregar as questões.");
        router.back();
      } finally {
        setLoading(false);
      }
    };

    if (materiaId) {
      carregar();
    }
  }, [materiaId]);

  const handleSelecionarOpcao = (questaoId, opcaoIndex) => {
    setRespostas((prev) => ({
      ...prev,
      [questaoId]: opcaoIndex,
    }));
  };

  const irProxima = () => {
    if (indiceAtual < totalQuestoes - 1) {
      setIndiceAtual((prev) => prev + 1);
    }
  };

  const irAnterior = () => {
    if (indiceAtual > 0) {
      setIndiceAtual((prev) => prev - 1);
    }
  };

  const calcularScore = () => {
    let acertos = 0;

    questoes.forEach((q) => {
      const idx = respostas[q.id];
      if (idx === undefined || idx === null) return;

      const respostaUsuarioTexto = q.opcoes[idx];
      if (respostaUsuarioTexto === q.gabarito) acertos++;
    });

    const score =
      questoes.length > 0 ? (acertos / questoes.length) * 10 : 0;

    return { acertos, score };
  };

  const finalizarSimulado = async () => {
    if (Object.keys(respostas).length < totalQuestoes) {
      Alert.alert("Atenção", "Responda todas as questões antes de finalizar.");
      return;
    }

    const { acertos, score } = calcularScore();

    try {
      setSalvando(true);

      const respostasArray = questoes.map((q) => {
        const idx = respostas[q.id];
        const respostaUsuarioTexto =
          idx === undefined || idx === null ? null : q.opcoes[idx];

        const correta =
          respostaUsuarioTexto != null &&
          respostaUsuarioTexto === q.gabarito;

        return {
          questaoId: q.id,
          respostaUsuarioIndex: idx,
          respostaUsuarioTexto,
          gabarito: q.gabarito,
          correta,
        };
      });

      await salvarSimulado({
        userId: user?.uid,
        materiaId,
        materiaNome,
        score,
        totalQuestoes,
        acertos,
        respostas: respostasArray,
      });

      Alert.alert(
        "Simulado finalizado",
        `Você acertou ${acertos} de ${totalQuestoes} questões.\nNota: ${score.toFixed(
          1
        )}`,
        [
          {
            text: "Ver progresso",
            onPress: () => router.replace("/progresso"),
          },
          {
            text: "Voltar para Home",
            onPress: () => router.replace("/home"),
          },
        ]
      );
    } catch (err) {
      console.log("Erro ao salvar simulado:", err);
      Alert.alert("Erro", "Não foi possível salvar o resultado do simulado.");
    } finally {
      setSalvando(false);
    }
  };

  return {
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
  };
}
