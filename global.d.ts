
import { EthereumProvider } from '@/app/types/web3Types'

declare global {
  interface Window {
    ethereum?: EthereumProvider
  }

type SetterFunction<T> = React.Dispatch<React.SetStateAction<T>>
}

// Esto es necesario para que TypeScript trate este archivo como un módulo
export {}