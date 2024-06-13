'use client';
import { useState} from 'react'
import InputArea from './components/InputArea'

export default function() {
    const [hash, setHash] = useState<string>('')
    
    const calculeHash =( input:string) => {
        setHash(input)
    }


    return (
        <div className = "flex flex-col  my-16 ml-8">
            <InputArea calculeHash={calculeHash} />
            <div className="flex items-center space-x-8 mt-8 text-slate-400">
                <p>HASH:</p>
                <p className="border w-[70rem] h-12">{hash}</p>
            </div>
        </div>
    )
}


