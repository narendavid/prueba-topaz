import { loginService } from "@/src/features/auth/services/login.service";
import { useAuthStore } from "@/src/features/auth/store/useAuthStore";
import { router } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("gabriel@topaz.com");
  const [password, setPassword] = useState("1111");

  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async () => {
    try {
      const data = await loginService({ email, password });
      console.log("🚀 ~ handleLogin ~ data:", data);
      setAuth(data.user, data.token);
      router.replace("/(tabs)/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Login</Text>

      <TextInput value={email} onChangeText={setEmail} />
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
