import { custom, createWalletClient, extractChain  } from 'viem'
import { polygonAmoy, sepolia } from 'viem/chains'
import { generalFunctioResponse } from '@/app/types/web3Types'
import viemErrorProcessing from './viemErrorProcessing'


// https://amoy.polygonscan.com/

export const blockchainDetection =  async (): Promise<generalFunctioResponse> => {
    try {
        let walletClient
        if (typeof window !== 'undefined' && window.ethereum) {
            walletClient = createWalletClient({
                chain: polygonAmoy,
                transport: custom(window.ethereum),
            })
            console.log('Por comparar - polygonAmoy.id polygonAmoy.id',polygonAmoy.id)
            console.log('Por comparar - await walletClient.getChainId()',await walletClient.getChainId())
            // next instruction: if network exists and is not selected asks to change to polygonAmoy | sepolia
            // if is selected do nothing
            await walletClient.addChain({chain: polygonAmoy}) 
             if (await walletClient.getChainId()!== polygonAmoy.id) {
                // network exist but was not selected
                console.log('No fueron iguales')
                return {status:false, error:'NoRightNetwork'}
            } else {
                //ask to change Network
               // walletClient.switchChain({id: polygonAmoy.id})
                console.log('la red si era polygonAmoy')
                 return {status: true }
            }
      } else
       return { status: false, error: 'NoWallet' }
    } catch (error) {
      console.error('Error al verificar o cambiar la red en blockchain detector:', error)
      return { status: false, error: viemErrorProcessing(error) }
    }
  }
