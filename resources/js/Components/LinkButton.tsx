import { Link } from '@inertiajs/react'
import React from 'react'
import { Route } from 'ziggy-js'

interface Props {
  label: string,
  href: string,
  className?: string
}

const LinkButton = ({ label, href, className }: Props) => {
  return (
    <Link href={href} className={`px-4 py-2 text-white rounded-lg font-bold bg-[#137CBD] hover:bg-[#1587ce] ${className}`}>{label}</Link>
  )
}

export default LinkButton