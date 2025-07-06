import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("../context/ProductProvider", () => ({
  useProducts: jest.fn(),
}));

import { useProducts } from "../context/ProductProvider";
import ProductTable from "../components/ProductTable";

describe("ProductTable", () => {
  const productsMock = [
    { id: 1, title: "Banana", price: 100, stock: 5 },
    { id: 2, title: "Apple", price: 300, stock: 3 },
    { id: 3, title: "Orange", price: 200, stock: 7 },
    { id: 4, title: "Mango", price: 400, stock: 2 },
  ];

  let setSearchMock: jest.Mock;

  beforeEach(() => {
    setSearchMock = jest.fn();

    (useProducts as jest.Mock).mockReturnValue({
      filtered: productsMock,
      loading: false,
      error: null,
      search: "",
      setSearch: setSearchMock,
    });
  });

  it("shows loading message", () => {
    (useProducts as jest.Mock).mockReturnValueOnce({
      filtered: [],
      loading: true,
      error: null,
      search: "",
      setSearch: jest.fn(),
    });
    render(<ProductTable />);
    expect(screen.getByText(/ładowanie/i)).toBeInTheDocument();
  });

  it("shows error message", () => {
    (useProducts as jest.Mock).mockReturnValueOnce({
      filtered: [],
      loading: false,
      error: "Błąd!",
      search: "",
      setSearch: jest.fn(),
    });
    render(<ProductTable />);
    expect(screen.getByText("Błąd!")).toBeInTheDocument();
  });

  it("renders list of products, checks search functionality", async () => {
    render(<ProductTable />);

    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/wyszukaj/i);
    await userEvent.type(input, "apple");

    const updateBtn = screen.getByRole("button", { name: /aktualizuj wykres/i });
    await userEvent.click(updateBtn);

    expect(setSearchMock).toHaveBeenCalledWith("apple");
  });

  it("checks sorting functionality", async () => {
    render(<ProductTable />);

    const stockHeader = screen.getByText(/stan magazynowy/i);
    await userEvent.click(stockHeader);

    const firstRowFirstCell = screen.getAllByRole("row")[1].querySelector("td");
    expect(firstRowFirstCell).toHaveTextContent("Mango");
  });

  it("check pagination functionality", async () => {
    const manyProducts = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Product${i + 1}`,
      price: i * 10,
      stock: i,
    }));
    (useProducts as jest.Mock).mockReturnValue({
      filtered: manyProducts,
      loading: false,
      error: null,
      search: "",
      setSearch: jest.fn(),
    });

    render(<ProductTable />);

    expect(screen.getByText("Product1")).toBeInTheDocument();
    expect(screen.getByText("Product10")).toBeInTheDocument();
    expect(screen.queryByText("Product11")).not.toBeInTheDocument();

    const nextBtn = screen.getByRole("button", { name: /następna/i });
    await userEvent.click(nextBtn);

    expect(screen.getByText("Product11")).toBeInTheDocument();
    expect(screen.queryByText("Product1")).not.toBeInTheDocument();

    const prevBtn = screen.getByRole("button", { name: /poprzednia/i });
    await userEvent.click(prevBtn);

    expect(screen.getByText("Product1")).toBeInTheDocument();
  });
});
