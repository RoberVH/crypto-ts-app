'use client'
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'
import { useState } from 'react'
import { keccak256 } from 'viem'
import Upload from '../../ui/upload'
import { toastError } from '@/app/lib/errormsg'
import SignatureTable from './components/signatureTable'
import { TableRow } from '@/app/lib/globalTypes'
import PairTitleText from '@/app/ui/pairTitleText'
import WaitModal from '@/app/ui/waitModal'

export default function FirmaPage() {
  const [signHistory, setSignHistory] = useState<TableRow[]>([])
  const [userFile, setUserFile] = useState<File | null>(null)
  const [hash, setHash] = useState<string>('')
  const [busy, setBusy] = useState<Boolean>(false)

  const readUserFile = async (file: File) => {
    if (file) {
      try {
        setBusy(true)
        const arrayBuffer = await file.arrayBuffer()
        const hash = keccak256(new Uint8Array(arrayBuffer))
        setHash(hash)
      } catch (error) {
        console.error('Error calculating hash:', error)
      } finally {
        setBusy(false)
      }
    }
  }

  const firmar = async () => {
    let walletClient, account
    try {
      if (window.ethereum) {
        ;[account] = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        walletClient = createWalletClient({
          account,
          chain: mainnet,
          transport: custom(window.ethereum),
        })
      } else walletClient = undefined
      if (!walletClient) {
        toastError('WalletNeededToSign')
        return
      }
      if (userFile) {
        const signature = await walletClient.signMessage({
          account,
          message: hash,
        })
        setSignHistory((previous) => [
          ...previous,
          { fileName: userFile.name, hash: hash, signature: signature },
        ])
      }
    } catch (error: any) {
      if (error.name) {
        toastError(error.name)
        return
      }
      if (error.message && error.message.includes('User rejected the request.')){
        toastError('UserRejectedRequestError')
      }
    }
  }

  return (
    <div className="w-[450px] md:w-[900px]  mt-4  mx-8 text-stone-500 ">
      {busy && <WaitModal message="Obteniendo hash del archivo" />}
      <div className="h-max-32">
        <Upload setUserFile={setUserFile} readUserFile={readUserFile} />
      </div>
      {userFile && (
        <div className="mt-8 flex flex-col space-y-2 md:flex-row space-x-8 border p-2 overflow-hidden">
          <div className="flex flex-col">
            <PairTitleText title="Nombre:" text={userFile.name} />
            <PairTitleText title="Hash:" text={hash} />
          </div>
          <button className="button-command-small" onClick={firmar}>
            Firmar
          </button>
        </div>
      )}
      {Boolean(signHistory.length) && (
        <div className="mt-8 p-4 border">
          <SignatureTable data={signHistory} />
        </div>
      )}
    </div>
  )
}
