import { parseCookies } from "nookies";
import { AddressProps } from "../context/auth-context";
import { ContextCartApp } from "../context/cart-context";
import ServiceAddress from '../infrastructure/services/address'


export const CalculatePrice = async () => {
  const serviceAddress = new ServiceAddress()
  const { cartProductsTotalPrice } = ContextCartApp()
  const response = await serviceAddress.showAddress()
  const addresses = response.body
  const standardAddress = addresses.find((element: AddressProps) => element.standard === true && element.neighborhood.status === "ACTIVE");
  const tax = standardAddress ? parseFloat(standardAddress.neighborhood.tax) : 0;
  const methodDelivery = JSON.parse(parseCookies().delivery)
  const totalPriceProduct = parseFloat(String(cartProductsTotalPrice)); // Converta para número
  const totalPrice = (totalPriceProduct + (methodDelivery === 'DELIVERY' ? tax : 0)).toFixed(2);

  return totalPrice
}