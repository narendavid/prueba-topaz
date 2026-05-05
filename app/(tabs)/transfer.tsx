import { transferService } from "@/src/features/transfer/services/transfer.service";
import { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

export default function Transfer() {
  const [value, setValue] = useState("");
  const [document, setDocument] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    if (!value || !document || !date) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      await transferService({
        value: Number(value),
        currency: "USD",
        payeerDocument: document,
        transferDate: date,
      });

      Alert.alert("Éxito", "Transferencia realizada");

      setValue("");
      setDocument("");
      setDate("");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo realizar la transferencia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Transferencia</Text>

      <TextInput
        placeholder="Valor"
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
        style={styles.input}
      />

      <TextInput
        placeholder="Documento destinatario"
        value={document}
        onChangeText={setDocument}
        style={styles.input}
      />

      <TextInput
        placeholder="Fecha (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleTransfer}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Enviar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#3B82F6",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
