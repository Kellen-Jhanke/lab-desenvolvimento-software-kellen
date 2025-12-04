import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export async function salvarSimulado({
  userId,
  materiaId,
  materiaNome,
  score,
  totalQuestoes,
  acertos,
  respostas,
}) {
  return addDoc(collection(db, "simulados"), {
    userId,
    materiaId,
    materiaNome: materiaNome || null,
    createdAt: serverTimestamp(),
    completedAt: serverTimestamp(),
    score,
    totalQuestoes,
    acertos,
    respostas,
  });
}

export async function buscarSimuladosPorUsuario(userId) {
  const simuladosRef = collection(db, "simulados");
  const q = query(simuladosRef, where("userId", "==", userId));
  const snap = await getDocs(q);

  const lista = [];
  snap.forEach((doc) => {
    lista.push({ id: doc.id, ...doc.data() });
  });

  return lista;
}
