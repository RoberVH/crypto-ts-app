import { createPublicClient, createWalletClient, http, custom } from "viem";
import { sepolia, polygonAmoy } from "viem/chains";

// Ethereum Window provider wallet (metamask)
export const  getWalletClient = async () => {
  if (window.ethereum) {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return createWalletClient({
      account,
      chain: polygonAmoy,
      transport: custom(window.ethereum),
    });
  } else return null;
};


// Viem objects

export const publicClient = createPublicClient({
  chain: polygonAmoy,
  transport: http(process.env.ALCHEMY_AMOY_URL),
})
 
