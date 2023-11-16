import { parseCookies } from "nookies";
import { ContextAuthApp } from "../context/auth-context";
import { ContextCartApp } from "../context/cart-context";

export const CalculatePrice = () => {
  const { addresses } = ContextAuthApp()
  const { cartProductsTotalPrice } = ContextCartApp()
  const currentAddress = addresses.find((address) => address.standard === true)
  const tax = currentAddress ? parseFloat(currentAddress.neighborhood.tax) : 0;
  const methodDelivery = JSON.parse(parseCookies().delivery)
  const totalPriceProduct = parseFloat(String(cartProductsTotalPrice)); // Converta para número
  const totalPrice = (totalPriceProduct + (methodDelivery === 'DELIVERY' ? tax : 0)).toFixed(2);

  return totalPrice
}