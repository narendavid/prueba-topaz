import { formattedAmount } from "@/src/shared/utils/formattedAmount";
import { StyleSheet, Text, View } from "react-native";
import { Transfer } from "../types/transfer";

interface Props {
  item: Transfer;
}

export const TransferItem = ({ item }: Props) => {
  const formattedDate = new Date(item.date).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.name}>{item.payeer.name}</Text>
        <Text style={styles.amount}>{formattedAmount(item.value)}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>
          Doc: <Text style={styles.value}>{item.payeer.document}</Text>
        </Text>

        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#16A34A",
  },

  infoContainer: {
    marginTop: 8,
  },

  label: {
    fontSize: 13,
    color: "#6B7280",
  },

  value: {
    color: "#374151",
    fontWeight: "500",
  },

  date: {
    marginTop: 4,
    fontSize: 12,
    color: "#9CA3AF",
  },
});
