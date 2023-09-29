
import { CardCatalogPizza } from "./CardCatalog/pizza"
import { CardCatalogDrink } from "./CardCatalog/drink"
import { ContextApp } from "../../../../context/context-app";
import { useState } from "react";

export const Catalog = () => {
  const { flavors, drinks, onChangeCatalog } = ContextApp()
  const [onChangeType, setOnChangeType] = useState('TRADITIONAL')
  console.log(onChangeCatalog, );
  

  return (
    <div className=" mt-10  w-full">
      {onChangeCatalog === 'PIZZA'
        ? (
          <>
            <div className="w-full flex flex-col items-center justify-center gap-5 mb-10">
              <div className="w-11/12 flex items-center justify-between font-bold text-gray-500 text-xl mb-3">
                <h2 onClick={() => setOnChangeType('TRADITIONAL')} className={`text-start ${onChangeType === 'TRADITIONAL' ? "text-orange-500" : "text-gray-500"}`}>Tradicional</h2>
                <h2 onClick={() => setOnChangeType('SPECIAL')} className={`text-start ${onChangeType === 'SPECIAL' ? "text-orange-500" : "text-gray-500"}`}>Especial</h2>
              </div>
              {onChangeType === 'TRADITIONAL' ? (
                flavors.filter((flavor) => flavor.type === 'TRADITIONAL').map((flavor) => (
                  <CardCatalogPizza
                    id={flavor.id}
                    name={flavor.name}
                    price={flavor.price}
                    image_url={flavor.image_url}
                    description={flavor.description}
                  />
                ))
              
                ): (
                  flavors.filter((flavor) => flavor.type === 'SPECIAL').map((flavor) => (
                    <CardCatalogPizza
                      id={flavor.id}
                      name={flavor.name}
                      price={flavor.price}
                      image_url={flavor.image_url}
                      description={flavor.description}
                    />
                  ))
                  
                )}
            </div>
            
           
          </>
        )
        : (

          <div className="mb-10 w-full flex flex-col items-center justify-center gap-5">
            <h2 className="text-start w-11/12 font-bold text-gray-500 text-xl my-3">Bebidas</h2>
            {drinks.map((drink) => (
              <CardCatalogDrink
                id={drink.id}
                name={drink.name}
                price={drink.price}
                image_url={drink.image_url}
                description={drink.description}
              />
            ))}
          </div>
        )}
    </div>

  )
}