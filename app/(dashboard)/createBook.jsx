import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";

import ThemeView from "../../components/ThemeView";
import ThemeText from "../../components/ThemeText";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    console.log({
      title,
      author,
      category,
      description,
    });
  };

  return (
    <ThemeView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemeText variant="heading" style={styles.title}>
            Create Book
          </ThemeText>

          <ThemeText variant="secondary">
            Add a new book to your collection.
          </ThemeText>
        </View>

        <View style={styles.form}>
          <ThemeText style={styles.label}>Book Title</ThemeText>
          <TextInput
            style={styles.input}
            placeholder="Enter book title"
            value={title}
            onChangeText={setTitle}
          />

          <ThemeText style={styles.label}>Author Name</ThemeText>
          <TextInput
            style={styles.input}
            placeholder="Enter author name"
            value={author}
            onChangeText={setAuthor}
          />

          <ThemeText style={styles.label}>Category</ThemeText>
          <TextInput
            style={styles.input}
            placeholder="Enter category"
            value={category}
            onChangeText={setCategory}
          />

          <ThemeText style={styles.label}>Description</ThemeText>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write book description..."
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />

          <Pressable style={styles.button} onPress={handleSubmit}>
            <ThemeText style={styles.buttonText}>Add Book</ThemeText>
          </Pressable>
        </View>
      </ScrollView>
    </ThemeView>
  );
};

export default CreateBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 5,
  },
  form: {
    gap: 12,
    paddingBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
  },
  input: {
    height: 50,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 14,
    color: "#1e293b",
  },
  textArea: {
    height: 120,
    paddingTop: 15,
  },
  button: {
    height: 52,
    backgroundColor: "#2563eb",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});
