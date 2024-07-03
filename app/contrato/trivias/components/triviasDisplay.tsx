// "use client";
// /**
//  * Trivias - Obten del servidor cuales trivias ya respondio bien este usuario
//  *          presenta las restantes trivias para que las responda
//  *          Invoca al componente ShowTrivia para que cicle entre todas las
//  *          preguntas (question) y presente las opciones
//  */

// import {
//   TriviaType,
//   TriviasType,
// } from "@/app/contrato/trivias/types/triviaTypes";
// import { Trivias } from "@/app/lib/trivias";
// import ShowTrivia from "@/app/contrato/trivias/components/showTrivia";
// import { useEffect, useState } from "react";

// const TriviasDisplay = () => {
//   const [currentTrivia, setCurrentTrivia] = useState<number>(0);
//   const [solvedTrivias, setCurrentSolvedTrivias] = useState<number[]>([]);

//   //const solvedTrivias = getSolvedTrivias(currentAddress)
//   //setCurrentSolvedTrivias()
//   useEffect(() => {}, [TriviaSolved]);

//   return (
//     <div className="mt-8 flex flex-col justify-center items-center">
//       <p>{Trivias[currentTrivia].name}</p>
//       <p>{Trivias[currentTrivia].items[0].question}</p>
//       {Trivias[currentTrivia].items[0].options.map((item) => (
//         <p>{`${item.marker} - ${item.text}`}</p>
//       ))}
//       {/* <ShowTrivia trivia={Trivias[0]} /> */}
//     </div>
//   );
// };
// export default TriviasDisplay;

"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Trivias } from "@/app/lib/trivias";
import {
  getSolvedTrivias,
  addSolvedTriviaToContract,
} from "@/app/lib/blockchain-functions";

const TriviasDisplay = () => {
  const [currentTrivia, setCurrentTrivia] = useState<number>(0);
  const [solvedTrivias, setSolvedTrivias] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Efecto para cargar las trivias resueltas inicialmente
  useEffect(() => {
    const loadSolvedTrivias = async () => {
      setIsLoading(true);
      try {
        const solved = await getSolvedTrivias();
        setSolvedTrivias(solved);
      } catch (error) {
        console.error("Error al cargar trivias resueltas:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSolvedTrivias();
    console.log("TXXT", Trivias.length, Trivias);
  }, []);

  // Función para resolver una trivia
  const solveTrivia = useCallback(async (triviaId: number) => {
    try {
      // Implementa la lógica para agregar la trivia resuelta al contrato
      await addSolvedTriviaToContract(triviaId);

      setSolvedTrivias((prev) => [...prev, triviaId]);
      // Actualiza la trivia actual si es necesario AQUI CHECAR SI PROX TRIVIA YA FUE RESUELTA
      setCurrentTrivia((current) =>
        current === triviaId ? current + 1 : current
      );
    } catch (error) {
      console.error("Error al resolver la trivia:", error);
    }
  }, []);

  // Usa useMemo para filtrar las trivias no resueltas
  //   const unsolvedTrivias = useMemo(() => {
  //     return Trivias.filter((trivia) => !solvedTrivias.includes(triviaId));
  //   }, [solvedTrivias]);

  if (isLoading) {
    return <div>Cargando trivias...</div>;
  }

  return (
    <div className="mt-8 flex  border-2 border-stone-300 m-4 rounded-sm space-x-8">
      <div id="panel-estadisticas" className="ml-4 my-4 p-2 bg-stone-100">
        <p className="font-bold text-md">Resueltas</p>
        <div className="text-sm mt-4 ml-8">
          {Boolean(solvedTrivias.length > 0) ? (
            <ul className="">
              {solvedTrivias.map((solved) => (
                <li>{`${solved + 1}. ${Trivias[solved].name}`}</li>
              ))}
            </ul>
          ) : (
            <p>No ha resuelto ninguna aun</p>
          )}
        </div>
      </div>
      <div id="panel-trivia-actual">
        <p className="font-bold text-md">{Trivias[currentTrivia].name}</p>
        <p className="my-4 italic text-sm">{Trivias[currentTrivia].items[0].question}</p>
        <div className="flex flex-col">
          {Trivias[currentTrivia].items[0].options.map((item) => (
            <p>{`${item.marker} - ${item.text}`}</p>
          ))}
          {/* <ShowTrivia trivia={unsolvedTrivias[0]} />  */}
          <p>`Resueltas: `</p>
          {Boolean(solvedTrivias.length) &&
            solvedTrivias.map((trivia, index) => (
              <p key={index}>`Id: {trivia}`</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TriviasDisplay;
