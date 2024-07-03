
// Trivia Types to manage the Trivias Json Var with trivias on /app/lib/trivias.ts  

// An option compresive of index (A, B, C and D) and option text
export interface Option {
    index: string,
    text:string
}

//A question with their available options to chose from
export interface Item {
    question:  string,
    options: Option[]
}


// One Trivia from the Array of all trivias
export interface TriviaType {
    name:string,
    items: Item[]
}

// Array of all  available trivias on DB
export interface TriviasType { 
    TriviasType: TriviaType[]
}