import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Laminhein from "../assets/img/Laminhein.jpg";
import { Link } from "expo-router";
import ThemeView from "../components/ThemeView";
import ThemeCard from "../components/ThemeCard";

const About = () => {
  return (
    <ThemeView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>About Me</Text>

        <Text style={styles.subtitle}>Get to know me better</Text>

        <ThemeCard style={styles.card}>
          <Image source={Laminhein} style={styles.profileImage} />

          <Text style={styles.name}>La Min Hein</Text>

          <Text style={styles.role}>Full-Stack Developer</Text>

          <Text style={styles.description}>
            I'm a Computer Science student passionate about building modern web
            applications and mobile apps. I enjoy learning new technologies and
            creating beautiful user interfaces.
          </Text>
        </ThemeCard>

        <ThemeCard style={styles.card}>
          <Text style={styles.sectionTitle}>My Skills</Text>

          <View style={styles.skillContainer}>
            {["React", "React Native", "Node.js", "MongoDB"].map((skill) => (
              <View key={skill} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </ThemeCard>

        <ThemeCard style={styles.card}>
          <Text style={styles.sectionTitle}>Education</Text>

          <Text style={styles.educationTitle}>Computer Science</Text>

          <Text style={styles.educationDescription}>
            Learning software development, programming, and modern application
            design.
          </Text>
        </ThemeCard>

        <Link href="/" style={styles.linkButton}>
          <Text style={styles.linkText}>Back to Home</Text>
        </Link>
      </ScrollView>
    </ThemeView>
  );
};

export default About;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
  },

  card: {
    padding: 20,
    marginBottom: 20,
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#38bdf8",
    alignSelf: "center",
    marginBottom: 16,
  },

  name: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  role: {
    color: "#38bdf8",
    fontSize: 15,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 18,
  },

  description: {
    color: "#cbd5e1",
    fontSize: 15,
    lineHeight: 25,
    textAlign: "center",
  },

  sectionTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },

  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  skillBadge: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },

  skillText: {
    color: "#7dd3fc",
    fontSize: 14,
    fontWeight: "600",
  },

  educationTitle: {
    color: "#e2e8f0",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  educationDescription: {
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 23,
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
