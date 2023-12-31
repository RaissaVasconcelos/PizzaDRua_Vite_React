import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  link?: string
  isActive?: boolean,
  children: React.ReactNode
}

export const ButtonCheckout = ({ className, isActive, link, children, ...props }: ButtonProps) => {

  return (
    <button
      disabled={isActive}
      className="disabled:opacity-50 fixed bottom-0 flex items-center justify-center rounded-[0px] text-gray-100 font-medium text-lg py-4 w-full bg-orange-500 hover:bg-orange-600 "
      {...props}
    >
      {children}
    </button>

  )
}



