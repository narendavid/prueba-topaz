import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="transfer" options={{ title: "Transfer" }} />
      <Tabs.Screen name="transactions" options={{ title: "History" }} />
    </Tabs>
  );
}
