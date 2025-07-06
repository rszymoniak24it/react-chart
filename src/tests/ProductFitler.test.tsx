import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("../context/ProductProvider", () => ({
  useProducts: jest.fn(),
}));

import { useProducts } from "../context/ProductProvider";
import ProductFilter from "../components/ProductFilter";

describe("ProductFilter", () => {
  const productsMock = [
    { id: 1, price: 100 },
    { id: 2, price: 3000 },
    { id: 3, price: 6000 },
  ];

  let setFilteredMock: jest.Mock;
  let onApplyMock: jest.Mock;

  beforeEach(() => {
    setFilteredMock = jest.fn();
    onApplyMock = jest.fn();

    (useProducts as jest.Mock).mockReturnValue({
      products: productsMock,
      setFiltered: setFilteredMock,
    });
  });

  it("Check default values and ability to change them", async () => {
    render(<ProductFilter onApply={onApplyMock} />);

    const inputMin = screen.getByLabelText("Od:");
    const inputMax = screen.getByLabelText("Do:");
    const applyBtn = screen.getByRole("button", { name: /zastosuj/i });

    expect(inputMin).toHaveValue(0);
    expect(inputMax).toHaveValue(5000);

    await userEvent.clear(inputMin);
    await userEvent.type(inputMin, "50");

    await userEvent.clear(inputMax);
    await userEvent.type(inputMax, "4000");

    expect(inputMin).toHaveValue(50);
    expect(inputMax).toHaveValue(4000);

    await userEvent.click(applyBtn);

    expect(setFilteredMock).toHaveBeenCalledWith([
      { id: 1, price: 100 },
      { id: 2, price: 3000 },
    ]);

    expect(onApplyMock).toHaveBeenCalled();
  });
});