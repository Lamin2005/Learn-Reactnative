import {
  StyleSheet,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme,
} from "react-native";

import { Link } from "expo-router";
import { useState } from "react";

import ThemeView from "../../components/ThemeView";
import ThemeText from "../../components/ThemeText";
import ThemeCard from "../../components/ThemeCard";
import ThemeInput from "../../components/ThemeInput";

import Color from "../../constant/Color";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const colorScheme = useColorScheme();
  const theme = Color[colorScheme] || Color.light;

  const handleRegister = () => {
    setError("");

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // TODO: Connect Register API
    console.log({
      name,
      email,
      password,
    });
  };

  return (
    <ThemeView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.logo, { backgroundColor: theme.primary }]}>
              <ThemeText style={styles.logoText}>L</ThemeText>
            </View>

            <ThemeText variant="heading">Create Account</ThemeText>

            <ThemeText variant="secondary" style={styles.subtitle}>
              Create an account to get started.
            </ThemeText>
          </View>

          {/* Register Form */}
          <ThemeCard style={styles.card}>
            <ThemeText variant="title">Sign up to continue</ThemeText>

            {/* Full Name */}
            <ThemeText variant="secondary" style={styles.label}>
              Full Name
            </ThemeText>

            <ThemeInput
              placeholder="Enter your full name"
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
            />

            {/* Email */}
            <ThemeText variant="secondary" style={styles.label}>
              Email Address
            </ThemeText>

            <ThemeInput
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />

            {/* Password */}
            <ThemeText variant="secondary" style={styles.label}>
              Password
            </ThemeText>

            <View style={styles.passwordContainer}>
              <ThemeInput
                placeholder="Create password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                style={styles.passwordInput}
              />

              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={styles.showButton}
              >
                <ThemeText
                  style={{
                    color: theme.button,
                    fontSize: 13,
                    fontWeight: "600",
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </ThemeText>
              </Pressable>
            </View>

            {/* Confirm Password */}
            <ThemeText variant="secondary" style={styles.label}>
              Confirm Password
            </ThemeText>

            <View style={styles.passwordContainer}>
              <ThemeInput
                placeholder="Confirm your password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.passwordInput}
              />

              <Pressable
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.showButton}
              >
                <ThemeText
                  style={{
                    color: theme.button,
                    fontSize: 13,
                    fontWeight: "600",
                  }}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </ThemeText>
              </Pressable>
            </View>

            {/* Error Message */}
            {error ? (
              <View
                style={[
                  styles.errorContainer,
                  { backgroundColor: theme.error || "#fee2e2" },
                ]}
              >
                <ThemeText
                  style={{
                    color: theme.errorText || "#dc2626",
                    fontSize: 13,
                  }}
                >
                  {error}
                </ThemeText>
              </View>
            ) : null}

            {/* Register Button */}
            <Pressable
              onPress={handleRegister}
              style={[styles.button, { backgroundColor: theme.button }]}
            >
              <ThemeText style={styles.buttonText}>Create Account</ThemeText>
            </Pressable>

            {/* Login Link */}
            <View style={styles.footer}>
              <ThemeText variant="secondary">
                Already have an account?
              </ThemeText>

              <Link href="/login" asChild>
                <Pressable>
                  <ThemeText
                    style={{
                      color: theme.button,
                      fontWeight: "bold",
                      marginLeft: 5,
                    }}
                  >
                    Login
                  </ThemeText>
                </Pressable>
              </Link>
            </View>
          </ThemeCard>

          {/* Bottom Text */}
          <ThemeText variant="muted" style={styles.bottomText}>
            By creating an account, you agree to our Terms & Privacy Policy.
          </ThemeText>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 22,
  },

  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  logo: {
    width: 65,
    height: 65,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 22,
  },

  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0f172a",
  },

  subtitle: {
    marginTop: 8,
  },

  card: {
    padding: 22,
  },

  label: {
    marginTop: 18,
    marginBottom: 10,
  },

  passwordContainer: {
    position: "relative",
    justifyContent: "center",
  },

  passwordInput: {
    paddingRight: 55,
  },

  showButton: {
    position: "absolute",
    right: 14,
    top: 15,
    zIndex: 1,
  },

  errorContainer: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 18,
  },

  button: {
    height: 54,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },

  bottomText: {
    textAlign: "center",
    marginTop: 25,
  },
});
