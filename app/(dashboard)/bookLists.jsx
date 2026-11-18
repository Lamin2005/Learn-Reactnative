import { StyleSheet, View, FlatList, Pressable } from "react-native";

import ThemeView from "../../components/ThemeView";
import ThemeText from "../../components/ThemeText";
import ThemeCard from "../../components/ThemeCard";
import { useBooks } from "../../hooks/useBook";

const BookLists = () => {
  const { books, isLoading } = useBooks();

  return (
    <ThemeView style={styles.container} safe={true}>
      <View style={styles.header}>
        <ThemeText variant="heading" style={styles.title}>
          My Books
        </ThemeText>

        <ThemeText variant="secondary">Manage your favorite books</ThemeText>
      </View>

      {isLoading && <ThemeText>Loading...</ThemeText>}

      {!isLoading && (
        <FlatList
          data={books}
          keyExtractor={(item) => item.$id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
              <ThemeText variant="title">No Books Found</ThemeText>

              <ThemeText variant="secondary">
                Start adding your favorite books.
              </ThemeText>
            </View>
          }
          renderItem={({ item }) => (
            <ThemeCard>
              <Pressable style={styles.bookCard}>
                <View style={styles.bookCover}>
                  <ThemeText style={styles.coverText}>
                    {item.title?.charAt(0)?.toUpperCase() || "D"}
                  </ThemeText>
                </View>

                <View style={styles.bookInfo}>
                  <ThemeText variant="title" style={styles.bookTitle}>
                    {item.title}
                  </ThemeText>

                  <ThemeText variant="secondary">{item.author}</ThemeText>

                  <View style={styles.category}>
                    <ThemeText style={styles.categoryText}>
                      {item.category}
                    </ThemeText>
                  </View>
                </View>
              </Pressable>
            </ThemeCard>
          )}
        />
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
    gap: 15,
  },
  bookCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 15,
    elevation: 2,
  },
  bookCover: {
    width: 65,
    height: 85,
    backgroundColor: "#2563eb",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  coverText: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "800",
  },
  bookInfo: {
    flex: 1,
    gap: 5,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  category: {
    alignSelf: "flex-start",
    backgroundColor: "#dbeafe",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 4,
  },
  categoryText: {
    color: "#2563eb",
    fontSize: 11,
    fontWeight: "600",
  },
});
