import { parseCookies } from "nookies";
import { ContextApp } from "../context/context-app";

export const CalculatePrice = () => {
  const { cartProductsTotalPrice, addresses } = ContextApp();
  const currentAddress = addresses.find((address) => address.standard === true)
  const tax = currentAddress ? parseFloat(currentAddress.neighborhood.tax) : 0; 
  const methodDelivery = JSON.parse(parseCookies().delivery)
  const totalPriceProduct = parseFloat(String(cartProductsTotalPrice)); // Converta para número
  const totalPrice = (totalPriceProduct + (methodDelivery.deliveryMethod === 'DELIVERY' ? tax : 0)).toFixed(2);
  return totalPrice
}