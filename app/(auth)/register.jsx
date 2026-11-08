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
import ThemeButton from "../../components/ThemeButton";
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

    console.log({ name, email, password });
  };

  return (
    <ThemeView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.logo}>
                <ThemeText style={styles.logoText}>L</ThemeText>
              </View>

              <ThemeText variant="heading" style={styles.heading}>
                Create Account
              </ThemeText>

              <ThemeText variant="secondary" style={styles.subtitle}>
                Create an account to get started.
              </ThemeText>
            </View>

            <ThemeText variant="title" style={styles.cardTitle}>
              Sign up to continue
            </ThemeText>

            <View style={styles.fieldGroup}>
              <ThemeText variant="secondary" style={styles.label}>
                Full Name
              </ThemeText>

              <ThemeInput
                placeholder="Enter your full name"
                autoCapitalize="words"
                autoCorrect={false}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.fieldGroup}>
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
            </View>

            <View style={styles.fieldGroup}>
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
                  hitSlop={10}
                >
                  <ThemeText style={[styles.showText, { color: theme.button }]}>
                    {showPassword ? "Hide" : "Show"}
                  </ThemeText>
                </Pressable>
              </View>
            </View>

            <View style={styles.fieldGroup}>
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
                  hitSlop={10}
                >
                  <ThemeText style={[styles.showText, { color: theme.button }]}>
                    {showConfirmPassword ? "Hide" : "Show"}
                  </ThemeText>
                </Pressable>
              </View>
            </View>

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
                    lineHeight: 19,
                  }}
                >
                  {error}
                </ThemeText>
              </View>
            ) : null}

            <ThemeButton
              onPress={handleRegister}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
            >
              <ThemeText style={styles.buttonText}>Create Account</ThemeText>
            </ThemeButton>

            <View style={styles.footer}>
              <ThemeText variant="secondary" style={styles.footerText}>
                Already have an account?
              </ThemeText>

              <Link href="/login" asChild>
                <Pressable hitSlop={8}>
                  <ThemeText style={[styles.link, { color: theme.button }]}>
                    Login
                  </ThemeText>
                </Pressable>
              </Link>
            </View>

            <ThemeText variant="muted" style={styles.bottomText}>
              By creating an account, you agree to our Terms & Privacy Policy.
            </ThemeText>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
    paddingVertical: 35,
  },

  content: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: 28,
  },

  logo: {
    width: 65,
    height: 65,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 22,
    backgroundColor: "#2563eb",
  },

  logoText: {
    fontSize: 30,
    fontWeight: "800",
    color: "#ffffff",
  },

  heading: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },

  card: {
    padding: 22,
    borderRadius: 20,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 8,
  },

  fieldGroup: {
    gap: 9,
    marginTop: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
  },

  passwordContainer: {
    position: "relative",
    justifyContent: "center",
  },

  passwordInput: {
    paddingRight: 65,
  },

  showButton: {
    position: "absolute",
    right: 15,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    zIndex: 1,
  },

  showText: {
    fontSize: 13,
    fontWeight: "700",
  },

  errorContainer: {
    padding: 12,
    borderRadius: 10,
    marginTop: 18,
  },

  button: {
    height: 54,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    backgroundColor: "#2563eb",
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    gap: 5,
  },

  footerText: {
    fontSize: 14,
  },

  link: {
    fontWeight: "700",
    fontSize: 14,
  },

  bottomText: {
    textAlign: "center",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 25,
  },
});
