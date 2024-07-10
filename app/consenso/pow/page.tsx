"use client";
import { useState } from "react";
import InputArea from "@/app/consenso/pow/components/InputArea";
import { keccak256, toBytes } from "viem";
import { spacemono } from "@/app/ui/fonts";
import PairTitleText from "@/app/ui/pairTitleText";
import { toastError } from "@/app/lib/errormsg";
import WaitModal from "@/app/ui/waitModal";

export default function PoWPage() {
  const [hash, setHash] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [nounce, setNounce] = useState<string>("0");
  const [busy, setBusy] = useState<Boolean>(false);
  const [nounceTried, setNounceTried] = useState<number>(0);

  const calculeHash = async (input: string) => {
    setNounce("");
    if (input.length === 0) {
      setHash("");
      return;
    }
    const hexValue = toBytes(input);
    const hash = keccak256(hexValue);
    setHash(hash);
    setInput(input);
  };


  const getNounce = async () => {
    let hash2;
    setBusy(true);

    for (let i = 0; i <= 1_000_000; i++) {
        setNounceTried(i)
      const pow = input + i.toString();
      const hexValue = toBytes(pow);
      hash2 = keccak256(hexValue);
      if (hash2.slice(2, 6) === "0000") {
        setHash(hash2);
        setNounce(i.toString());
        setBusy(false);
        return;
      }

      if (i % 500 === 0) {
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }

    setBusy(false);
    toastError("No se pudo hallar nounce en el rango de 1 a 1 millón");
  };


  //2do try
  //   const getNounce = () => {
//     let hash2;
//     setBusy(true);
//     const findNounce = (i: number) => {
//       if (i > 1_000_000) {
//         setBusy(false);
//         toastError("No se pudo hallar nounce en el rango de 1 a 1 millón");
//         return;
//       }

//       const pow = input + i.toString();
//       const hexValue = toBytes(pow);
//       hash2 = keccak256(hexValue);
//       if (hash2.slice(2, 6) === "000") {
//         setHash(hash2);
//         setNounce(i.toString());
//         setBusy(false);
//         return;
//       }

//       if (i % 500 === 0) {
//         setNounceTried(i)
//         // Deja que el navegador procese otras tareas
//         setTimeout(() => findNounce(i + 1), 0);
//       } else {
//         findNounce(i + 1);
//       }
//     };

//     findNounce(0);
//   };

// 1er try
//   const getNounce = () => {
//     let hash2;
//     setBusy(true);
//     for (let i = 0; i <= 1_000_000; i++) {
//       const pow = input + i.toString();
//       const hexValue = toBytes(pow);
//       hash2 = keccak256(hexValue);
//       if (hash2.slice(2, 6) === "0000") {
//         setHash(hash2);
//         setNounce(i.toString());
//         setBusy(false);
//         return;
//       }
//     }
//     setBusy(false);
//     toastError("No se pudo hallar nounce en el rango de 1 a 1 millón");
//   };

  return (
    <div className="flex flex-col  my-16 ml-8 border border-slate-300 p-4 mx-4 space-y-6 rounded-md">
      {busy && <WaitModal message={`Resolviendo PoW Intentando el Nounce ${nounceTried}`} />}
      <InputArea calculeHash={calculeHash} />
      <div className="flex items-center space-x-8 mt-8 text-slate-500 ">
        <PairTitleText title="Nounce:" text={nounce} />
      </div>
      <div className="flex space-x-4">
        <p className="font-bold">HASH:</p>
        <p
          className={`${
            spacemono.className
          }  border w-[10rem] md:w-[45rem] h-12 break-words  flex items-center justify-center ${
            hash.slice(2, 6) === "0000" ? "bg-green-300" : "bg-red-200"
          }`}
        >
          {hash}
        </p>
        <button
          className="button-command-small"
          onClick={getNounce}
          disabled={!hash.length}
        >
          {" "}
          Calcular PoW
        </button>
      </div>
    </div>
  );
}
