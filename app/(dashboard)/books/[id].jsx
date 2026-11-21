import { StyleSheet, View, ScrollView, Pressable } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import ThemeView from "../../../components/ThemeView";
import ThemeText from "../../../components/ThemeText";
import ThemeCard from "../../../components/ThemeCard";
import Loading from "../../../components/Loading";

import { useBooks } from "../../../hooks/useBook";
import { useState } from "react";

const BookDetail = () => {
  const { id } = useLocalSearchParams();
  const { books, isLoading, removeBook } = useBooks();

  const book = books.find((item) => item.$id === id);

  const [bookToDelete, setBookToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!bookToDelete || isDeleting) {
      return;
    }

    try {
      setIsDeleting(true);
      await removeBook(bookToDelete.$id);
      setBookToDelete(null);
    } catch (error) {
      console.log("Delete Book Error:", error);
      setDeleteError("Couldn't delete this book. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <Loading />;
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
            onPress={() =>
              router.push({
                pathname: "/editBook/[id]",
                params: { id: book.$id },
              })
            }
            style={styles.editButton}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={`Edit ${book.title}`}
          >
            <ThemeText style={styles.editText}>Edit book</ThemeText>
          </Pressable>

          <Pressable
            onPress={() => {
              setDeleteError("");
              setBookToDelete(book);
            }}
            style={styles.deleteButton}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={`Delete ${book.title}`}
          >
            <ThemeText style={styles.deleteText}>Delete</ThemeText>
          </Pressable>
        </View>

        {bookToDelete && (
          <View style={styles.dialogOverlay}>
            <View style={styles.dialog}>
              <ThemeText style={styles.dialogTitle}>
                {deleteError ? "Delete failed" : "Delete this book?"}
              </ThemeText>
              <ThemeText style={styles.dialogMessage}>
                {deleteError ||
                  `Are you sure you want to delete "${bookToDelete.title}"? This action can't be undone.`}
              </ThemeText>

              <View style={styles.dialogActions}>
                <Pressable
                  style={styles.cancelButton}
                  onPress={() => setBookToDelete(null)}
                  disabled={isDeleting}
                  accessibilityRole="button"
                >
                  <ThemeText style={styles.cancelText}>Cancel</ThemeText>
                </Pressable>

                <Pressable
                  style={[
                    styles.confirmButton,
                    isDeleting && styles.disabledButton,
                  ]}
                  onPress={confirmDelete}
                  disabled={isDeleting}
                  accessibilityRole="button"
                >
                  <ThemeText style={styles.confirmText}>
                    {isDeleting
                      ? "Deleting..."
                      : deleteError
                        ? "Try again"
                        : "Delete"}
                  </ThemeText>
                </Pressable>
              </View>
            </View>
          </View>
        )}
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
  dialogOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    elevation: 8,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  dialog: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 22,
  },
  dialogTitle: {
    color: "#1e293b",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
  },
  dialogMessage: {
    color: "#475569",
    fontSize: 15,
    lineHeight: 22,
  },
  dialogActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 22,
  },
  cancelButton: {
    minWidth: 90,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 14,
  },
  cancelText: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "700",
  },
  confirmButton: {
    minWidth: 90,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#dc2626",
    paddingHorizontal: 14,
  },
  confirmText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
  disabledButton: {
    opacity: 0.6,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
});
