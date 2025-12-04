import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export async function buscarMaterias() {
  const ref = collection(db, "materias");
  const q = query(ref, orderBy("nome", "asc"));
  const snap = await getDocs(q);

  const lista = [];
  snap.forEach((doc) => {
    lista.push({ id: doc.id, ...doc.data() });
  });

  return lista;
}
