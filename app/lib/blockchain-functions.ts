/**
 * Functions in this file use  viem ^2.17.4 and browser native object window.ethereum 
 */

import {
  createWalletClient,
  custom,
  WalletClient,
  createPublicClient,
  publicActions,
} from 'viem'
import { polygonAmoy } from 'viem/chains'

import { OptionAnswersType } from '@/app/types/triviaTypes'
import { contractAddress } from '@/app/lib/contractAddres'
import triviaABI from '@/app/lib/triviaContract.json'
import {
  publicClientTypeResult,
  AccountResponse,
} from '@/app/types/web3Types'
import viemErrorProcessing from './viemErrorProcessing'
import { gasPrices } from './server-actions/getGasPrices'




/**
 * getWalletAccount
 *      - check and gets account through only viem methods
 * @returns object { status: false, error: string } | { status: true, account: address }
 */
export const getWalletAccount = async (): Promise<AccountResponse> => {
  try {
    // Are we on client and is there a provider?
    if (typeof window !== 'undefined' && window.ethereum) {
      const walletClient = createWalletClient({
        chain: polygonAmoy,
        transport: custom(window.ethereum),
      })
      // reqiest account address
      const [address] = await walletClient.requestAddresses()
      if (address) {
        return { status: true, account: address }
      } else {
        return { status: false, error: 'ErrorIndeterminado' }
      }
    } else {
      return { status: false, error: 'NoWallet' }
    }
  } catch (err) {
    return { status: false, error: viemErrorProcessing(err) }
  }
}

// /**
//  * getEthereumProvider
//  *  *      - check and gets account through window.ethereum object
//  * @returns object { status: false, error: string } | { status: true, account: accounts[0] }
//   */
// export const getEthereumProvider = async (): Promise<ProviderResult> => {
//   console.log('getEthereumProvider:', typeof window)
//   if (typeof window === 'undefined' || !window.ethereum) {
//     return {
//       status: false,
//       error: 'NoWallet',
//     }
//   }
//   const provider = window.ethereum as EthereumProvider
//   try {
//     const accounts = await provider.request({
//       method: 'eth_requestAccounts',
//     })

//     if (accounts && accounts.length > 0) {
//       return { status: true, account: accounts[0] }
//     } else {
//       return {
//         status: false,
//         error: 'UnknownError',
//       }
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       if (error.message.includes('User rejected')) {
//         return { status: false, error: 'UserRejected' }
//       }
//       return { status: false, error: 'UnknownError' }
//     }
//     return { status: false, error: 'UnknownError' }
//   }
// }

const getPublicClient = (): publicClientTypeResult => {
  if (!(typeof window !== 'undefined' && window.ethereum))
    return { status: false, error: 'NoWallet' }
  try {
    const publicClient = createPublicClient({
      chain: polygonAmoy,
      transport: custom(window.ethereum),
    })
    if (publicClient) return { status: true, publicClient }
    return { status: false, error: 'ErrorIndeterminado' }
  } catch (err) {
    return { status: false, error: viemErrorProcessing(err) }
  }
}

export const getSolvedTriviasFromContract = async (address: string) => {
  const resultViem = getPublicClient()
  if (!resultViem.status) return { status: false, error: resultViem.error }
  const publicClient = resultViem.publicClient
  const contractAbi = triviaABI

  try {
    // Leer del contrato
    const triviaResults = await publicClient.readContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'getUserSolvedTrivias',
      args: [address],
    })
    return { status: true, triviasSolved: triviaResults }
  } catch (error) {
    const result = viemErrorProcessing(error)
    return { status: false, error: result }
  }
}

export const getTokensTriviasTTS = async (address: string) => {
  const resultViem = getPublicClient()
  if (!resultViem.status) return { status: false, error: resultViem.error }
  const publicClient = resultViem.publicClient
  const contractAbi = triviaABI

  try {
    const balance = await publicClient.readContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'balanceOf',
      args: [address],
    })
    return { status: true, balance: balance }
  } catch (error) {
    const result = viemErrorProcessing(error)
    return { status: false, error: result }
  }
}



/**
 * addSolvedTriviaToContract  - Receive user proposed answer to Trivia
 *                        send answer to contract and detect if revert with AnsweredIncorrect err
 *                      Returns {status:false and error: 'AnsweredIncorrect'} (or any other error msg from contract)
 *                      returns {status: true} if all ok   if this account already solved this return error msg 'TriviaAlreadySolved'
 * @param answers string<'A'|'B'|'C'|'D'[]>[]
 * @param triviaIndex number
 * @returns
 */
export const addSolvedTriviaToContract = async (
  answers: OptionAnswersType,
  triviaIndex: number
): Promise<
  { status: true } | { status: false; error: string; hash?: string }
> => {
  //logic to write to contrat
  let hash
  try {
    const walletClient = createWalletClient({
      chain: polygonAmoy,
      transport: custom(window.ethereum!),
    }).extend(publicActions)

    const [account] = await walletClient.getAddresses()
    const proposedSolution = triviaIndex.toString() + answers.join('')
    // Get current  gas values MaxFeePerGas and maxPriorityFeePerGas 15% and increment them because this is a demo on polygonAmoy and we want TX to pass as safely and quickest as it could
    const gasResult= await gasPrices()
    let maxFeePerGas, maxPriorityFeePerGas
    // const temp = await walletClient.estimateFeesPerGas({ chain: polygonAmoy })
    // console.log('gas de metamask:', temp)
    if (!gasResult.status) {
      // something went wrong, resort to metamask values, this could cause warning problems so it is no prefered method
       ({ maxFeePerGas, maxPriorityFeePerGas } =   await walletClient.estimateFeesPerGas({ chain: polygonAmoy }))
      }
      else {
       ({ maxFeePerGas, maxPriorityFeePerGas } = gasResult)
      }
    const increasedGasEstimate = BigInt(Math.ceil(Number(maxFeePerGas) * 1.15))
    const increasedMaxPriorityFeePerGas = BigInt( Math.ceil(Number(maxPriorityFeePerGas) * 1.15))
    // simulate contract op. This will trigger error if there is a problem saving time
    // Curiously, even tho docs for current 2.17.11 says this function take maxFeePerGas and maxPriorityFeePerGas props, if added cause a bizarre error of contract execution error
    await walletClient.simulateContract({
      address: contractAddress,
      abi: triviaABI,
      functionName: 'scoreAnswer',
      args: [triviaIndex, proposedSolution],
      account,
    })      
     // all ok, send it away     
    hash = await walletClient.writeContract(      {
      address: contractAddress,
      abi: triviaABI,
      functionName: 'scoreAnswer',
      args: [triviaIndex, proposedSolution],
      account,
      maxFeePerGas:increasedGasEstimate,
      maxPriorityFeePerGas:increasedMaxPriorityFeePerGas
    })
      // we'll wait for it, to show users an operation similar to web2 apps
    const transaction = await walletClient.waitForTransactionReceipt({ hash })
    return { status: true }
  } catch (error) {
    const errMsg = viemErrorProcessing(error)
    return { status: false, error: errMsg, hash }
  }
}
