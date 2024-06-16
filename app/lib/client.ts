import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'


export const walletClient = window.ethereum 
  ? createWalletClient({
      chain: mainnet,
      transport: custom(window.ethereum),
    })
  : null