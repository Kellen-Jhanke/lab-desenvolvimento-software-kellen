import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export async function buscarQuestoesPorMateria(materiaId) {
  const ref = collection(db, "questoes");
  const q = query(ref, where("materiaId", "==", materiaId));
  const snap = await getDocs(q);

  const lista = [];
  snap.forEach((doc) => {
    lista.push({ id: doc.id, ...doc.data() });
  });

  return lista;
}
