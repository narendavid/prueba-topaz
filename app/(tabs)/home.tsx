import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Home() {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Go to Transfer" onPress={() => router.push("/transfer")} />
    </View>
  );
}
