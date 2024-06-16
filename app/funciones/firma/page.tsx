'use client';
import { useState } from 'react'
import { SignableMessage, keccak256  } from 'viem'
import { spacemono } from '@/app/ui/fonts'
import Upload from '../../ui/upload'
import { walletClient} from '@/app/lib/client'
import { toastError } from '@/app/lib/errormsg';
import SignatureTable from './components/signatureTable';
import { TableRow } from '@/app/lib/globalTypes'
import { formatDate } from '@/app/lib/utils';
import PairTitleText from '@/app/ui/pairTitleText';



export default function () {

    const [signHistory, setSignHistory] = useState <TableRow[]>([])
    const [userFile, setUserFile] = useState<File | null>(null)
    const [hash, setHash] = useState<string>('')
    
    const readUserFile = async (file:File) => {
        console.log('Recibido, procesando:', file.name)
        if (file) {
          try {
            const arrayBuffer = await file.arrayBuffer();
            const hash= keccak256(new Uint8Array(arrayBuffer))
            setHash(hash);
            console.log('hash puesto a', hash)
          } catch (error) {
            console.error('Error calculating hash:', error);
          } finally {
          }
        }}


    const firmar = async () => {
        if (!walletClient) {
            toastError('Necesita instalar Billetera para firmar')
            return
        }
        if (userFile) {
            
            try {
                 const [account] = await walletClient.getAddresses()
                 console.log('account', account)
                const signature = await walletClient.signMessage({account, message: hash});
                setSignHistory((previous) => [...previous, {fileName: userFile.name, hash: hash,signature: signature}])
            } catch (error:any) {
                toastError(error.message)
            }
    }}


    return (
        <div className="  mt-4  mx-8 text-stone-500">
            <div className="h-max-32">
                <Upload setUserFile={setUserFile} readUserFile={readUserFile}/>
            </div>
            {userFile && 
            <div className="mt-8 flex space-x-8 border p-2">
                <PairTitleText title='Nombre:' text={userFile.name} />
                <button className="button-command-small" onClick={firmar}>Firmar</button>
            </div>
            }
            {Boolean(signHistory.length) &&
                <div className="p-4">
                    <SignatureTable data={signHistory} />
                </div>
            }

        </div>
    )
}


