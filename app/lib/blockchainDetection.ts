import { custom, createWalletClient, WalletClient } from 'viem'
import { polygonAmoy, sepolia } from 'viem/chains'
import { generalFunctioResponse } from '@/app/types/web3Types'
import viemErrorProcessing from './viemErrorProcessing'

// https://amoy.polygonscan.com/

let walletClient: WalletClient

export const blockchainDetection =
  async (): Promise<generalFunctioResponse> => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        walletClient = createWalletClient({
          chain: polygonAmoy,
          transport: custom(window.ethereum),
        })
        if ((await walletClient.getChainId()) !== polygonAmoy.id) {
          await walletClient.switchChain({ id: polygonAmoy.id })
        }
        return { status: true }
      } else return { status: false, error: 'NoWallet' }
    } catch (error) {
      if (error instanceof Error  && error.name==='SwitchChainError')   {
        try {
          await walletClient.addChain({ chain: polygonAmoy })
          if ((await walletClient.getChainId()) !== polygonAmoy.id) {
            // network exist but was not selected
            return { status: false, error: 'NoRightNetwork' }
          } else return { status: true }
        } catch (error) {
          // catch errores en el addChain
          return { status: false, error: viemErrorProcessing(error) }
        }
      }
      //no fue error al chambiar redes, procesa normalmente el error
      return { status: false, error: viemErrorProcessing(error) }
    }
  }
