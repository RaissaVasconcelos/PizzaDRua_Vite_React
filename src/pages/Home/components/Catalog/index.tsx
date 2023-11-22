
import { CardCatalogPizza } from "./CardCatalog/pizza"
import { CardCatalogDrink } from "./CardCatalog/drink"
import { ContextCartApp } from "../../../../context/cart-context";
import { useState } from "react";

export const Catalog = () => {
  const { products, onChangeCatalog } = ContextCartApp()
  const [onChangeType, setOnChangeType] = useState('TRADITIONAL')

  return (
    <div className=" mt-10 mb-24  w-full">
      {onChangeCatalog === 'PIZZA'
        ? (
          <>
            <div className="w-full flex flex-col items-center justify-center gap-5 mb-10">
              <div className="w-11/12 flex items-center justify-between font-bold text-gray-500 text-xl mb-3">
                <h2 onClick={() => setOnChangeType('TRADITIONAL')} className={`text-start ${onChangeType === 'TRADITIONAL' ? "text-gray-100 bg-orange-500 p-2 rounded-md" : "text-gray-500"}`}>Tradicional</h2>
                <h2 onClick={() => setOnChangeType('SPECIAL')} className={`text-start ${onChangeType === 'SPECIAL' ? "text-gray-100 bg-orange-500 p-2 rounded-md" : "text-gray-500"}`}>Especial</h2>
              </div>
              {onChangeType === 'TRADITIONAL' ? (
                products.filter(product => 
                  product.category.name === 'pizza' 
                  && product.status === 'ACTIVE' 
                  && product.type === 'TRADITIONAL')
                  .map((product) => (
                  <CardCatalogPizza
                    key={product.id}
                    id={product.id}
                    product={product.product}
                    price={product.price}
                    image_url={product.image_url}
                    description={product.description}
                    category={product.category}
                    size={product.size}
                    status={product.status}
                    type={product.type}  
                  />
                ))

              ) : (
                  products.filter((product) => 
                    product.status === 'ACTIVE'
                    && product.category.name === 'pizza'
                    && product.type === 'SPECIAL')
                    .map((product) => (
                  <CardCatalogPizza
                    key={product.id}
                    id={product.id}
                    product={product.product}
                    price={product.price}
                    image_url={product.image_url}
                    description={product.description}
                    category={product.category}
                    size={product.size}
                    status={product.status}
                      type={product.type}
                  />
                ))

              )}
            </div>

          </>
        )
        : (

          <div className="mb-10 w-full flex flex-col items-center justify-center gap-5">
            <h2 className="text-start w-11/12 font-bold text-gray-500 text-xl my-3">Bebidas</h2>
            {products.filter((drink) => drink.category.name === 'drink' && drink.status === 'ACTIVE').map((drink) => (
              <CardCatalogDrink
                key={drink.id}
                id={drink.id}
                product={drink.product}
                price={drink.price}
                image_url={drink.image_url}
                description={drink.description}
                category={drink.category}
                size={drink.size}
                status={drink.status}
                type={drink.type}
              />
            ))}
          </div>
        )}
    </div>

  )
}