import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

import { TransferItem } from "@/src/features/transfer/components/TransferItem";
import { useTransfers } from "@/src/features/transfer/hooks/useTransfers";

export default function History() {
  const { transfers, loading, filters, setFilters } = useTransfers();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial</Text>

      <TextInput
        placeholder="Monto mínimo"
        keyboardType="numeric"
        value={filters.min}
        onChangeText={(text) => setFilters((prev) => ({ ...prev, min: text }))}
        style={styles.input}
      />

      <TextInput
        placeholder="Monto máximo"
        keyboardType="numeric"
        value={filters.max}
        onChangeText={(text) => setFilters((prev) => ({ ...prev, max: text }))}
        style={styles.input}
      />

      <TextInput
        placeholder="Fecha (YYYY-MM-DD)"
        value={filters.date}
        onChangeText={(text) => setFilters((prev) => ({ ...prev, date: text }))}
        style={styles.input}
      />

      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          data={transfers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <TransferItem item={item} />}
          ListEmptyComponent={<Text>No hay transferencias</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});
