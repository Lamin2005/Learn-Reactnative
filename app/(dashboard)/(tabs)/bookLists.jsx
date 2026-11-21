import { useState } from "react";
import { StyleSheet, View, FlatList, Pressable } from "react-native";

import ThemeView from "../../../components/ThemeView";
import ThemeText from "../../../components/ThemeText";
import ThemeCard from "../../../components/ThemeCard";
import { useBooks } from "../../../hooks/useBook";
import { BookSkeletonList } from "../../../components/BookSkeleton";
import { useRouter } from "expo-router";

const BookLists = () => {
  const { books, isLoading, removeBook } = useBooks();
  const router = useRouter();
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

  return (
    <ThemeView style={styles.container} safe={true}>
      <View style={styles.header}>
        <ThemeText variant="heading" style={styles.title}>
          My Books
        </ThemeText>

        <ThemeText
          variant="secondary"
          style={{ fontSize: 20, fontWeight: "lighter" }}
        >
          Manage your favorite books
        </ThemeText>
      </View>

      {isLoading ? (
        <BookSkeletonList />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.$id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.list,
            books.length === 0 && styles.emptyList,
          ]}
          ListEmptyComponent={
            <View style={styles.empty}>
              <ThemeText
                variant="title"
                style={{ fontSize: 18, fontWeight: "lighter" }}
              >
                No Books Found
              </ThemeText>

              <ThemeText
                variant="secondary"
                style={{ fontSize: 16, fontWeight: "lighter" }}
              >
                Start adding your favorite books.
              </ThemeText>
            </View>
          }
          renderItem={({ item }) => (
            <ThemeCard style={styles.card}>
              <View>
                <Pressable
                  style={styles.bookContent}
                  onPress={() => router.push(`/books/${item.$id}`)}
                  accessibilityRole="button"
                  accessibilityLabel={`View ${item.title}`}
                >
                  <View style={styles.bookCover}>
                    <ThemeText style={styles.coverText}>
                      {item.title?.charAt(0)?.toUpperCase() || "B"}
                    </ThemeText>
                  </View>

                  <View style={styles.bookInfo}>
                    <ThemeText
                      variant="title"
                      style={styles.bookTitle}
                      numberOfLines={2}
                    >
                      {item.title}
                    </ThemeText>

                    <ThemeText
                      variant="secondary"
                      style={styles.author}
                      numberOfLines={1}
                    >
                      {item.author}
                    </ThemeText>

                    <View style={styles.category}>
                      <ThemeText style={styles.categoryText}>
                        {item.category}
                      </ThemeText>
                    </View>
                  </View>
                </Pressable>

                <View style={styles.actions}>
                  <Pressable
                    onPress={() =>
                      router.push({
                        pathname: "/editBook/[id]",
                        params: { id: item.$id },
                      })
                    }
                    style={styles.editButton}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel={`Edit ${item.title}`}
                  >
                    <ThemeText style={styles.editText}>Edit book</ThemeText>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      setDeleteError("");
                      setBookToDelete(item);
                    }}
                    style={styles.deleteButton}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel={`Delete ${item.title}`}
                  >
                    <ThemeText style={styles.deleteText}>Delete</ThemeText>
                  </Pressable>
                </View>
              </View>
            </ThemeCard>
          )}
        />
      )}

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
    </ThemeView>
  );
};

export default BookLists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 5,
  },
  list: {
    paddingBottom: 25,
    gap: 14,
  },
  card: {
    padding: 14,
    borderRadius: 18,
  },
  bookCover: {
    width: 72,
    height: 96,
    backgroundColor: "#2563eb",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#1d4ed8",
  },
  coverText: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "800",
  },
  bookContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  bookInfo: {
    flex: 1,
    minWidth: 0,
    alignItems: "flex-start",
    gap: 7,
  },
  bookTitle: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "800",
  },
  author: {
    fontSize: 14,
  },
  category: {
    alignSelf: "flex-start",
    backgroundColor: "#dbeafe",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 2,
  },
  categoryText: {
    color: "#2563eb",
    fontSize: 12,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    marginTop: 14,
    paddingTop: 12,
  },
  editButton: {
    flex: 1,
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eff6ff",
    borderRadius: 10,
  },
  editText: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "700",
  },
  deleteButton: {
    flex: 1,
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fef2f2",
    borderRadius: 10,
  },
  deleteText: {
    color: "#dc2626",
    fontSize: 14,
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
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
