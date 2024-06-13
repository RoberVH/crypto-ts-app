'use client';

import React, { useState} from 'react'

interface InputAreaProps {
    calculeHash: (value:string) => void // Ajusta la firma de la función según sea necesario
  }


const InputArea: React.FC<InputAreaProps> =({calculeHash}) => {
    const [input, setInput] = useState<string>('')
    const [hash, setHash] = useState<string>('')
    
    return (
        
        <textarea
            className="border  p-4 w-[80rem] h-48"
            placeholder="Introduce tu texto aquí"
            onChange={(e) => calculeHash(e.currentTarget.value)}
        />
        
    )

}
export default  InputArea