import { StyleSheet, View, Pressable } from "react-native";

import { router } from "expo-router";

import ThemeView from "../../components/ThemeView";
import ThemeText from "../../components/ThemeText";

const Profile = () => {
  return (
    <ThemeView style={styles.container}>
      <ThemeText variant="heading" style={styles.title}>
        My Profile
      </ThemeText>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <ThemeText style={styles.avatarText}>L</ThemeText>
        </View>

        <ThemeText variant="title" style={styles.name}>
          La Min Hein
        </ThemeText>

        <ThemeText variant="secondary">laminhein@gmail.com</ThemeText>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <ThemeText variant="secondary">Full Name</ThemeText>
          <ThemeText style={styles.infoValue}>La Min Hein</ThemeText>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <ThemeText variant="secondary">Email</ThemeText>
          <ThemeText style={styles.infoValue}>laminhein@gmail.com</ThemeText>
        </View>
      </View>

      <Pressable
        style={styles.logoutButton}
        onPress={() => router.replace("/")}
      >
        <ThemeText style={styles.logoutText}>Logout</ThemeText>
      </Pressable>
    </ThemeView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 30,
  },
  profileCard: {
    alignItems: "center",
    padding: 25,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    elevation: 2,
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 50,
    backgroundColor: "#dbeafe",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarText: {
    color: "#2563eb",
    fontSize: 35,
    fontWeight: "800",
  },
  name: {
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 5,
  },
  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 18,
    marginTop: 25,
    elevation: 2,
  },
  infoRow: {
    gap: 8,
    paddingVertical: 8,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 8,
  },
  logoutButton: {
    marginTop: 30,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: "#ef4444",
    fontSize: 15,
    fontWeight: "700",
  },
});
