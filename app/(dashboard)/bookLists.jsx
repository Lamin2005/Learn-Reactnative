
import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
} from "react-native";

import ThemeView from "../../components/ThemeView";
import ThemeText from "../../components/ThemeText";

const books = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Development",
  },
  {
    id: "2",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Technology",
  },
  {
    id: "3",
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
  },
  {
    id: "4",
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "Business",
  },
];

const BookLists = () => {
  return (
    <ThemeView style={styles.container} safe={true}>
      <View style={styles.header}>
        <ThemeText variant="heading" style={styles.title}>
          My Books
        </ThemeText>

        <ThemeText variant="secondary">
          Manage your favorite books
        </ThemeText>
      </View>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable style={styles.bookCard}>
            <View style={styles.bookCover}>
              <ThemeText style={styles.coverText}>
                {item.title.charAt(0)}
              </ThemeText>
            </View>

            <View style={styles.bookInfo}>
              <ThemeText variant="title" style={styles.bookTitle}>
                {item.title}
              </ThemeText>

              <ThemeText variant="secondary">
                {item.author}
              </ThemeText>

              <View style={styles.category}>
                <ThemeText style={styles.categoryText}>
                  {item.category}
                </ThemeText>
              </View>
            </View>
          </Pressable>
        )}
      />
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
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 14,
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
