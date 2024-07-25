
import { EthereumProvider } from '@/app/types/web3Types'

declare global {
  interface Window {
    ethereum?: EthereumProvider
  }

type SetterFunction<T> = React.Dispatch<React.SetStateAction<T>>
}

// This is necessary for TypeScript to treat this file as a module
export {}