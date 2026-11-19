import { StyleSheet, View, useColorScheme,ScrollView } from "react-native";

import ThemeCard from "./ThemeCard";

const BookSkeleton = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const skeletonColor = isDark ? "#334155" : "#e2e8f0";

  return (
    <ThemeCard>
      <View style={styles.bookCard}>
        <View style={[styles.bookCover, { backgroundColor: skeletonColor }]} />

        <View style={styles.bookInfo}>
          <View
            style={[styles.skeletonTitle, { backgroundColor: skeletonColor }]}
          />

          <View
            style={[styles.skeletonAuthor, { backgroundColor: skeletonColor }]}
          />

          <View
            style={[
              styles.skeletonCategory,
              { backgroundColor: skeletonColor },
            ]}
          />
        </View>
      </View>
    </ThemeCard>
  );
};

export const BookSkeletonList = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.list}>
        {[1, 2, 3, 4].map((item) => (
          <BookSkeleton key={item} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  bookInfo: {
    flex: 1,
    gap: 9,
  },

  skeletonTitle: {
    width: "85%",
    height: 16,
    borderRadius: 5,
  },

  skeletonAuthor: {
    width: "55%",
    height: 12,
    borderRadius: 5,
  },

  skeletonCategory: {
    width: 65,
    height: 22,
    borderRadius: 6,
    marginTop: 4,
  },
});
