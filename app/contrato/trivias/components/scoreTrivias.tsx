'use client'
import { solvedTriviasType } from '@/app/types/triviaTypes'

import { Trivias } from '@/app/lib/trivias'

import {
  getSolvedTriviasFromContract,
  getTokensTriviasTTS,
} from '@/app/lib/blockchain-functions'

import { useEffect, useState } from 'react'
import { contractAddress } from '@/app/lib/contractAddres'
import PairTitleText from '@/app/ui/pairTitleText'
import { toastError } from '@/app/lib/errormsg'
import { formatUnits } from 'viem'

export default function ScoreTrivias({
  updateSolvedTrivias,
  solvedTrivias,
  refreshTriviasSolved,
  address,
}: {
  updateSolvedTrivias: (solvedTrivias: solvedTriviasType) => void
  solvedTrivias: solvedTriviasType
  refreshTriviasSolved: Boolean
  address: string
}) {
  const [tokens, setTokens] = useState<number>(0)
  // Read from    contract solved Trivias to updated parents solvedTrivias through updateSolvedTrivias
  useEffect(() => {
    const loadSolvedTrivias = async () => {
      try {
        const results = await Promise.all([
          getSolvedTriviasFromContract(address),
          getTokensTriviasTTS(address),
        ])
        if (results[0].status && results[1].status) {
          updateSolvedTrivias(results[0].triviasSolved as solvedTriviasType)

          // Receive a BigInt on balance
          const balanceBigNumber: bigint = results[1].balance as bigint
          const formattedBalance = formatUnits(balanceBigNumber, 18)
          const balanceAsNumber = parseFloat(formattedBalance)
          setTokens(balanceAsNumber)
          return
        }
        if (results[0].status && results[0].error) toastError(results[0].error)
        if (results[1].status && results[1].error) toastError(results[1].error)
      } catch (error) {}
    }
    loadSolvedTrivias()
  }, [refreshTriviasSolved])

  return (
    <div id="score-trivia" className="  h-[80%]">
      <div className="text-xs mt-4 ">
        <p className="mb-2 text-sm font-semibold mb-4 border-b-2 pl-2 pb-2 md:pb-4">Tu Score:</p>
      <div className="ml-4">
        <PairTitleText title="Tokens: " text={`${tokens} tokens`} />
        <PairTitleText title="Contrato: " text={contractAddress} />

        <p className="font-semibold text-xs my-2 md:my-4">Trivias Resueltas:</p>
        {Boolean(solvedTrivias.length > 0) ? (
          <div className="mt-2 md:mt-4">
            <div>
              <ul className="ml-2 text-xs md:space-y-2">
                {solvedTrivias
                  .sort((a, b) => a - b)
                  .map((solved, idx) => (
                    <li
                      key={idx}
                    >{`${solved + 1}. ${Trivias[solved].name}`}</li>
                  ))}
              </ul>
            </div>
            <div className="text-xs "></div>
          </div>
        ) : (
          <p className="text-center font-semibold text-red-600">
            - Ninguna Trivia resuelta todavía -
          </p>
        )}
        </div>
      </div>
    </div>
  )
}
