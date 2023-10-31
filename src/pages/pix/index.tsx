
import { api } from "../../utils/axios";
import { useEffect, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Countdown } from "./components/Countdown";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Copy } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { notify } from "../../utils/toast";
import { CalculatePrice } from "../../utils/calculate-price";

interface qrCodeProps {
  qrcode: string
  imagemQrcode: string
}


export default function Pix() {
  const [qrCodeData, setQrCodeData] = useState<qrCodeProps>()
  const totalPrice = CalculatePrice()
 

  const handleQRcodePix = async () => {
    const response = await api.post('/pix', {
      calendario: {
        expiracao: 3600
      },
      devedor: {
        cpf: "12345678909",
        nome: "Francisco da Silva"
      },
      valor: {
        original: String(totalPrice),
      },
      chave: "a471ed5a-0b30-4507-8e9e-c9ba73ec33cb",
      solicitacaoPagador: "Informe o número ou identificador do pedido."

    })
    setQrCodeData(response.data)

  }

  const navigate = useNavigate()

  const onConfirmationPix = async () => {
    const toastId = toast.loading("Aguardando pagamento...")
    api.get('/webhook').then(() => {
      
      toast.update(toastId, {
        render: "Pagamento realizado com sucesso!",
        type: "success",
        isLoading: false,
        autoClose: 4000
      })
    
    }).catch(() => {
      toast.update(toastId, {
        render: "Erro ao realizar pagamento!",
        type: "error",
        isLoading: false,
      })
    })
    
    
      await new Promise(resolve => setTimeout(resolve, 3000)) 
      navigate('/success')
    
    
   
  }

  useEffect(() => {
    handleQRcodePix()
    onConfirmationPix()
  }, [])


  return (
    <>
      <div className="w-full px-3 h-72 bg-orange-600 flex  items-start justify-center">
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
                  <button onClick={() => notify('Codigo copiado com sucesso', 'bottom')} className="bg-orange-500 p-4 rounded text-gray-100 flex items-center gap-2 hover:bg-orange-600 ">Capia codigo <Copy/> </button>
                </CopyToClipboard>
            </div>
        </div>
      <ToastContainer />
    </>
  )
}

