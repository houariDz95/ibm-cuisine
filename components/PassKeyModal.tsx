"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp"
import { decryptKey, encryptKey } from "@/lib/utils"


function PassKeyModal() {

    const router = useRouter()
    const path = usePathname();
    const [open, setOpen] = useState(false)
    const [error, setError] = useState("")
    const [passkey, setPasskey] = useState("");

    const encryptedKey = typeof window !== "undefined" ? window.localStorage.getItem("accessKey") : null;

    const PASS_KEY = "199526"
    useEffect(() => {
      const accessKey = encryptedKey && decryptKey(encryptedKey)
      if(path){
        if(PASS_KEY === accessKey){
          router.push('/admin')
          setOpen(false)
        }else {
          setOpen(true)
        }
      }
    }, [encryptedKey])

    const onCloseModal = () => {
      setOpen(false)
      router.push('/')
    }

    const validatePassKey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      if(passkey === PASS_KEY){
        const encryptedKey = encryptKey(passkey)
        localStorage.setItem('accessKey', encryptedKey)
        setOpen(false)
      }else{
        setError("Invalide passKey. Please try again")
      }
    }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            Admin Access Verification
            <Image src="/assets/icons/close.svg" width={20} height={20} alt="close" onClick={() => onCloseModal()} className='cursor-pointer'/>
          </AlertDialogTitle>
          <AlertDialogDescription>
            To Access the admin page, please enter the passkey
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
            <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
            <InputOTPGroup  className="shad-otp">
                <InputOTPSlot className="shad-otp-slot" index={0} />
                <InputOTPSlot className="shad-otp-slot" index={1} />
                <InputOTPSlot className="shad-otp-slot" index={2} />
                <InputOTPSlot className="shad-otp-slot" index={3} />
                <InputOTPSlot className="shad-otp-slot" index={4} />
                <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
            </InputOTP>

            {error && <p className="shad-error text-14-regular mt-4 flex justify-center">{error}</p>}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction 
          className="shad-primary-btn w-full"
          onClick={(e) => validatePassKey(e)}>
            Enter Admin PassKey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PassKeyModal