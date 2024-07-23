'use client';

import React, { useState} from 'react'

interface InputAreaProps {
    calculeHash: (value:string) => void 
  }


const InputArea: React.FC<InputAreaProps> =({calculeHash}) => {
    const [input, setInput] = useState<string>('')
    const [hash, setHash] = useState<string>('')
    
    return (
        
        <textarea
            className="border border-blue-600  p-4 w-[40rem] w-full   w-[300px] md:w-[900px]  h-48 rounded-md"
            placeholder="Texto del Bloque"
            onChange={(e) => calculeHash(e.currentTarget.value)}
        />
        
    )

}
export default  InputArea