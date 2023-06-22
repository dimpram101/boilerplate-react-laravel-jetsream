import React from 'react'

interface Props {
  label: string,
  onClick?: () => void,
  type?: "button" | "submit" | "reset",
  className?: string,
  disabled?: boolean,
}

const PrimaryButton = ({ label, onClick, type, className, disabled }: Props) => {
  return (
    <button className={`px-4 py-2 text-white rounded-lg font-bold bg-[#137CBD] hover:bg-[#1587ce] ${className}`} onClick={onClick} type={type ? type : "button"} disabled={disabled}>{label}</button>
  )
}

export default PrimaryButton