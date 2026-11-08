import { StyleSheet, View, Pressable, ScrollView } from "react-native";

import { Link } from "expo-router";
import { useState } from "react";

import ThemeView from "../components/ThemeView";
import ThemeCard from "../components/ThemeCard";
import ThemeText from "../components/ThemeText";
import ThemeInput from "../components/ThemeInput";

const categories = [
  "All",
  "Fiction",
  "Technology",
  "Science",
  "History",
  "Business",
];

const books = [
  {
    id: "1",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Fiction",
    color: "#334155",
    progress: 75,
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Business",
    color: "#92400e",
    progress: 45,
  },
  {
    id: "3",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Technology",
    color: "#1e3a8a",
    progress: 20,
  },
  {
    id: "4",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    color: "#065f46",
    progress: 60,
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <ThemeView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <ThemeText variant="secondary" style={styles.greeting}>
              Welcome back,
            </ThemeText>

            <ThemeText variant="heading" style={styles.username}>
              La Min Hein
            </ThemeText>
          </View>

          <View style={styles.authButtons}>
            <Link href="/login" asChild>
              <Pressable style={styles.loginButton}>
                <ThemeText style={styles.loginText}>Login</ThemeText>
              </Pressable>
            </Link>
          </View>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <ThemeText style={styles.heroLabel}>
            YOUR NEXT CHAPTER STARTS HERE
          </ThemeText>

          <ThemeText style={styles.heroTitle}>
            Discover a world of stories.
          </ThemeText>

          <ThemeText style={styles.heroDescription}>
            Explore thousands of books and find your next favorite read.
          </ThemeText>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <ThemeInput
            placeholder="Search books or authors..."
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <ThemeText variant="title" style={styles.sectionTitle}>
            Explore Categories
          </ThemeText>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          >
            {categories.map((category) => {
              const active = selectedCategory === category;

              return (
                <Pressable
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  style={[
                    styles.categoryButton,
                    active && styles.activeCategory,
                  ]}
                >
                  <ThemeText
                    style={[
                      styles.categoryText,
                      active && styles.activeCategoryText,
                    ]}
                  >
                    {category}
                  </ThemeText>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Featured Book */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemeText variant="title" style={styles.sectionTitle}>
              Featured Book
            </ThemeText>

            <ThemeText variant="secondary" style={styles.smallLabel}>
              EDITOR'S PICK
            </ThemeText>
          </View>

          <ThemeCard style={styles.featuredCard}>
            <View style={styles.featuredContent}>
              <View style={styles.featuredCover}>
                <ThemeText style={styles.featuredCoverSmall}>THE</ThemeText>

                <ThemeText style={styles.featuredCoverTitle}>
                  GREAT
                  {"\n"}GATSBY
                </ThemeText>

                <View style={styles.coverLine} />

                <ThemeText style={styles.featuredCoverAuthor}>
                  F. SCOTT FITZGERALD
                </ThemeText>
              </View>

              <View style={styles.featuredInfo}>
                <ThemeText style={styles.featuredBadge}>FEATURED</ThemeText>

                <ThemeText variant="title" style={styles.featuredTitle}>
                  The Great Gatsby
                </ThemeText>

                <ThemeText variant="secondary" style={styles.author}>
                  F. Scott Fitzgerald
                </ThemeText>

                <ThemeText
                  variant="secondary"
                  style={styles.featuredDescription}
                >
                  A timeless story of love, ambition and the American dream.
                </ThemeText>

                <Pressable style={styles.readButton}>
                  <ThemeText style={styles.readButtonText}>
                    Explore Book
                  </ThemeText>
                </Pressable>
              </View>
            </View>
          </ThemeCard>
        </View>

        {/* Continue Reading */}
        <View style={styles.section}>
          <ThemeText variant="title" style={styles.sectionTitle}>
            Continue Reading
          </ThemeText>

          <ThemeCard style={styles.continueCard}>
            <View style={styles.continueContent}>
              <View style={[styles.smallCover, { backgroundColor: "#92400e" }]}>
                <ThemeText style={styles.smallCoverTitle}>
                  ATOMIC
                  {"\n"}HABITS
                </ThemeText>
              </View>

              <View style={styles.continueInfo}>
                <ThemeText variant="title" style={styles.bookTitle}>
                  Atomic Habits
                </ThemeText>

                <ThemeText variant="secondary" style={styles.author}>
                  James Clear
                </ThemeText>

                <View style={styles.progressHeader}>
                  <ThemeText variant="secondary" style={styles.progressText}>
                    Reading progress
                  </ThemeText>

                  <ThemeText style={styles.progressValue}>45%</ThemeText>
                </View>

                <View style={styles.progressTrack}>
                  <View style={[styles.progressBar, { width: "45%" }]} />
                </View>
              </View>
            </View>
          </ThemeCard>
        </View>

        {/* Popular Books */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemeText variant="title" style={styles.sectionTitle}>
              Popular Books
            </ThemeText>

            <ThemeText variant="secondary" style={styles.smallLabel}>
              {filteredBooks.length} BOOKS
            </ThemeText>
          </View>

          {filteredBooks.length === 0 ? (
            <ThemeText variant="secondary" style={styles.emptyText}>
              No books found. Try another search.
            </ThemeText>
          ) : (
            <View style={styles.bookGrid}>
              {filteredBooks.map((book) => (
                <Pressable key={book.id} style={styles.bookItem}>
                  <View
                    style={[styles.bookCover, { backgroundColor: book.color }]}
                  >
                    <ThemeText style={styles.bookCoverTitle}>
                      {book.title}
                    </ThemeText>

                    <View style={styles.coverLine} />

                    <ThemeText style={styles.bookCoverAuthor}>
                      {book.author}
                    </ThemeText>
                  </View>

                  <ThemeText
                    variant="title"
                    style={styles.bookItemTitle}
                    numberOfLines={1}
                  >
                    {book.title}
                  </ThemeText>

                  <ThemeText
                    variant="secondary"
                    style={styles.bookItemAuthor}
                    numberOfLines={1}
                  >
                    {book.author}
                  </ThemeText>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemeText variant="secondary" style={styles.footerText}>
            Made for people who love reading.
          </ThemeText>
        </View>
      </ScrollView>
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 55,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  greeting: {
    fontSize: 13,
  },

  username: {
    fontSize: 23,
    fontWeight: "800",
    marginTop: 4,
  },

  authButtons: {
    flexDirection: "row",
  },

  loginButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },

  loginText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13,
  },

  hero: {
    backgroundColor: "#172554",
    padding: 25,
    borderRadius: 22,
    marginBottom: 25,
  },

  heroLabel: {
    color: "#93c5fd",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  heroTitle: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 36,
    marginTop: 14,
    maxWidth: 270,
  },

  heroDescription: {
    color: "#cbd5e1",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 12,
    maxWidth: 280,
  },

  searchContainer: {
    marginBottom: 30,
  },

  section: {
    marginBottom: 30,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
  },

  smallLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },

  categoryList: {
    gap: 10,
    paddingVertical: 15,
  },

  categoryButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#e2e8f0",
  },

  activeCategory: {
    backgroundColor: "#2563eb",
  },

  categoryText: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "600",
  },

  activeCategoryText: {
    color: "#ffffff",
  },

  featuredCard: {
    padding: 15,
    borderRadius: 18,
  },

  featuredContent: {
    flexDirection: "row",
    gap: 16,
  },

  featuredCover: {
    width: 115,
    minHeight: 180,
    backgroundColor: "#78350f",
    borderRadius: 8,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  featuredCoverSmall: {
    color: "#fde68a",
    fontSize: 10,
    letterSpacing: 3,
  },

  featuredCoverTitle: {
    color: "#ffffff",
    fontSize: 21,
    fontWeight: "900",
    textAlign: "center",
    marginVertical: 12,
  },

  coverLine: {
    height: 1,
    width: "65%",
    backgroundColor: "#d6b77a",
    marginVertical: 8,
  },

  featuredCoverAuthor: {
    color: "#fde68a",
    fontSize: 7,
    textAlign: "center",
  },

  featuredInfo: {
    flex: 1,
    justifyContent: "center",
  },

  featuredBadge: {
    color: "#2563eb",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 9,
  },

  featuredTitle: {
    fontSize: 17,
    fontWeight: "800",
  },

  author: {
    fontSize: 12,
    marginTop: 5,
  },

  featuredDescription: {
    fontSize: 12,
    lineHeight: 19,
    marginTop: 12,
  },

  readButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginTop: 15,
  },

  readButtonText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
  },

  continueCard: {
    padding: 15,
    borderRadius: 16,
  },

  continueContent: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },

  smallCover: {
    width: 75,
    height: 100,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },

  smallCoverTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
  },

  continueInfo: {
    flex: 1,
  },

  bookTitle: {
    fontSize: 15,
    fontWeight: "700",
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 7,
  },

  progressText: {
    fontSize: 11,
  },

  progressValue: {
    color: "#2563eb",
    fontSize: 11,
    fontWeight: "700",
  },

  progressTrack: {
    height: 6,
    borderRadius: 10,
    backgroundColor: "#cbd5e1",
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#2563eb",
  },

  bookGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 22,
  },

  bookItem: {
    width: "47%",
  },

  bookCover: {
    width: "100%",
    height: 190,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    elevation: 3,
  },

  bookCoverTitle: {
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "900",
    textAlign: "center",
  },

  bookCoverAuthor: {
    color: "#e2e8f0",
    fontSize: 9,
    textAlign: "center",
  },

  bookItemTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 10,
  },

  bookItemAuthor: {
    fontSize: 12,
    marginTop: 4,
  },

  emptyText: {
    textAlign: "center",
    paddingVertical: 30,
  },

  footer: {
    alignItems: "center",
    marginTop: 10,
  },

  footerText: {
    fontSize: 12,
  },
});
