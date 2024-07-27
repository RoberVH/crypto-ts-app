'use client'
import TriviasDisplay from '@/app/contrato/trivias/components/triviasDisplay'
import { getWalletAccount } from '@/app/lib/blockchain-functions'
import { blockchainDetection } from '@/app/lib/blockchainDetection'
import { toastError } from '@/app/lib/errormsg'
import { toastWarning } from '@/app/lib/toastWarning'

import { useEffect, useRef, useState } from 'react'

export default function PageIndex() {
  const [account, setAccount] = useState<string | undefined>(undefined)
  const [rightNetwork, setRightNetwork] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const addressRequested = useRef(false) // pto avoid annoying double running of useEffect in dev mode

  useEffect(() => {
    if (addressRequested.current) return
    const getAccount = async () => {
      addressRequested.current = true
      const result = await getWalletAccount()
      if (result.status) {
        handleAccountsChanged(result.account)
        // here check if is the right network
        const networkChecked = await blockchainDetection()
        if (!networkChecked.status) {
          toastError(networkChecked.error)
          toastWarning('No podrá contestar Trivias hasta no cambiar a la Blockchain correcta a la billetera')
          
        } else {
          setRightNetwork(true)
        }
        setLoading(false)
        return
      }
      toastError(result.error)
    }

    const handleAccountsChanged = (account: string | undefined) => {
      if (account) {
        setAccount(account)
      }
    }

    getAccount()
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        Cargando ... espere por favor
      </div>
    )
  }

  if (!account) {
    return (
      <div className="flex h-screen justify-center items-center">
        Necesita una Billetera para esta función
      </div>
    )
  }

  if (!rightNetwork) {
    return (
      <div className="flex h-screen justify-center items-center">
        Necesita esta conectado a la blockchain de prueba Polygon Amoy
      </div>
    )
  }

  return (
    <div>
      <TriviasDisplay address={account} />
    </div>
  )
}
