import { StyleSheet, View, ScrollView, Pressable } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import ThemeView from "../../../components/ThemeView";
import ThemeText from "../../../components/ThemeText";
import ThemeCard from "../../../components/ThemeCard";

import { useBooks } from "../../../hooks/useBook";

const BookDetail = () => {
  const { id } = useLocalSearchParams();
  const { books, isLoading, removeBook } = useBooks();

  const book = books.find((item) => item.$id === id);

  const handleDelete = async () => {
    try {
      await removeBook(id);
      router.back();
    } catch (error) {
      alert("Failed to delete book");
    }
  };

  if (isLoading) {
    return (
      <ThemeView style={styles.container}>
        <ThemeText>Loading book details...</ThemeText>
      </ThemeView>
    );
  }

  if (!book) {
    return (
      <ThemeView style={styles.container}>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <ThemeText style={styles.backText}>Back to Books</ThemeText>
          </Pressable>

          <ThemeText variant="heading" style={styles.heading}>
            Book Details
          </ThemeText>
        </View>

        <View style={styles.coverContainer}>
          <View style={styles.cover}>
            <ThemeText style={styles.coverLetter}>
              {book.title?.charAt(0)?.toUpperCase() || "B"}
            </ThemeText>
          </View>
        </View>

        <View style={styles.bookInfo}>
          <ThemeText variant="heading" style={styles.title}>
            {book.title}
          </ThemeText>

          <ThemeText variant="secondary" style={styles.author}>
            Written by {book.author}
          </ThemeText>

          <View style={styles.category}>
            <ThemeText style={styles.categoryText}>{book.category}</ThemeText>
          </View>
        </View>

        <ThemeCard>
          <View style={styles.descriptionContainer}>
            <ThemeText variant="title" style={styles.sectionTitle}>
              About this book
            </ThemeText>

            <ThemeText variant="secondary" style={styles.description}>
              {book.description || "No description available."}
            </ThemeText>
          </View>
        </ThemeCard>

        <View style={styles.actions}>
          <Pressable
            style={styles.editButton}
            onPress={() =>
              router.push({
                pathname: "/(dashboard)/editBook/[id]",
                params: { id: book.$id },
              })
            }
          >
            <ThemeText style={styles.buttonText}>Edit Book</ThemeText>
          </Pressable>

          <Pressable style={styles.deleteButton} onPress={handleDelete}>
            <ThemeText style={styles.buttonText}>Delete Book</ThemeText>
          </Pressable>
        </View>
      </ScrollView>
    </ThemeView>
  );
};

export default BookDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 15,
    marginBottom: 25,
    gap: 15,
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

  coverContainer: {
    alignItems: "center",
    marginVertical: 20,
  },

  cover: {
    width: 180,
    height: 240,
    backgroundColor: "#2563eb",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  coverLetter: {
    color: "#ffffff",
    fontSize: 80,
    fontWeight: "800",
  },

  bookInfo: {
    alignItems: "center",
    marginBottom: 25,
    gap: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },

  author: {
    fontSize: 16,
  },

  category: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },

  categoryText: {
    color: "#2563eb",
    fontWeight: "600",
  },

  descriptionContainer: {
    padding: 15,
    gap: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  description: {
    fontSize: 15,
    lineHeight: 25,
  },

  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 25,
    marginBottom: 30,
  },

  editButton: {
    flex: 1,
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#dc2626",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
});
