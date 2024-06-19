import { createWalletClient, createPublicClient, custom, http } from "viem";
import { mainnet } from "viem/chains";

export const  getWalletClient = async () => {
  if (window.ethereum) {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return createWalletClient({
      account,
      chain: mainnet,
      transport: custom(window.ethereum),
    });
  } else return null;
};

// createPublicClient no necesita billetera para leer datos
// http() usa un proveedor de uso comun ( y restringido)
// http('Alchemy/Infura/etc URL link')

export const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_URL), // mi link a mainnet en alchemy
});
