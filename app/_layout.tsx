import { useAuthStore } from "@/src/features/auth/store/useAuthStore";
import { Stack } from "expo-router";

export default function RootLayout() {
  const token = useAuthStore((state) => state.token);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!token ? <Stack.Screen name="(auth)" /> : <Stack.Screen name="(tabs)" />}
    </Stack>
  );
}
