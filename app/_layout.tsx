import { useAuthStore } from "@/src/features/auth/store/useAuthStore";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const token = useAuthStore((state) => state.token);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    // Inicializar autenticación al cargar la app
    initializeAuth();
  }, []);

  // No mostrar nada mientras se está inicializando
  if (!isInitialized) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!token ? <Stack.Screen name="(auth)" /> : <Stack.Screen name="(tabs)" />}
    </Stack>
  );
}
