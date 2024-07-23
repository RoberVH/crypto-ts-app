'use client'
import TriviasDisplay from '@/app/contrato/trivias/components/triviasDisplay'
import { getWalletAccount } from '@/app/lib/blockchain-functions'
import { toastError } from '@/app/lib/errormsg'

import { useEffect, useRef, useState } from 'react'

export default function PageIndex() {

  const [account, setAccount] = useState<string | undefined>(undefined)
  const addressRequested = useRef(false);     // pto avoid annoying double running of useEffect in dev mode

  useEffect(() => {
    if (addressRequested.current) return
    const getAccount = async () => {
      addressRequested.current=true
      const result = await getWalletAccount()
      if (result.status) {
        handleAccountsChanged(result.account)
        return
      }
      console.log('error de getWalletAccount', result.error)
      toastError(result.error )

      // if (typeof window !== 'undefined' && window.ethereum) {
      //   try {
      //     // Do we have a connected account?
      //     console.log('solicitando cuenta a billetera')
      //     const accounts: string[] = await window.ethereum.request({
      //       method: 'eth_accounts',
      //     })
      //     console.log('ya solicitada, la address es:', accounts[0])
      //     setAccount(accounts[0] || undefined)
      //   } catch (error) {
      //     console.error('Error al obtener la cuenta:', error)
      //   }
      // }
    }

    const handleAccountsChanged = (account: string |  undefined) => {
      if (account) {
        setAccount(account)
      }
    }

    getAccount()

    if (typeof window?.ethereum?.on === 'function') {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
    }
    return () => {
      if (typeof window?.ethereum?.removeListener === 'function') {
        window.ethereum.removeListener!(
          'accountsChanged',
          handleAccountsChanged
        )
      }
    }
  }, [])

  // if (!account && !prompt)
  //   return (
  //     <div>

  //     </div>
  //   )

  return (
    <div>
      <TriviasDisplay address={account} setAddress={setAccount} />
    </div>
  )
}
