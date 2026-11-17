import { tablesDB, account, ID, Permission, Role } from "../lib/appwrite";

const DATABASE_ID = "6afa776b0010c470ee74";
const TABLE_ID = "6afa78d3001c10a94e82";

// Get Books
export const getBooks = async () => {
  try {
    const response = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
    });

    return response.rows;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

// Add Book
export const addBook = async (bookData) => {
  try {
    const user = await account.get();

    const response = await tablesDB.createRow({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      rowId: ID.unique(),

      data: {
        ...bookData,
        userId: user.$id,
      },

      permissions: [
        Permission.read(Role.user(user.$id)),
        Permission.update(Role.user(user.$id)),
        Permission.delete(Role.user(user.$id)),
      ],
    });

    console.log("tablesDB:", typeof tablesDB.createRow);
    console.log("ID:", typeof ID.unique);
    console.log("Permission:", typeof Permission.read);
    console.log("Role:", typeof Role.user);
    console.log("account:", typeof account.get);

    return response.rows;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};
