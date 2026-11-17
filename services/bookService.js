import { tablesDB } from "../lib/appwrite";
import { ID, Query } from "react-native-appwrite";

const DATABASE_ID = "6afa776b0010c470ee74";
const TABLE_ID = "6afa78d3001c10a94e82";

export const getBooks = async () => {
  try {
    const response = await tablesDB.listDocuments({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
    });
    return response.documents;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const addBook = async (bookData) => {
  try {
    const response = await tablesDB.createRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: ID.unique(),
      data: bookData,
    });
    return response;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};
