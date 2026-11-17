import { useContext } from "react";
import { BookContext } from "../context/BookContext";

export const useBooks = () => {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error("useBooks must be used inside BookProvider");
  }

  return context;
};
