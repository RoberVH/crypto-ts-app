"use client";
import {
  solvedTriviasType,
} from "@/app/contrato/trivias/types/triviaTypes";

import { Trivias } from "@/app/lib/trivias";

import {
  getSolvedTrivias,
  addSolvedTriviaToContract,
} from "@/app/lib/blockchain-functions";

import { useEffect } from "react";
import PairTitleText from "@/app/ui/pairTitleText";

export default function ScoreTrivias({
  updateSolvedTrivias,
  solvedTrivias,
  refreshTriviasSolved
}: {
  updateSolvedTrivias: (solvedTrivias: solvedTriviasType) => void,
  solvedTrivias: solvedTriviasType,
  refreshTriviasSolved: Boolean
}) {
  useEffect(() => {
    const loadSolvedTrivias = async () => {
      try {
        const solvedTrivias = await getSolvedTrivias(); // get the array with Trivias indexes already solved
        updateSolvedTrivias(solvedTrivias);
        //const currentTokens = await getCurrentTokens()
      } catch (error) {
        console.error("Error al cargar trivias resueltas:", error);
      }
    };
    loadSolvedTrivias();
  }, [refreshTriviasSolved]);

  return (
    <div id="score-trivia" className="h-full  p-2 ">
      <p className="font-bold text-md">Resueltas</p>
      <div className="text-sm mt-4 ml-8 h-full bg-stone-100">
        {Boolean(solvedTrivias.length > 0) ? (
          <div className="flex flex-col  justify-between">
            <div>
              <ul className="">
                {solvedTrivias.map((solved, idx) => (
                  <li key={idx}>{`${solved + 1 }. ${Trivias[solved].name}`}</li>
                ))}
              </ul>
            </div>
            <div className="">
              <PairTitleText title="Tokens:" text={`${" "} CIB Tokens`} />
            </div>
          </div>
        ) : (
          <p>No ha resuelto ninguna aun</p>
        )}
      </div>
    </div>
  );
}
