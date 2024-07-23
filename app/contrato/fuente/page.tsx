import { toastError } from '@/app/lib/errormsg'

import { createWalletClient, custom } from 'viem'
import { sepolia } from 'viem/chains'
import PairTitleText from '@/app/ui/pairTitleText'
import { useEffect, useState } from 'react'
import { transferCrypto } from '@/app/lib/server-actions/transfer-crypto'
import { toastSuccess } from '@/app/lib/successmsg'
import FaucetPage from './components/faucetPage'
import { waitForDebugger } from 'inspector'

function FuentePage() {

    
  return (
    <div className="flex m-4 ">
      <FaucetPage />
    </div>
  )
}
export default FuentePage
