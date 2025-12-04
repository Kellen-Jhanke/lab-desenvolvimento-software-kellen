import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import Button from "../Shared/Button";

export default function SemSimulado() {
  const router = useRouter();

  const handleComecarRevisar = () => {
    router.push("/explore");
  };

  return (
    <View
      style={{
        marginTop: 40,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 15,
          textAlign: "center",
          marginTop: 16,
        }}
      >
        Você ainda não tem nenhum simulado
      </Text>

      <Button text={"Comece a revisar"} onPress={handleComecarRevisar} />
    </View>
  );
}
