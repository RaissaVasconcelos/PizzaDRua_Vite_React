import { api } from "../../utils/axios";
import { useEffect, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Countdown } from "./components/Countdown";
import { Copy } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { notify } from "../../utils/toast";
import socket from "../../utils/socketIO";
import { useNavigate, useParams } from "react-router-dom";
import { destroyCookie, parseCookies } from "nookies";
import { OrderProps } from "../../@types/interface";
import { CalculatePrice } from "../../utils/calculate-price";
import ServiceAddress from '../../infrastructure/services/address'
import ServiceOrder from '../../infrastructure/services/order'
import { ContextCartApp } from "../../context/cart-context";
import "react-toastify/dist/ReactToastify.css";

interface qrCodeProps {
  qrcode: string
  imagemQrcode: string
}

export default function Pix() {
  const [qrCodeData, setQrCodeData] = useState<qrCodeProps>()
  const [methodDelivery, setMethodDelivery] = useState<string>(() => {
    const storaged = parseCookies().delivery
    return storaged ? JSON.parse(storaged) : []
  });
  const navigate = useNavigate()
  const totalPrice = CalculatePrice()
  const { productToCart } = ContextCartApp()
  const { id } = useParams();
  const serviceAddress = new ServiceAddress()
  const serviceOrder = new ServiceOrder()

  const handleQRcodePix = async () => {
    const response = await api.post('/pix', {
      calendario: {
        expiracao: 3600
      },
      devedor: {
        cpf: "12345678909",
        nome: "xxx-xx-xx"
      },
      valor: {
        original: '0.01',
      },
      chave: "a471ed5a-0b30-4507-8e9e-c9ba73ec33cb",
      solicitacaoPagador: id,

    })
    setQrCodeData(response.data)
  }

  const getAddresses = async () => {
    const response = await serviceAddress.showAddress()
    if (!response.body) {
      return null
    }
    const address = response.body.find(address => address.standard === true)
    return address
  }

  const createOrder = async () => {

    const currentAddress = await getAddresses()

    const order: OrderProps = {
      payment: {
        methodPayment: 'Pix',
        typeCard: 'Pix',
      },
      address: {
        cep: currentAddress?.zipCode,
        neighborhood: currentAddress?.neighborhood.name,
        number: currentAddress?.number,
        tax: currentAddress?.neighborhood.tax,
        phone: currentAddress?.phone,
        street: currentAddress?.street
      },
      totalPrice: await totalPrice,
      status: 'WAITING',
      methodDelivery: methodDelivery,
      observation: parseCookies().observation ? JSON.parse(parseCookies().observation) : '',
      itensOrder: productToCart.map((item) => ({
        mode: item.mode,
        size: item.size,
        image_url: item.image_url ? item.image_url : '',
        price: item.price,
        product: item.product.map(item => item.name),
        quantity: item.quantityProduct
      }))
    }
    const result = await serviceOrder.createOrder(order)

    destroyCookie(null, 'product')
    destroyCookie(null, 'payment')
    destroyCookie(null, 'delivery')
    navigate(`/success/${result.body.id}`)

  }

  useEffect(() => {
    socket.on('payment', (data) => {
      if (data.status === 'PaymentConfirmed') {
        createOrder();
      }
    });
    // Remova o ouvinte quando o componente for desmontado para evitar vazamento de memória
    return () => {
      socket.off('payment');
    };
  }, []);


  socket.emit('join', {
    room: id
  })

  const getDataCookies = () => {

    setMethodDelivery(() => {
      const storaged = parseCookies().delivery
      return storaged ? JSON.parse(storaged) : []
    })
  }


  useEffect(() => {
    handleQRcodePix()
    getDataCookies()
  }, [])

  return (
    <>
      <div className="mt-[90px] w-full px-3 h-72 bg-orange-600 flex  items-start justify-center">
        <h2 className="text-center text-lg mt-10 text-gray-50">Leia ou copie o <span className="font-bold">QR Code Pix</span> e pague utilizando o aplicativo do seu banco.</h2>
        <div className="border-2 border-gray-300 rounded bg-white absolute top-64">
          <img className="relative w-64" src={qrCodeData?.imagemQrcode} />
        </div>

      </div>
      <div className="w-full mt-40 flex flex-col items-center justify-center">
        <div >
          <Countdown />
        </div>
        <div className="mt-10">
          <CopyToClipboard text={qrCodeData?.qrcode ? qrCodeData.qrcode : ''}>
            <button onClick={() => notify('Codigo copiado com sucesso', 'top-center')} className="bg-orange-500 p-4 rounded text-gray-100 flex items-center gap-2 hover:bg-orange-600 ">Capia codigo <Copy /> </button>
          </CopyToClipboard>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

