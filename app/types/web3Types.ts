import {
  Address,
  PublicClient,
} from 'viem'

export interface EthereumProvider {
  isMetaMask?: boolean
  isStatus?: boolean
  host?: string
  path?: string
  chainId?: string
  networkVersion?: string
  request: (request: { method: string; params?: Array<any> }) => Promise<any>
  send?: (
    request: { method: string; params?: Array<any> },
    callback: (error: any, response: any) => void
  ) => void
  sendAsync?: (
    request: { method: string; params?: Array<any> },
    callback: (error: any, response: any) => void
  ) => void
  enable: () => Promise<string[]>
  on?: (eventName: string, callback: (...args: any[]) => void) => void
  removeListener?: (
    eventName: string,
    callback: (...args: any[]) => void
  ) => void
  addListener?: (eventName: string, callback: (...args: any[]) => void) => void
  removeAllListeners?: (eventName?: string) => void
  isConnected: () => boolean
  selectedAddress?: string | null
}

export interface IERC20 {
  balanceOf: (address: Address) => Promise<bigint>
}
export type errorProvider = {
  status: false
  error: string
}

export type ProviderResult = { status: true; account: string } | errorProvider
export type publicClientTypeResult =
  | { status: true; publicClient: PublicClient }
  | errorProvider

export type TransferSucces = { status: true; hash: string }
export type TransferFail = { status: false; error: string }

export type TransferFunction = TransferSucces | TransferFail

export type AccountResponse = {  status: true,   account: string} | { status: false,   error: string}

export type generalFunctioResponse = {status: true} | { status: false,   error: string}

