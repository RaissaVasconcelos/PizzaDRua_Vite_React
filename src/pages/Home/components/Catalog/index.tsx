
import { CardCatalogPizza } from "./CardCatalog/pizza"
import { CardCatalogDrink } from "./CardCatalog/drink"
import { ContextApp } from "../../../../context/context-app";
import { useState } from "react";

export const Catalog = () => {
  const { flavors, onChangeCatalog } = ContextApp()
  const [onChangeType, setOnChangeType] = useState('TRADITIONAL')

  return (
    <div className=" mt-10  w-full">
      {onChangeCatalog === 'PIZZA'
        ? (
          <>
            <div className="w-full flex flex-col items-center justify-center gap-5 mb-10">
              <div className="w-11/12 flex items-center justify-between font-bold text-gray-500 text-xl mb-3">
                <h2 onClick={() => setOnChangeType('TRADITIONAL')} className={`text-start ${onChangeType === 'TRADITIONAL' ? "text-gray-100 bg-orange-500 p-2 rounded-md" : "text-gray-500"}`}>Tradicional</h2>
                <h2 onClick={() => setOnChangeType('SPECIAL')} className={`text-start ${onChangeType === 'SPECIAL' ? "text-gray-100 bg-orange-500 p-2 rounded-md" : "text-gray-500"}`}>Especial</h2>
              </div>
              {onChangeType === 'TRADITIONAL' ? (
                flavors.filter((flavor) => flavor.type === 'TRADITIONAL').map((flavor) => (
                  <CardCatalogPizza
                    id={flavor.id}
                    product={flavor.product}
                    price={flavor.price}
                    image_url={flavor.image_url}
                    description={flavor.description}
                    category={flavor.category}
                    size={flavor.size}
                  />
                ))

              ) : (
                flavors.filter((flavor) => flavor.type === 'SPECIAL').map((flavor) => (
                  <CardCatalogPizza
                    id={flavor.id}
                    product={flavor.product}
                    price={flavor.price}
                    image_url={flavor.image_url}
                    description={flavor.description}
                    category={flavor.category}
                    size={flavor.size}
                  />
                ))

              )}
            </div>

          </>
        )
        : (

          <div className="mb-10 w-full flex flex-col items-center justify-center gap-5">
            <h2 className="text-start w-11/12 font-bold text-gray-500 text-xl my-3">Bebidas</h2>
            {flavors.filter((flavor) => flavor.category.name === 'drink').map((drink) => (
              <CardCatalogDrink
                id={drink.id}
                product={drink.product}
                price={drink.price}
                image_url={drink.image_url}
                description={drink.description}
                category={drink.category}
                size={drink.size}
              />
            ))}
          </div>
        )}
    </div>

  )
}