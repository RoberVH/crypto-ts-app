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
      toastError(result.error )
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

  if (!account) {
    return (
      <div>
        loading....
      </div>
    )
  }

  return (
    <div>
      <TriviasDisplay address={account}  />
    </div>
  )
}
