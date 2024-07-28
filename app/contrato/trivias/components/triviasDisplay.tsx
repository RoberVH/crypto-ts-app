// "use client";
// /**
//  * Trivias - Obten del servidor cuales trivias ya respondio bien este usuario
//  *          presenta las restantes trivias para que las responda
//  *          Invoca al componente ShowTrivia para que cicle entre todas las
//  *          preguntas (question) y presente las opciones
//  */

'use client'
import { useState, useEffect, useCallback } from 'react'
import {
  addSolvedTriviaToContract,
} from '@/app/lib/blockchain-functions'
import ScoreTrivias from '@/app/contrato/trivias/components/scoreTrivias'
import { OptionAnswersType, solvedTriviasType } from '@/app/types/triviaTypes'
import ShowTrivia from './showTrivia'
import { Trivias } from '@/app/lib/trivias'
import PairTitleText from '@/app/ui/pairTitleText'
import {
  findNextUnsolvedTrivia,
  findPreviousUnsolvedTrivia,
} from '@/app/contrato/trivias/lib/triviaUtils'
import { toastError } from '@/app/lib/errormsg'
import WaitModal from '@/app/ui/waitModal'
import ButtonAcknowledge from '@/app/ui/button-acknowledge'
import UserInfoPromptModal from '@/app/ui/userInfopromptModal'

const MAX_TRIVIAS = Trivias.length

const TriviasDisplay = ({
  address,
}: {
  address: string | undefined
}) => {
  // we initiate Trivia index on the first one but this will be changed by ScoreTrivia component at loading time
  const [currentTriviaIndex, setCurrentTriviaIndex] = useState<number>(0)
  // solvedTrivia must have solved trivia indexes  sorted in ascending order all the time
  const [solvedTrivias, setSolvedTrivias] = useState<solvedTriviasType>([])
  // we define this to manage how many Trivias are  left to resolved, actually it comes from MAX_TRIVIAS - trivias.length
  const [unsolvedNumberTrivias, setUnsolvedNumberTrivias] = useState<number>(0)
  const [refreshTriviasSolved, setRefreshTriviasSolved] =
    useState<Boolean>(false)
  const [waiting, setWaiting] = useState<boolean>(false)
  const [prompt, setPrompt] = useState<boolean>(false)
  const [hash, setHash] = useState<string>('')
  

  
  // currentTriviaIndex is set to next Trivia when a trivia has been solved.
  // if there are no more trivias to solve
  // if only one trivia remains unsolved set it to that element
  /**
   * solvedTrivias
   *  When solvedTrivias has been updated we need to set our currentTriviaIndex to some convient value
   */

  useEffect(() => {
    if (!address) {
      return
    } // wait till there is a valid address
   
    if (!(MAX_TRIVIAS - solvedTrivias.length)) {
      setCurrentTriviaIndex(0)
      return
    } else {
      const firstUnsolvedTriviaIndex = findNextUnsolvedTrivia(0, solvedTrivias)
      setCurrentTriviaIndex(firstUnsolvedTriviaIndex)
    }
  }, [solvedTrivias, address])

  // this is called from ScoreTrivia
  const updateSolvedTrivias = useCallback(
    async (solvedTrivias: solvedTriviasType) => {
      setSolvedTrivias(solvedTrivias)
      setUnsolvedNumberTrivias(MAX_TRIVIAS - solvedTrivias.length)
      setRefreshTriviasSolved(false)
    },
    []
  )

  const assessTriviaonContract = async (
    selectedOptionsArray: OptionAnswersType,
    triviaIndex: number
  ) => {
    try {
      // Implementa la lógica para agregar la trivia resuelta al contrato
      setWaiting(true)
      const result = await addSolvedTriviaToContract(
        selectedOptionsArray,
        triviaIndex
      )
      if (!result.status) {
        if (result.hash) {
          // Tx Timeout!, inform the user
          setHash(result.hash)
          setPrompt(true)
          return
        } else toastError(result.error)
        return
      }
      // success, trigger update of score
      setRefreshTriviasSolved(true) // triggers reading trivias from contract in scoreTrivia component
    } catch (error) {
      console.error('Error al resolver la trivia:', error)
    } finally {
      setWaiting(false)
    }
  }

  const handleNextTrivia = (direction: string) => {
    switch (direction) {
      case 'back': // user wants previous Trivia
        if (currentTriviaIndex === 0) return // we're on first Trivia, no way back
        const previousTrivia = findPreviousUnsolvedTrivia(
          currentTriviaIndex - 1,
          solvedTrivias
        )
        setCurrentTriviaIndex(previousTrivia)
        break
      case 'forward':
        if (!(currentTriviaIndex < MAX_TRIVIAS - 1)) return //  no more Trivias, no way forward
        const nextTrivia = findNextUnsolvedTrivia(
          currentTriviaIndex + 1,
          solvedTrivias
        )
        setCurrentTriviaIndex(nextTrivia)
    }
  }

  if (!address)
    return (
      <div
        className="mt-8 flex mx-auto flex-col md:flex-row border-2 border-stone-300 w-[400px] md:w-[750px]  lg:w-[900px]
      rounded-md md:space-x-4 space-y-4 md:h-[350px] shadow-md justify-center items-center"
      >
        <p className="text-sm text-red-600">
          Necesita una billetera Metamask para resolver la Trivia
        </p>
      </div>
    )
  return (
    <div
      className="mt-8 flex mx-auto flex-col md:flex-row border-2 border-stone-300 w-[400px] md:w-[750px]  lg:w-[900px]
      rounded-md  space-y-4 md:h-[350px] shadow-md"
    >
      {waiting && <WaitModal message="Procesando en la Blockchain" />}
      { prompt && <>
               <UserInfoPromptModal message='Su Transaccion sigue pendiente. Revise su estado' hash={hash}>
           <ButtonAcknowledge msg="Aceptar" setFlag={setPrompt} />
         </UserInfoPromptModal>

      </>}
      {unsolvedNumberTrivias > 0 ? (
        <div
          id="panel-trivia-actual"
          className=" md:w-[750px] md:border-r-2 border-b-2 md:border-b-0 "
        >
          <ShowTrivia
            Trivia={Trivias[currentTriviaIndex]}
            handleNextTrivia={handleNextTrivia}
            assessTriviaonContract={assessTriviaonContract}
            currentTriviaIndex={currentTriviaIndex}
          />
        </div>
      ) : (
        <div className=" md:w-[750px] md:border-r-2 border-b-2 md:border-b-0 p-16" >
          <PairTitleText title="No hay Trivias sin resolver" text="" />
        </div>
      )}
      <div
        id="panel-estadisticas"
        className="w-[398px] border-stone-300  md:border-b-0 pb-4"
      >
        <ScoreTrivias
          updateSolvedTrivias={updateSolvedTrivias}
          solvedTrivias={solvedTrivias}
          refreshTriviasSolved={refreshTriviasSolved}
          address={address}
        />
      </div>
    </div>
  )
}

export default TriviasDisplay
