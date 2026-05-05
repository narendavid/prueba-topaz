import { useAuthStore } from "@/src/features/auth/store/useAuthStore";
import { getBalanceService } from "@/src/features/balance/services/balance.service";
import { formattedAmount } from "@/src/shared/utils/formattedAmount";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function Home() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const data = await getBalanceService();
        setBalance(data.accountBalance);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.greeting}>
          Bienvenido(a){user ? `, ${user.name}` : ""}
        </Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Salir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Saldo disponible</Text>

        <Text style={styles.balanceValue}>
          {balance !== null ? formattedAmount(balance) : "--"}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => router.push("/(tabs)/transfer")}
        >
          <Text style={styles.primaryButtonText}>Transferir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => router.push("/(tabs)/transactions")}
        >
          <Text style={styles.secondaryButtonText}>Historial</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 24,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  greeting: {
    fontSize: 18,
    color: "#6B7280",
    flex: 1,
  },

  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#EF4444",
    borderRadius: 8,
  },

  logoutButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },

  balanceCard: {
    backgroundColor: "#000",
    borderRadius: 16,
    padding: 24,
    marginTop: 24,
  },

  balanceLabel: {
    color: "#9CA3AF",
    fontSize: 14,
  },

  balanceValue: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 8,
  },

  actionsContainer: {
    flexDirection: "row",
    marginTop: 32,
    justifyContent: "space-between",
  },

  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  primaryButton: {
    backgroundColor: "#3B82F6",
    marginRight: 8,
  },

  secondaryButton: {
    backgroundColor: "#E5E7EB",
    marginLeft: 8,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  secondaryButtonText: {
    color: "#000000",
    fontWeight: "600",
  },
});
