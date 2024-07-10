
// Trivia Types to manage the Trivias Json Var with trivias on /app/lib/trivias.ts  

// An option compresive of index (A, B, C and D) and option text
export type Option = {
    index: string,
    text:string
}

//A question with their available options to chose from
export type Item = {
    question:  string,
    options: Option[]
}


// One Trivia from the Array of all trivias
export type TriviaType = {
    name:string,
    items: Item[]
}

// Array of all  available trivias on DB
export type TriviasType =  TriviaType[]


// Array of solved Trivias
export type solvedTriviasType = number[]

// Valid answers for a Trivia:
export type OptionAnswerType = 'A' | 'B' | 'C' | 'D'

// Valid answers Type for Trivias, an array with only option index A to D allowed 
export type OptionAnswersType = OptionAnswerType[]