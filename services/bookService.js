import { tablesDB, account, ID, Permission, Role } from "../lib/appwrite";

import { Query } from "react-native-appwrite";

const DATABASE_ID = "6afa776b0010c470ee74";
const TABLE_ID = "6afa78d3001c10a94e82";

// Get Books
export const getBooks = async () => {
  try {
    const user = await account.get();
    const response = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [
        Query.equal("user_id", user.$id),
        Query.orderDesc("$createdAt"),
      ],
    });

    return response.rows;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

// Create Book
export const createBook = async (bookData) => {
  try {
    const user = await account.get();

    const response = await tablesDB.createRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: ID.unique(),

      data: {
        ...bookData,
        user_id: user.$id,
      },

      permissions: [
        Permission.read(Role.user(user.$id)),
        Permission.update(Role.user(user.$id)),
        Permission.delete(Role.user(user.$id)),
      ],
    });

    return response;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};
