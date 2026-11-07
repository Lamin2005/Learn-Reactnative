import { StyleSheet, Text, View, Image } from "react-native";
import Laminhein from "../assets/img/Laminhein.jpg";
import { Link } from "expo-router";
import ThemeView from "../components/ThemeView";
import ThemeCard from "../components/ThemeCard";
import ThemeText from "../components/ThemeText";

const Home = () => {
  return (
    <ThemeView style={styles.container}>
      <ThemeText style={[styles.title, { fontStyle: "italic" }]}>
        Hello This my first react native app
      </ThemeText>
      <ThemeCard>
        <Image source={Laminhein} style={styles.image} />
        <Text style={styles.cardTitle}>Welcome!</Text>
        <Text style={styles.cardDescription}>
          I'm La Min Hein. I'm learning React Native.
        </Text>
        <Link href="/login" style={styles.linkButton}>
          <ThemeText style={styles.linkText}>Login</ThemeText>
        </Link>
        <Link href="/register" style={styles.linkButton}>
          <ThemeText style={styles.linkText}>Register</ThemeText>
        </Link>
      </ThemeCard>
    </ThemeView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },

  cardTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  cardDescription: {
    color: "#cbd5e1",
    fontSize: 15,
    lineHeight: 24,
  },
  image: {
    width: 310,
    height: 150,
    borderRadius: 20,
    objectFit: "center",
    marginBottom: 16,
  },

  linkButton: {
    backgroundColor: "#0284c7",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    textAlign: "center",
    marginTop: 20,
  },

  linkText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
