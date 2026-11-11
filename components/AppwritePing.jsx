import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { client } from "../lib/appwrite";

const AppwritePing = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handlePing = async () => {
    try {
      setLoading(true);
      setStatus("");

      await client.ping();

      setStatus("Connected successfully to Appwrite!");
    } catch (error) {
      console.error("Appwrite connection error:", error);

      setStatus("Failed to connect to Appwrite.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appwrite Connection</Text>

      <Pressable style={styles.button} onPress={handlePing} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Test Connection</Text>
        )}
      </Pressable>

      {status !== "" && <Text style={styles.status}>{status}</Text>}
    </View>
  );
};

export default AppwritePing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#c41c1c",
    fontWeight: "600",
  },
  status: {
    marginTop: 20,
    fontSize: 14,
    textAlign: "center",
  },
});
