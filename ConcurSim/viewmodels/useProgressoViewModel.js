import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

import { useUserDetail } from "../context/UserDetailContext";
import { buscarSimuladosPorUsuario } from "../services/simuladosService";

export function useProgressoViewModel() {
  const { user, loadingUser } = useUserDetail();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [ultimosSimulados, setUltimosSimulados] = useState([]);

  const fetchProgresso = useCallback(async () => {
    if (!user?.uid) {
      setStats([]);
      setUltimosSimulados([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // usa a service 
      const listaSimulados = await buscarSimuladosPorUsuario(user.uid);

      if (!listaSimulados.length) {
        setStats([]);
        setUltimosSimulados([]);
        setLoading(false);
        return;
      }

      const porMateria = {};
      const simuladosOrdenaveis = [];

      listaSimulados.forEach((sim) => {
        const materiaId = sim.materiaId || "sem-materia";
        const materiaNome = sim.materiaNome || materiaId;
        const score = Number(sim.score) || 0;
        const totalQuestoes = Number(sim.totalQuestoes) || 0;
        const acertos = Number(sim.acertos) || 0;

        let completedAtDate = null;
        if (sim.completedAt && sim.completedAt.toDate) {
          completedAtDate = sim.completedAt.toDate();
        } else if (sim.createdAt && sim.createdAt.toDate) {
          completedAtDate = sim.createdAt.toDate();
        }

        if (!porMateria[materiaId]) {
          porMateria[materiaId] = {
            materiaId,
            materiaNome,
            qtdSimulados: 0,
            somaNotas: 0,
            totalQuestoes: 0,
            acertos: 0,
          };
        }

        porMateria[materiaId].qtdSimulados += 1;
        porMateria[materiaId].somaNotas += score;
        porMateria[materiaId].totalQuestoes += totalQuestoes;
        porMateria[materiaId].acertos += acertos;

        simuladosOrdenaveis.push({
          id: sim.id,
          materiaId,
          materiaNome,
          score,
          totalQuestoes,
          acertos,
          completedAt: completedAtDate,
        });
      });

      const resultado = Object.values(porMateria).map((m) => {
        const mediaNota =
          m.qtdSimulados > 0 ? m.somaNotas / m.qtdSimulados : 0;
        const percAcertos =
          m.totalQuestoes > 0 ? (m.acertos / m.totalQuestoes) * 100 : 0;

        return {
          materiaId: m.materiaId,
          materiaNome: m.materiaNome,
          qtdSimulados: m.qtdSimulados,
          mediaNota,
          percAcertos,
        };
      });

      resultado.sort((a, b) =>
        a.materiaNome.localeCompare(b.materiaNome, "pt-BR")
      );

      simuladosOrdenaveis.sort((a, b) => {
        const ta = a.completedAt ? a.completedAt.getTime() : 0;
        const tb = b.completedAt ? b.completedAt.getTime() : 0;
        return tb - ta;
      });

      const ultimos = simuladosOrdenaveis.slice(0, 5);

      setStats(resultado);
      setUltimosSimulados(ultimos);
    } catch (err) {
      console.log("Erro ao carregar progresso:", err);
      setStats([]);
      setUltimosSimulados([]);
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  useFocusEffect(
    useCallback(() => {
      if (!loadingUser) {
        fetchProgresso();
      }
    }, [loadingUser, fetchProgresso])
  );

  const formatarData = (date) => {
    if (!date) return "Data não disponível";
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    const hora = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${dia}/${mes}/${ano} ${hora}:${min}`;
  };

  const userLogado = !!user?.uid;
  const semSimulados = !loading && userLogado && stats.length === 0;

  return {
    loading: loading || loadingUser,
    userLogado,
    semSimulados,
    stats,
    ultimosSimulados,
    formatarData,
  };
}
