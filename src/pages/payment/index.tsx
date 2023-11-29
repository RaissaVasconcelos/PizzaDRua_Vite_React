import { useState } from "react";
import pix from '../../assets/pix.svg'
import { setCookie } from "nookies";
import { useNavigate } from 'react-router-dom';
import mc from '../../assets/mc.svg'
import visa from '../../assets/visa.png'
import elo from '../../assets/elo.png'
import money from '../../assets/money.png'
import { CardPayment } from "./components/CardPayment";

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
      <div className="fixed bg-[#F6F6F9] mt-24 pt-4 w-11/12  font-normal gap-3 text-gray-500 text-base ">
        <div className="w-full flex items-center justify-center">
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
        {isCheckedPayment === 'DELIVERY' && (
          <div className="bg-white mt-5 text-gray-500 text-sm p-3 w-full flex flex-col items-center justify-center mb-5">
            <p>Atenção para a forma de pagamento selecionada.</p>
            <p>Você não poderá utilizar outra nesta entrega.</p>
          </div>
        )}
      </div>
      <div className="w-full flex flex-col items-center justify-center my-10">
        {isCheckedPayment === 'APP' ? (
          <div className="w-full mt-40 flex flex-col items-center justify-center">

            <h3 className="w-11/12 mb-3 font-semibold text-base text-gray-600">
              Formas de pagamento
            </h3>
            <CardPayment className="p-2 text-sm" handleSubmitPayment={handleSubmitPayment} img={pix} payment={{ methodPayment: 'Pix', typeCard: 'Pix' }} />
          </div>
        ) : (
          <div className="mt-52 w-full flex flex-col items-center justify-center text-xs">
            <h3 className="w-11/12 font-semibold text-sm text-gray-500 mt-5">
              Crédito
            </h3>

            <CardPayment handleSubmitPayment={handleSubmitPayment} img={elo} payment={{ methodPayment: 'Card', flag: 'Elo', typeCard: 'Crédito' }} />
            <CardPayment handleSubmitPayment={handleSubmitPayment} img={visa} payment={{ methodPayment: 'Card', flag: 'Visa', typeCard: 'Crédito' }} />
            <CardPayment handleSubmitPayment={handleSubmitPayment} img={mc} payment={{ methodPayment: 'Card', flag: 'Mastercard', typeCard: 'Crédito' }} />
            <h3 className="w-11/12 font-semibold text-sm text-gray-500 mt-5">
              Débito
            </h3>
            <CardPayment handleSubmitPayment={handleSubmitPayment} img={elo} payment={{ methodPayment: 'Card', flag: 'Elo', typeCard: 'Débito' }} />
            <CardPayment handleSubmitPayment={handleSubmitPayment} img={visa} payment={{ methodPayment: 'Card', flag: 'Visa', typeCard: 'Débito' }} />
            <CardPayment handleSubmitPayment={handleSubmitPayment} img={mc} payment={{ methodPayment: 'Card', flag: 'Mastercard', typeCard: 'Débito' }} />
            <h3 className="w-11/12 font-semibold text-sm text-gray-500 mt-5">
              Dinheiro
            </h3>
            <CardPayment className="p-[10px]" handleSubmitPayment={handleSubmitPayment} img={money} payment={{ methodPayment: 'Money', typeCard: 'Dinheiro' }} />
          </div>
        )}
      </div>
    </>
  )
}