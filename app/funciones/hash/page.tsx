"use client";
import { useState } from "react";
import InputArea from "@/app/funciones/hash/components/InputArea";
import { keccak256, toBytes } from "viem";
import { spacemono } from "@/app/ui/fonts";

export default function HashPage() {
  const [hash, setHash] = useState<string>("");

  const calculeHash = async (input: string) => {
    if (input.length === 0) {
      setHash("");
      return;
    }
    const hexValue = toBytes(input);
    const hash = keccak256(hexValue);
    setHash(hash);
  };

  return (
    <div className="flex flex-col  my-16 ml-8 border border-slate-300 p-4 mx-4 rounded-md">
      <InputArea calculeHash={calculeHash} />
      <div className="flex items-center space-x-8 mt-8 text-slate-500 ">
        <p className="font-bold">HASH:</p>
        <p
          className={`${spacemono.className}  border w-[10rem] md:w-[45rem] h-12 break-words  flex items-center justify-center`}
        >
          {hash}
        </p>
      </div>
    </div>
  );
}
