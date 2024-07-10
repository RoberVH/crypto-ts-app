"use server";
import { createWalletClient, http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

type TransferSucces = {success: true, hash: string}
type TransferFail = {success: false, error: string}
type TransferFunction = TransferSucces | TransferFail

const client = createWalletClient({
  chain: sepolia,
  //transport: http(),
  transport: http(process.env.ALCHEMY_SEPOLIA_URL) 
})

export const transferCrypto = async (address: string): Promise<TransferFunction> => {
  const account = privateKeyToAccount(`0x${process.env.PVTE_ACCOUNT_SERVER}`);

  try {
    const hash = await client.sendTransaction({
      account,
      to: address as `0x${string}`,
      value: parseEther("0.001"),
    });
    console.log("hash", hash);
    return { success: true, hash };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    console.log("Error:", errorMessage);
    return { success: false, error: errorMessage };
  }
};
