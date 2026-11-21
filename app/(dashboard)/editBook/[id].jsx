import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import Loading from "../../../components/Loading";
import ThemeText from "../../../components/ThemeText";
import ThemeView from "../../../components/ThemeView";
import { useBooks } from "../../../hooks/useBook";

const EditBook = () => {
  const { id } = useLocalSearchParams();
  const { books, isLoading, editBook } = useBooks();
  const bookId = Array.isArray(id) ? id[0] : id;
  const book = books.find((item) => item.$id === bookId);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (book) {
      setTitle(book.title ?? "");
      setAuthor(book.author ?? "");
      setCategory(book.category ?? "");
      setDescription(book.description ?? "");
    }
  }, [book]);

  const handleSubmit = async () => {
    if (
      !title.trim() ||
      !author.trim() ||
      !category.trim() ||
      !description.trim()
    ) {
      Alert.alert("Required fields", "Please fill in every book field.");
      return;
    }

    try {
      setIsSaving(true);
      await editBook(bookId, {
        title: title.trim(),
        author: author.trim(),
        category: category.trim(),
        description: description.trim(),
      });

      Alert.alert("Success", "Book updated successfully.");
      router.replace(`/books/${bookId}`);
    } catch (error) {
      console.log("Edit Book Error:", error);
      Alert.alert("Error", "Failed to update the book.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!book) {
    return (
      <ThemeView style={styles.container} safe>
        <View style={styles.empty}>
          <ThemeText variant="title">Book Not Found</ThemeText>
          <Pressable onPress={() => router.back()}>
            <ThemeText style={styles.backText}>Go Back</ThemeText>
          </Pressable>
        </View>
      </ThemeView>
    );
  }

  return (
    <ThemeView style={styles.container} safe>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <ThemeText style={styles.backText}>Back</ThemeText>
          </Pressable>

          <ThemeText variant="heading" style={styles.heading}>
            Edit Book
          </ThemeText>
          <ThemeText variant="secondary" style={styles.subtitle}>
            Update your book information.
          </ThemeText>
        </View>

        <View style={styles.form}>
          <ThemeText style={styles.label}>Book Title</ThemeText>
          <TextInput
            style={styles.input}
            placeholder="Enter book title"
            value={title}
            onChangeText={setTitle}
            editable={!isSaving}
          />

          <ThemeText style={styles.label}>Author Name</ThemeText>
          <TextInput
            style={styles.input}
            placeholder="Enter author name"
            value={author}
            onChangeText={setAuthor}
            editable={!isSaving}
          />

          <ThemeText style={styles.label}>Category</ThemeText>
          <TextInput
            style={styles.input}
            placeholder="Enter category"
            value={category}
            onChangeText={setCategory}
            editable={!isSaving}
          />

          <ThemeText style={styles.label}>Description</ThemeText>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write book description..."
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
            editable={!isSaving}
          />

          <Pressable
            style={[styles.button, isSaving && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isSaving}
          >
            <ThemeText style={styles.buttonText}>
              {isSaving ? "Saving Changes..." : "Save Changes"}
            </ThemeText>
          </Pressable>
        </View>
      </ScrollView>
    </ThemeView>
  );
};

export default EditBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 15,
    marginBottom: 25,
    gap: 8,
  },
  backText: {
    color: "#2563eb",
    fontSize: 15,
    fontWeight: "600",
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
  },
  subtitle: {
    fontSize: 16,
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
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
});
