import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";

import { Link } from "expo-router";
import { useState } from "react";

import ThemeView from "../../components/ThemeView";
import ThemeText from "../../components/ThemeText";
import ThemeInput from "../../components/ThemeInput";
import ThemeButton from "../../components/ThemeButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) return;

    console.log({ email, password });
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
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            <View style={styles.header}>
              <View style={styles.logo}>
                <ThemeText style={styles.logoText}>L</ThemeText>
              </View>

              <ThemeText variant="heading" style={styles.heading}>
                Welcome Back
              </ThemeText>

              <ThemeText variant="secondary" style={styles.subtitle}>
                Login to your account and continue
              </ThemeText>
            </View>

            <View style={styles.fields}>
              <View style={styles.fieldGroup}>
                <ThemeText style={styles.label}>Email Address</ThemeText>

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
                <ThemeText style={styles.label}>Password</ThemeText>

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
                    hitSlop={10}
                  >
                    <ThemeText style={styles.showText}>
                      {showPassword ? "Hide" : "Show"}
                    </ThemeText>
                  </Pressable>
                </View>
              </View>
            </View>

            <Pressable style={styles.forgot}>
              <ThemeText style={styles.forgotText}>Forgot Password?</ThemeText>
            </Pressable>

            <ThemeButton onPress={handleLogin}>
              <ThemeText style={styles.buttonText}>Login</ThemeText>
            </ThemeButton>

            <View style={styles.footer}>
              <ThemeText variant="secondary" style={styles.footerText}>
                Don't have an account?
              </ThemeText>

              <Link href="/register" asChild>
                <Pressable hitSlop={8}>
                  <ThemeText style={styles.link}>Sign Up</ThemeText>
                </Pressable>
              </Link>
            </View>

            {/* Bottom text */}
            <ThemeText variant="secondary" style={styles.bottomText}>
              By continuing, you agree to our Terms & Privacy Policy.
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
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  form: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: 38,
  },

  logo: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  logoText: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "800",
  },

  heading: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.8,
  },

  subtitle: {
    fontSize: 15,
    marginTop: 10,
    textAlign: "center",
  },

  fields: {
    gap: 22,
  },

  fieldGroup: {
    gap: 10,
  },

  label: {
    fontSize: 15,
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
    right: 16,
    paddingVertical: 10,
    zIndex: 1,
  },

  showText: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "700",
  },

  forgot: {
    alignSelf: "flex-end",
    marginTop: 18,
    marginBottom: 24,
  },

  forgotText: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "600",
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    gap: 5,
  },

  footerText: {
    fontSize: 14,
  },

  link: {
    color: "#2563eb",
    fontWeight: "700",
    fontSize: 14,
  },

  bottomText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 45,
    lineHeight: 20,
  },
});
