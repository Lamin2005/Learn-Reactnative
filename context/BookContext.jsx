import { createContext, useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";

import {
  getBooks,
  createBook,
  //   updateBook,
  //   deleteBook,
} from "../services/bookService";

export const BookContext = createContext(null);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUser();

  // Get Books
  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getBooks();

      setBooks(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Add Book
  const addBook = async (bookData) => {
    try {
      setIsLoading(true);
      const newBook = await createBook(bookData);

      setBooks((prev) => [newBook, ...prev]);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Edit Book
  //   const editBook = async (bookId, bookData) => {
  //     try {
  //       const updatedBook = await updateBook(bookId, bookData);

  //       setBooks((prev) =>
  //         prev.map((book) =>
  //           book.$id === bookId ? updatedBook : book
  //         )
  //       );

  //       return updatedBook;
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   };

  // Remove Book
  //   const removeBook = async (bookId) => {
  //     try {
  //       await deleteBook(bookId);

  //       setBooks((prev) =>
  //         prev.filter((book) => book.$id !== bookId)
  //       );
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   };

  useEffect(() => {
    if (user) {
      fetchBooks();
    } else {
      setBooks([]);
    }
  }, [user]);

  return (
    <BookContext.Provider
      value={{
        books,
        isLoading,
        error,
        fetchBooks,
        addBook,
        // editBook,
        // removeBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
