import { getBalanceService } from "@/src/features/balance/services/balance.service";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function Home() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const data = await getBalanceService();
        setBalance(data.accountBalance);
      } catch (error) {
        console.log("🚀 ~ fetchBalance ~ error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Text>Saldo:</Text>
      <Text>{balance}</Text>
    </View>
  );
}
