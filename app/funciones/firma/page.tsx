'use client';
import { useState } from 'react'

import Upload from './components/upload'
import { fileURLToPath } from 'url';

export default function () {
    const [userFile, setUserFile] = useState<File | null>(null);
    const [historico, setHistorico] = useState <string[]>([])

    const firmar = () => {
        if (userFile)  setHistorico((previous) => [...previous,'ASDSADSAXASX'])
    }

    return (
        <div className="flex mt-8 ml-16 space-x-8">
            <Upload setUserFile={setUserFile}/>
            {userFile && 
            <div className="flex space-x-8">
                <div className="flex ml-8 flex-col border p-4 justify-around">
                    <div className="flex flex-col">
                        <p>Nombre: {userFile.name}</p>
                        <p>Tamaño: {userFile.size}</p>
                        <p>F. Modificación: {userFile.lastModified}</p>
                    </div>
                    <button className="button-command" onClick={firmar}>Firmar</button>
                </div>
                    {historico &&
                        <div className="flex flex-col border p-4">
                            <ul className="">
                                <p>Histórico de Firmas</p>
                                 {historico.map((firma, index)=> <li key={index}>{`${index}-${firma}`}</li>)}
                            </ul>
                        </div>
                    }
            </div>
            }
        </div>
    )
}


