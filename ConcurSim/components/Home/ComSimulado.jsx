import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import Button from "../Shared/Button";

export default function ComSimulado() {
  const router = useRouter();

  const handleMeuProgresso = () => {
    router.push("/progresso");
  };

  const handleRevisarNovamente = () => {
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
        Continue revisando seus simulados
      </Text>

      <Button text={"Meu progresso"} onPress={handleMeuProgresso} />

      <Button
        text={"Começar novo simulado"}
        type="outline"
        onPress={handleRevisarNovamente}
      />
    </View>
  );
}
