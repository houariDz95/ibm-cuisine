"use client"
import React from 'react'
import Logo from './Logo'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const router = useRouter()
  return (
    <nav className="flex justify-between max-w-7xl mx-auto pt-5">
        <Logo />
        <Button  size="lg" variant="outline" onClick={() => router.push('?admin=true')}>
          Admin
        </Button>
    </nav>
  )
}

export default Navbar