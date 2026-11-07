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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const colorScheme = useColorScheme();
  const theme = Color[colorScheme] || Color.light;

  const handleLogin = () => {
    if (!email || !password) {
      return;
    }

    console.log({ email, password });
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

            <ThemeText variant="heading">Welcome Back</ThemeText>

            <ThemeText variant="secondary" style={styles.subtitle}>
              Login to continue your journey.
            </ThemeText>
          </View>

          {/* Login Form */}
          <ThemeCard style={styles.card}>
            <ThemeText variant="title">Login to your account</ThemeText>

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
                placeholder="Enter your password"
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

            {/* Forgot Password */}
            <Pressable style={styles.forgot}>
              <ThemeText variant="secondary" style={{ color: theme.button }}>
                Forgot Password?
              </ThemeText>
            </Pressable>

            {/* Login Button */}
            <Pressable
              onPress={handleLogin}
              style={[styles.button, { backgroundColor: theme.button }]}
            >
              <ThemeText style={styles.buttonText}>Login</ThemeText>
            </Pressable>

            {/* Register Link */}
            <View style={styles.footer}>
              <ThemeText variant="secondary">Don't have an account?</ThemeText>

              <Link href="/register" asChild>
                <Pressable>
                  <ThemeText
                    style={{
                      color: theme.button,
                      fontWeight: "bold",
                      marginLeft: 5,
                    }}
                  >
                    Sign Up
                  </ThemeText>
                </Pressable>
              </Link>
            </View>
          </ThemeCard>

          {/* Bottom Text */}
          <ThemeText variant="muted" style={styles.bottomText}>
            By continuing, you agree to our Terms & Privacy Policy.
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
    marginBottom: 30,
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
    marginTop: 22,
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

  forgot: {
    alignSelf: "flex-end",
    marginBottom: 22,
  },

  button: {
    height: 54,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
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
