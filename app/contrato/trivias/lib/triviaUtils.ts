import {
  OptionAnswersType,
  solvedTriviasType,
  TriviasType,
} from "@/app/contrato/trivias/types/triviaTypes";
import { Trivias } from "@/app/lib/trivias";

/**
 * getValidCurrentIndexTrivia
 *  Validate  if proposed next Trivia currentindex is still not solved (not in solvedTrivia number array)
/   set and return  intendedIndex  next available  upper trivia or -1 if non
 * @param intendedIndex  Proposed next index for Trivias
 * @param solvedTrivias Array of solvedTrivias Indexes
 * @returns Next Trivia index  or -1 if non available
 */

const MAX_TRIVIAS = Trivias.length;

/**
 * findPreviousUnsolvedTrivia
 *      Search from current intendedIndex down to find next unsolved Trivia on solvedTrivias array
 */
export function findPreviousUnsolvedTrivia(
  intendedIndex: number,
  solvedTrivias: solvedTriviasType
): number {
  if (intendedIndex < 0) return 0; // nothing to do
  for (let i = intendedIndex; i >= 0; i--) {
    console.log("i", i);
    if (!solvedTrivias.includes(i)) {
      return i;
    }
  }
  return intendedIndex + 1; // returns same index as we can do nothing (compensate for original - 1)
}

/**
 * findNextUnsolvedTrivia
 *      Search from current intendedIndex up to find next unsolved Trivia on solvedTrivias array
 */
export function findNextUnsolvedTrivia(
  intendedIndex: number,
  solvedTrivias: solvedTriviasType
): number {
  if (intendedIndex >= MAX_TRIVIAS) return 0; // nothing to do
  for (let i = intendedIndex; i <= MAX_TRIVIAS - 1; i++) {
    if (!solvedTrivias.includes(i)) {
      return i;
    }
  }
  return intendedIndex -  1; // returns same index as we can do nothing (compensate for original +  1)
}
