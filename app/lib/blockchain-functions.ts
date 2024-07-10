
// Get from contract the array of solved trivias for the specific funtion
//     // Implementa la lógica para leer del contrato en Polygon
//     // Retorna un array de IDs de trivias resueltas

import { resolve } from "path";
import { OptionAnswersType } from "../contrato/trivias/types/triviaTypes";

export const getSolvedTrivias = async (): Promise<number[]> => {
    // Simula una llamada API que retorna un array de números.
    
    // Crear el arreglo con números aleatorios entre 0 y 5
    const arrayLength = getRandomNumber(0, 6);
    
    // Crear el arreglo con números aleatorios entre 0 y 5
    const randomArray = Array.from({ length: arrayLength }, () => getRandomNumber(0, 5));
    
    const normalizedSet=  new Set<number>(randomArray.sort((a, b) => a - b))
    const normalizedArray = Array.from(normalizedSet)
    //return [0,1,2,3,4,5]
    return normalizedArray
}

export const addSolvedTriviaToContract = async (answers: OptionAnswersType[], triviaIndex:number): Promise<Boolean> => {
    //logic to write to contrat
    console.log(`${triviaIndex} Trivia -> ${answers}`)
    return Math.random() >= 0.5
}

// Función para generar un número aleatorio entre un mínimo y un máximo
function getRandomNumber(min:number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



