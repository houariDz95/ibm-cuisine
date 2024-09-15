import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href="/admine" className="text-light-200 text-xl italic font-medium tracking-wide">
        <span className="text-green-500">IBM</span> Cuisine
    </Link>
  )
}

export default Logo