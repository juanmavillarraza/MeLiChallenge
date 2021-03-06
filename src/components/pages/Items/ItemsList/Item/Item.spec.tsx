import { render, screen, fireEvent } from "@testing-library/react";

import Item from "./Item";
import { IItem } from "~/stores/mainStore";

describe("<Item />", () => {
  const navigateToItem = jest.fn();

  it("should render Item as expected", () => {
    const mockedItem = {
      id: "item-id",
      title: "lenovo",
      price: {
        currency: "ARS",
        amount: 1000,
        decimals: 2,
      },
      picture: "http://http2.mlstatic.com/D_961352-MLA42764591253_072020-O.jpg",
      condition: "new",
      free_shipping: true,
    } as IItem;

    render(<Item item={mockedItem} navigateToItem={navigateToItem} />);

    expect(screen.getByAltText("item-img")).not.toBeNull();
    expect(screen.getByText("$ 1,000")).not.toBeNull();
    expect(screen.getByTestId("free-shipping")).not.toBeNull();
    expect(screen.queryAllByText("Nuevo")).not.toBeNull();
    expect(screen.queryAllByText("lenovo")).not.toBeNull();
  });

  it("should render Item with U$D", () => {
    const mockedItem = {
      id: "item-id",
      title: "lenovo",
      price: {
        currency: "USD",
        amount: 1000,
        decimals: 2,
      },
      picture: "http://http2.mlstatic.com/D_961352-MLA42764591253_072020-O.jpg",
      condition: "new",
      free_shipping: true,
    } as IItem;

    render(<Item item={mockedItem} navigateToItem={navigateToItem} />);

    expect(screen.getByAltText("item-img")).not.toBeNull();
    expect(screen.getByText("U$D 1,000")).not.toBeNull();
    expect(screen.getByTestId("free-shipping")).not.toBeNull();
    expect(screen.queryAllByText("Nuevo")).not.toBeNull();
    expect(screen.queryAllByText("lenovo")).not.toBeNull();
  });

  it("should render Item without free shipping icon", () => {
    const mockedItem = {
      id: "item-id",
      title: "lenovo",
      price: {
        currency: "USD",
        amount: 1000,
        decimals: 2,
      },
      picture: "http://http2.mlstatic.com/D_961352-MLA42764591253_072020-O.jpg",
      condition: "new",
      free_shipping: false,
    } as IItem;

    render(<Item item={mockedItem} navigateToItem={navigateToItem} />);

    expect(screen.getByAltText("item-img")).not.toBeNull();
    expect(screen.getByText("U$D 1,000")).not.toBeNull();
    expect(screen.queryByTestId("free-shipping")).toBeNull();
    expect(screen.queryAllByText("Nuevo")).not.toBeNull();
    expect(screen.queryAllByText("lenovo")).not.toBeNull();
  });

  it("should call router push on li click", () => {
    const mockedItem = {
      id: "item-id",
      title: "lenovo",
      price: {
        currency: "ARS",
        amount: 1000,
        decimals: 2,
      },
      picture: "http://http2.mlstatic.com/D_961352-MLA42764591253_072020-O.jpg",
      condition: "new",
      free_shipping: true,
    } as IItem;

    const { container } = render(
      <Item item={mockedItem} navigateToItem={navigateToItem} />
    );
    const li = container.querySelector("li");

    fireEvent.click(li);

    expect(navigateToItem).toHaveBeenCalledWith("/items/item-id");
  });
});
