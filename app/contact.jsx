import { useState } from "react";
import { Link } from "expo-router";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import ThemeButton from "../components/ThemeButton";
import ThemeView from "../components/ThemeView";
import ThemeCard from "../components/ThemeCard";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert("Missing Information", "Please fill in all fields.");
      return;
    }

    Alert.alert("Message Ready", "Your message has been entered successfully.");
  };

  return (
    <ThemeView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Contact Me</Text>

        <Text style={styles.subtitle}>Let's discuss your next project.</Text>

        <ThemeCard style={styles.card}>
          <Text style={styles.sectionTitle}>Get in Touch</Text>

          <View style={styles.infoItem}>
            <View style={styles.iconBox}>
              <Text style={styles.iconText}>@</Text>
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>laminhein@example.com</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.iconBox}>
              <Text style={styles.iconText}>P</Text>
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>+95 XXX XXX XXX</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.iconBox}>
              <Text style={styles.iconText}>L</Text>
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>Myanmar</Text>
            </View>
          </View>
        </ThemeCard>

        <ThemeCard style={styles.card}>
          <Text style={styles.sectionTitle}>Send a Message</Text>

          <Text style={styles.label}>Your Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#64748b"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Your Email</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#64748b"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Your Message</Text>

          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Write your message..."
            placeholderTextColor="#64748b"
            multiline
            textAlignVertical="top"
            value={message}
            onChangeText={setMessage}
          />

          <ThemeButton
            title="Send Message"
            onPress={handleSubmit}
            style={{
              marginTop: 20,
              borderRadius: 30,
              backgroundColor: "#16a34a",
            }}
            textStyle={{
              fontSize: 18,
            }}
          />
          <Link href="/" style={styles.linkButton}>
            <Text style={styles.linkText}>Back to Home</Text>
          </Link>
        </ThemeCard>
      </ScrollView>
    </ThemeView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0f172a",
  },

  container: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },

  heading: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: 15,
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 23,
  },

  card: {
    padding: 20,
    marginBottom: 20,
  },

  sectionTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 22,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  iconText: {
    color: "#38bdf8",
    fontSize: 20,
    fontWeight: "bold",
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    color: "#94a3b8",
    fontSize: 13,
    marginBottom: 5,
  },

  infoValue: {
    color: "#f1f5f9",
    fontSize: 14,
    fontWeight: "500",
  },

  label: {
    color: "#e2e8f0",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 9,
  },

  input: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: "#ffffff",
    fontSize: 15,
    marginBottom: 20,
  },

  messageInput: {
    height: 130,
    paddingTop: 14,
  },

  linkButton: {
    backgroundColor: "#0284c7",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    textAlign: "center",
    marginTop: 10,
  },

  linkText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
