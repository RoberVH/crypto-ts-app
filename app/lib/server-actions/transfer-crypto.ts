'use server'
import {
  createWalletClient,
  http,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

import { publicClient } from '@/app/lib/client'

import triviaABI from '@/app/lib/triviaContract.json'
import { contractAddress } from '@/app/lib/contractAddres'
import { polygonAmoy, sepolia } from 'viem/chains'
import viemErrorProcessing from '../viemErrorProcessing'
import { TransferFunction } from '@/app/types/web3Types'

export const transferCrypto = async (
  addresstoTransfer: string
): Promise<TransferFunction> => {
  const serverAccount = privateKeyToAccount(
    `0x${process.env.PVTE_ACCOUNT_SERVER}`
  )
  const walletClient = createWalletClient({
    account: serverAccount,
    chain: polygonAmoy,
    transport: http(process.env.ALCHEMY_AMOY_URL),
  })

  try {
    // first simulate transaction
    const { request } = await publicClient.simulateContract({
      account: serverAccount,
      address: contractAddress,
      abi: triviaABI,
      functionName: 'giveFaucet',
      args: [addresstoTransfer],
    })

    // all ok, make it real
    const hash = await walletClient.writeContract(request)
    // Esperar a que la transacción se confirme
    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    return { status: true, hash: receipt.transactionHash }
  } catch (err) {
    const result = viemErrorProcessing(err)
    return { status: false, error: result }
  }
}
