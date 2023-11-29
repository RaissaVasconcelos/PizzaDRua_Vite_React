import { cn } from "../../../utils/cn"

interface IPayment {
    methodPayment: string
    flag?: string
    typeCard?: string
}

type PaymentProps = React.HTMLAttributes<HTMLParagraphElement> & {
    handleSubmitPayment: (payment: IPayment) => void
    payment: IPayment,
    img: string
}

export const CardPayment = ({ handleSubmitPayment, img, className, payment }: PaymentProps) => {
    return (
        <div
            onClick={() => handleSubmitPayment(payment)}
            className={cn("w-11/12 flex items-center justify-start gap-4 p-4 border-[1px] border-gray-300 rounded-md mt-3 ", className)}>
            <img className="w-8" src={img} alt="" />
            <span>{payment.flag ? payment.flag : payment.typeCard}</span>
        </div>
    )
}