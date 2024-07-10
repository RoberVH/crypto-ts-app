"use client";
import { toastError } from "@/app/lib/errormsg";

import { createWalletClient, custom } from "viem";
import { sepolia } from "viem/chains";
import PairTitleText from "@/app/ui/pairTitleText";
import { useState } from "react";
import { transferCrypto } from "@/app/lib/server-actions/transfer-crypto";
import { toastSuccess } from "@/app/lib/successmsg";

function FaucetPage() {
  const [userAddress, setUserAddress] = useState<string>("");

  const getAddressforFaucet = async () => {
    let walletClient, account;
    try {
      if (window.ethereum) {
        [account] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        walletClient = createWalletClient({
          account,
          chain: sepolia,
          transport: custom(window.ethereum),
        });
      } else walletClient = undefined;
      if (!walletClient) {
        toastError("No hallé Billetera. Instale Metamask");
        return "";
      } else return account;
    } catch (error: any) {
      console.log("[Error]:", error);
      toastError(error.message);
    }
  };

  const sendEthers = async () => {
    const addressToSend = await getAddressforFaucet();
    setUserAddress(addressToSend);
  };

  const sendCrypto = async () => {
      const result = await transferCrypto(userAddress)
      if (result.success) {
          toastSuccess('0.001 Ethers transferidos. Espere unos minutos a que se refleje el saldo')
    } else toastError(result.error)

  }

  return (
    <div className="flex m-16  ">
      <div className="flex flex-col w-[800px] space-y-16 p-8 border-2  rounded-md bg-stone-100">
        <label className="text-md font-bold">
          {`Solicite Ethers de Pruebas...  (0.001 Ethers)`}
        </label>
        <div className="flex flex-col justify-start space-y-8">
          <div>
            <button onClick={sendEthers} className="button-command">
              Obtener Cuenta
            </button>
          </div>
          {userAddress && (
            <div className="flex flex-col space-y-8 justify-start">
              <label className="text-md underline">{`Cuenta: ${userAddress}`}</label>
              <div>
              <button onClick={sendCrypto} className="button-command-small">Dame Ethers</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default FaucetPage;
