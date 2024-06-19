import { createWalletClient, custom } from "viem";
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


