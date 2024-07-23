// Get from contract the array of solved trivias for the specific funtion
//     // Implementa la lógica para leer del contrato en Polygon
//     // Retorna un array de IDs de trivias resueltas
// usando viem ^2.17.4

import {
  Address,
  http,
  createWalletClient,
  Account,
  custom,
  WalletClient,
  walletActions,
  createPublicClient,
  PublicClient,
  publicActions,
   
} from 'viem'
import { polygonAmoy } from 'viem/chains'

import { OptionAnswersType } from '@/app/types/triviaTypes'
import { contractAddress } from '@/app/lib/contractAddres'
import triviaABI from '@/app/lib/triviaContract.json'
import {
  EthereumProvider,
  ProviderResult,
  errorProvider,
  publicClientTypeResult,
  AccountResponse
} from '@/app/types/web3Types'
import viemErrorProcessing from './viemErrorProcessing'





/****************************testing getting account with only wiem calls *********************************** *********************************** */


export const getWalletAccount = async (): Promise<AccountResponse> => {
  try {
    // Verificar si el proveedor está disponible
    if (typeof window !== 'undefined' && window.ethereum) {
      const walletClient = createWalletClient({
        chain: polygonAmoy,
        transport: custom(window.ethereum)
      });

      // Solicitar acceso a la cuenta
      console.log('Por solicitar acceso')
      const [address] = await walletClient.requestAddresses();
      console.log('Solicitado: address es', address)
      if (address) {
        return { status: true, account: address };
      } else {
        console.log('address era vacio por eso llegue a este error que regresare: ErrorIndeterminado')
        return { status: false, error: 'ErrorIndeterminado' };
      }
    } else {
      return { status: false, error: 'NoWallet' };
    }
  }catch (err) {
    console.log('error de viemProcessing: ', err)
    return {status: false, error: viemErrorProcessing(err)}
  }
}

/*********************************** *********************************** *********************************** *********************************** */

type WalletClientProvider =
  | { status: true; wallet: WalletClient }
  | errorProvider

/**
 * getEthereumProvider
 */
export const getEthereumProvider = async (): Promise<ProviderResult> => {
  if (typeof window === 'undefined' || !window.ethereum) {
    return {
      status: false,
      error: 'NoWallet',
    }
  }
  const provider = window.ethereum as EthereumProvider
  try {
    const accounts = await provider.request({
      method: 'eth_requestAccounts',
    })

    if (accounts && accounts.length > 0) {
      return { status: true, account: accounts[0] }
    } else {
      return {
        status: false,
        error: 'UnknownError',
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('User rejected')) {
        return { status: false, error: 'UserRejected' }
      }
      return { status: false, error: 'UnknownError' }
    }
    return { status: false, error: 'UnknownError' }
  }
}

const getPublicClient = (): publicClientTypeResult=> {
  if (!(typeof window !== 'undefined' && window.ethereum))  return { status: false, error:'NoWallet'}
 try {
  const  publicClient= createPublicClient({
      chain: polygonAmoy,
      transport: custom(window.ethereum),
    })
    if (publicClient) return { status: true, publicClient}
    return  {status: false, error: 'ErrorIndeterminado'}
  } catch (err) {  
     return {status: false, error: viemErrorProcessing(err)}
  }
}


export const getSolvedTriviasFromContract = async (address:string) => {
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
    console.log('triviaResults', triviaResults)
    return {status: true, triviasSolved: triviaResults }
  } catch (error) {
  const result = viemErrorProcessing(error)
  console.log('viemProcessingError;', result)
  return {status: false, error: result}
  }
}

export const getTokensTriviasTTS = async (address:string) => {
  const resultViem = getPublicClient()
  if (!resultViem.status) return { status: false, error: resultViem.error }
  const publicClient = resultViem.publicClient
  const contractAbi = triviaABI

  try {
    // Leer del contrato
    const balance = await publicClient.readContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'balanceOf',
      args: [address],
    })
    console.log('balance', balance)
    return {status: true, balance: balance}
  } catch (error) {
  const result = viemErrorProcessing(error)
  console.log('viemProcessingError;', result)
  return {status: false, error: result}

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
): Promise<{status: true} | {status: false, error:string, hash?:string} > => {
  
  //logic to write to contrat
  let hash;
  try {
    const client = createWalletClient({
      chain: polygonAmoy,
      transport: custom(window.ethereum!),
    }).extend
    (publicActions) 

    const [account] = await client.getAddresses()
    const proposedSolution= triviaIndex.toString() + answers.join('')
    
    const { request } = await client.simulateContract({
      address: contractAddress,
      abi: triviaABI,
      functionName: 'scoreAnswer',
      args: [ triviaIndex, proposedSolution ],
      account
    })
      hash = await client.writeContract(request)
     console.log('hash', hash)
     const transaction = await client.waitForTransactionReceipt({ hash })
     console.log('transaction', transaction)
     return {status: true}
    
  } catch (error) {
    console.log('Error em contrato: ', error)
    const errMsg = viemErrorProcessing(error)
    console.log('err obj', errMsg)
    console.log('hash', hash)
    return {status: false, error: errMsg, hash}

  }
}

