import { useAuthStore } from "@/src/features/auth/store/useAuthStore";
import { Redirect } from "expo-router";

export default function Index() {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(tabs)" />;
}
