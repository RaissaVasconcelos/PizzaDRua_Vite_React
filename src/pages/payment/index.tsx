import { useState } from "react";
import pix from '../../assets/pix.svg'
import { setCookie } from "nookies";
import { useNavigate } from 'react-router-dom';
import mc from '../../assets/mc.svg'
import visa from '../../assets/visa.png'
import elo from '../../assets/elo.png'
import money from '../../assets/money.png'

interface PaymentProps {
  methodPayment: string
  flag?: string
  typeCard?: string
}

export default function Payment() {
  const [isCheckedPayment, setIsCheckedPayment] = useState('APP');
 
  const navigate = useNavigate();

  const handleSubmitPayment = (payment: PaymentProps) => {
    
      const paymentData = JSON.stringify(payment);
      setCookie(undefined, 'payment', paymentData, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      navigate('/checkout');
  }

  return (
    <>
      <div className="mt-28 w-11/12 flex items-center justify-center font-normal gap-3 text-gray-500 text-base ">
        <h3
          onClick={() => setIsCheckedPayment('APP')}
          className={`w-full ${isCheckedPayment === 'APP'
            ? "text-orange-500  border-b-[2px] border-orange-600"
            : "text-gray-500 "} flex items-center justify-center p-2`}>
          PAGUE PELO APP
        </h3>
        <h3
          onClick={() => setIsCheckedPayment('DELIVERY')}
          className={`w-full ${isCheckedPayment === 'DELIVERY'
            ? "text-orange-500  border-b-[2px] border-orange-600"
            : "text-gray-500 "} flex items-center justify-center p-2`}>
          PAGUE NA ENTREGA
        </h3>
      </div>
      <div className="w-full flex flex-col items-center justify-center my-10">
        {isCheckedPayment === 'APP' ? (
          <div className="w-full flex flex-col items-center justify-center">
            
            <h3 className="w-11/12 font-semibold text-base text-gray-600">
              Formas de pagamento
            </h3>
            <div 
                onClick={() => handleSubmitPayment({ methodPayment: 'Pix',typeCard: 'Pix'  })} 
                className="w-11/12 flex items-center justify-start gap-2 p-4 border-[1px] border-gray-300 rounded-md mt-10 ">
              <img className="w-8" src={pix} alt="" />
              <span>Pix</span>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center text-xs">
              <div className="bg-white text-gray-500 text-sm p-3 w-11/12 flex flex-col items-center justify-center mb-5">
                <p>Atencao para a forma de pagamento selecionada.</p>
                <p>Voce nao podera utlilizar outra nessa entrega.</p>
              </div>
            <h3 className="w-11/12 font-semibold text-sm text-gray-500 mt-5">
              Credito
            </h3>
            <div 
                onClick={() => handleSubmitPayment({ methodPayment: 'Card', flag: 'Elo', typeCard: 'Crédito' })} 
              className="w-11/12 flex items-center justify-start gap-4 p-4 border-[1px] border-gray-300 rounded-md mt-3 ">
              <img className="w-8" src={elo} alt="" />
              <span>Elo</span>
            </div>
              <div
                onClick={() => handleSubmitPayment({ methodPayment: 'Card', flag: 'Visa', typeCard: 'Crédito' })}
                className="w-11/12 flex items-center justify-start gap-4 p-4 border-[1px] border-gray-300 rounded-md mt-3 ">
                <img className="w-8" src={visa} alt="" />
                <span>Visa</span>
              </div>
              <div
                onClick={() => handleSubmitPayment({ methodPayment: 'Card', flag: 'Mastercard', typeCard: 'Crédito' })}
                className="w-11/12 flex items-center justify-start gap-4 p-4 border-[1px] border-gray-300 rounded-md mt-3 ">
                <img className="w-8" src={mc} alt="" />
                <span>Mastercard</span>
              </div>
              <h3 className="w-11/12 font-semibold text-sm text-gray-500 mt-5">
                Debito
              </h3>
              <div
                onClick={() => handleSubmitPayment({ methodPayment: 'Card', flag: 'Elo', typeCard: 'Débito' })}
                className="w-11/12 flex items-center justify-start gap-4 p-4 border-[1px] border-gray-300 rounded-md mt-3 ">
                <img className="w-8" src={elo} alt="" />
                <span>Elo</span>
              </div>
              <div
                onClick={() => handleSubmitPayment({ methodPayment: 'Card', flag: 'Visa', typeCard: 'Débito' })}
                className="w-11/12 flex items-center justify-start gap-4 p-4 border-[1px] border-gray-300 rounded-md mt-3 ">
                <img className="w-8" src={visa} alt="" />
                <span>Visa</span>
              </div>
              <div
                onClick={() => handleSubmitPayment({ methodPayment: 'Card', flag: 'Mastercard', typeCard: 'Débito' })}
                className="w-11/12 flex items-center justify-start gap-4 p-4 border-[1px] border-gray-300 rounded-md mt-3 ">
                <img className="w-8" src={mc} alt="" />
                <span>Mastercard</span>
              </div>
              <h3 className="w-11/12 font-semibold text-sm text-gray-500 mt-5">
                Dinheiro
              </h3>
              <div
                onClick={() => handleSubmitPayment({ methodPayment: 'Money', typeCard: 'Dinheiro' })}
                className="w-11/12 flex items-center justify-start gap-4 p-3 border-[1px] border-gray-300 rounded-md mt-3 ">
                <img className="w-8" src={money} alt="" />
                <span>Dinheiro</span>
              </div>
          </div>
        )}
      </div>
    </>
  )
}