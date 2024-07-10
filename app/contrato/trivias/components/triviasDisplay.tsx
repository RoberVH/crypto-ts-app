// "use client";
// /**
//  * Trivias - Obten del servidor cuales trivias ya respondio bien este usuario
//  *          presenta las restantes trivias para que las responda
//  *          Invoca al componente ShowTrivia para que cicle entre todas las
//  *          preguntas (question) y presente las opciones
//  */

"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { addSolvedTriviaToContract } from "@/app/lib/blockchain-functions";
import ScoreTrivias from "@/app/contrato/trivias/components/scoreTrivias";
import {
  OptionAnswersType,
  solvedTriviasType,
} from "@/app/contrato/trivias/types/triviaTypes";
import ShowTrivia from "./showTrivia";
import { Trivias } from "@/app/lib/trivias";
import PairTitleText from "@/app/ui/pairTitleText";
import {
  findNextUnsolvedTrivia,
  findPreviousUnsolvedTrivia,
} from "@/app/contrato/trivias/lib/triviaUtils";

const MAX_TRIVIAS = Trivias.length;

const TriviasDisplay = () => {
  // we initiate Trivia index on the first one but this will be changed by ScoreTrivia component at loading time
  const [currentTriviaIndex, setCurrentTriviaIndex] = useState<number>(0);
  // solvedTrivia must have solved trivia indexes  sorted in ascending order all the time
  const [solvedTrivias, setSolvedTrivias] = useState<solvedTriviasType>([]);
  // we define this to manage how many Trivias are  left to resolved, actually it comes from MAX_TRIVIAS - trivias.length
  const [unsolvedNumberTrivias, setUnsolvedNumberTrivias] = useState<number>(0);
  const [refreshTriviasSolved, setRefreshTriviasSolved] =
    useState<Boolean>(false);

 

  // currentTriviaIndex is set to next Trivia when a trivia has been solved.
  // if there are no more trivias to solve
  // if only one trivia remains unsolved set it to that element
  /**
   * solvedTrivias
   *  When solvedTrivias has been updated we need to set our currentTriviaIndex to some convient value
   */
  useEffect(() => {
    if (!(MAX_TRIVIAS - solvedTrivias.length)) {
      setCurrentTriviaIndex(0);
      return;
    } else {
      const firstUnsolvedTriviaIndex = findNextUnsolvedTrivia(0, solvedTrivias);
      setCurrentTriviaIndex(firstUnsolvedTriviaIndex);
    }
  }, [solvedTrivias]);

  // this is called from ScoreTrivia
  const updateSolvedTrivias = useCallback(
    async (solvedTrivias: solvedTriviasType) => {
      setSolvedTrivias(solvedTrivias);
      setUnsolvedNumberTrivias(MAX_TRIVIAS - solvedTrivias.length);
      setRefreshTriviasSolved(false);
    },
    []
  );

  // Función para resolver una trivia
  const assessTrivia = useCallback(
    async (selectedOptionsArray: OptionAnswersType[], triviaIndex:number) => {
      try {
        // Implementa la lógica para agregar la trivia resuelta al contrato
        const result = await addSolvedTriviaToContract(selectedOptionsArray, currentTriviaIndex)
        console.log('Resultado:', result)

        setSolvedTrivias((prev) => [...prev, currentTriviaIndex]);
        // Actualiza la trivia actual si es necesario AQUI CHECAR SI PROX TRIVIA YA FUE RESUELTA

      } catch (error) {
        console.error("Error al resolver la trivia:", error);
      }
    },
    []
  );

  // Usa useMemo para filtrar las trivias no resueltas
  //   const unsolvedTrivias = useMemo(() => {
  //     return Trivias.filter((trivia) => !solvedTrivias.includes(triviaId));
  //   }, [solvedTrivias]);

  const handleNextTrivia = (direction: string) => {
    switch (direction) {
      case "back": // user wants previous Trivia
        if (currentTriviaIndex === 0) return; // we're on first Trivia, no way back
        const previousTrivia = findPreviousUnsolvedTrivia(
          currentTriviaIndex - 1,
          solvedTrivias
        );
        setCurrentTriviaIndex(previousTrivia);
        break;
      case "forward":
        if (!(currentTriviaIndex < MAX_TRIVIAS - 1)) return; //  no more Trivias, no way forward
        const nextTrivia = findNextUnsolvedTrivia(
          currentTriviaIndex + 1,
          solvedTrivias
        );
        setCurrentTriviaIndex(nextTrivia);
    }
  };

  return (
    <div className="mt-8 flex flex-col md:flex-row border-2 border-stone-300
     m-4 rounded-sm md:space-x-4 space-y-4 md:h-[300px] ">
      <div id="panel-estadisticas" className="ml-4  p-2 w-[300px]">
        <ScoreTrivias
          updateSolvedTrivias={updateSolvedTrivias}
          solvedTrivias={solvedTrivias}
          refreshTriviasSolved={refreshTriviasSolved}
        />
      </div>
      {unsolvedNumberTrivias > 0 ? (
        <div id="panel-trivia-actual" className="w-[300px] md:w-[800px] ">
          <ShowTrivia
            Trivia={Trivias[currentTriviaIndex]}
            handleNextTrivia={handleNextTrivia}
            assessTrivia={assessTrivia}
            currentTriviaIndex={currentTriviaIndex}
          />
        </div>
      ) : (
        <div>
          <PairTitleText title="No hay mas Trivias sin resolver" text="" />
        </div>
      )}
      <div>
        <button
          className="border border-blue-500"
          onClick={() => setRefreshTriviasSolved(true)}
        >
          Simula set solucionado
        </button>
      </div>
    </div>
  );
};

export default TriviasDisplay;
