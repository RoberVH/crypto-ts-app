'use client'
import { toastError } from '@/app/lib/errormsg'

import { useState } from 'react'
import { transferCrypto } from '@/app/lib/server-actions/transfer-crypto'
import { toastSuccess } from '@/app/lib/successmsg'

import WaitModal from '@/app/ui/waitModal'
import { getWalletAccount } from '@/app/lib/blockchain-functions'

function FaucetPage() {
  const [userAddress, setUserAddress] = useState<string>('')
  const [processingTx, setPprocessingTx] = useState<boolean>(false)


  const getAccountToSendEthers = async () => {
    const result = await getWalletAccount()
    if (!result.status) {
      toastError(result.error)
    } else  
        setUserAddress(result.account)
  }

  const sendCrypto = async () => {
    try {
      setPprocessingTx(true)
      const result = await transferCrypto(userAddress)
      if (result.status) {
        toastSuccess(
          `Transfrencia exitosa, el saldo se reflejará en un momento`
        )
      } else toastError(result.error)
    } catch (e) {
      console.log('ERROR:', e)
    } finally {
      setPprocessingTx(false)
    }
  }

  return (
    <div className="flex m-4 w-[450px] md:w-[900px]">
      {processingTx && (
        <WaitModal message="Esperando respuesta de la Blockchain" />
      )}
      <div className="flex flex-col w-[800px] space-y-8 p-4 border-2  rounded-md bg-stone-100">
        <label className="text-sm font-semibold">
          {`Solicite Ethers de Pruebas`}
        </label>
        <div className="flex flex-col justify-start space-y-8">
          <div>
            <button
              onClick={getAccountToSendEthers}
              className="button-command-smallblue"
            >
              Obtener Cuenta
            </button>
          </div>
          {userAddress && (
            <div className="flex flex-col md:flex-row md:space-y-0 md:space-x-8 space-x-0 space-y-8 justify-start">
              <div>
                <label className="mt-2 text-md underline text-sm">{`Cuenta: ${userAddress}`}</label>
              </div>
              <div>
                <button
                  onClick={sendCrypto}
                  className="button-command-small p-2"
                >
                  Dame Ethers
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default FaucetPage
