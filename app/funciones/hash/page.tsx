'use client';
import { useState} from 'react'
import InputArea from './components/InputArea'
import { keccak256, toBytes  } from 'viem'
import { spacemono } from '@/app/ui/fonts'

//import {  createPublicClient, http } from 'viem'
//import { polygonAmoy } from 'viem/chains'




export default function() {
    const [hash, setHash] = useState<string>('')

    
    const calculeHash = async (input:string) => {
        console.log('Input', input)
        if (input.length===0) {
            setHash('')
            return
        }
        const hexValue = toBytes(input)
        const hash= keccak256(hexValue)
        setHash(hash)



    }


    return (
        <div className = "flex flex-col  my-16 ml-8">
            <InputArea calculeHash={calculeHash} />
            <div className="flex items-center space-x-8 mt-8 text-slate-400">
                <p>HASH:</p>
                <p className={`${spacemono.className}  border w-[10rem] md:w-[45rem] h-12 break-words`}>
                    {hash}
                </p>

            </div>
        </div>
    )
}



