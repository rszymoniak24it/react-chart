import axios from "axios";
import type { Product } from "../types/Product";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await axios.get("https://dummyjson.com/products?limit=20");
    return res.data.products;
  } catch (error) {
    console.error("Błąd pobierania produktów:", error);
    throw new Error("Nie udało się pobrać produktów");
  }
};