import {
  TriviaType,
  OptionAnswerType,
  OptionAnswersType,
} from "@/app/contrato/trivias/types/triviaTypes";
import { toastError } from "@/app/lib/errormsg";
import { Trivias } from "@/app/lib/trivias";
import {
  Children,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const MAX_QUESTIONS = 5;
const MAX_ANSWERS = 5;

const ShowTrivia = ({
  Trivia,
  handleNextTrivia,
  assessTrivia,
  currentTriviaIndex
}: {
  Trivia: TriviaType;
  handleNextTrivia: (direction: string) => void;
  assessTrivia: (selectedOptionsArray: OptionAnswersType[]) => void;
  currentTriviaIndex: number
}) => {
  const [currentQuestionIdx, setCurrentQuestion] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<OptionAnswersType>([]);

  // When user move from Trivia reset Question Id to first one and clear selected options
  useEffect(() => {
    setCurrentQuestion(0);
    setSelectedOptions([]);
  }, [Trivia.name]);

  const handleOptionChange = (optionIndex: OptionAnswerType) => {
    // console.log(
    //   "%cAnswer: %s %s",
    //   "color: red;",
    //   currentQuestionIdx,
    //   optionIndex
    // );
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestionIdx]: optionIndex,
    });
  };

  const checkAnswers = async () => {
    const numberofAnsweredQuestions = Object.keys(selectedOptions).length;
    if (numberofAnsweredQuestions < MAX_ANSWERS) {
      toastError(
        "Incompleto. Necesita contestar todas las preguntas de esta Trivia"
      );
      return;
    }
    const options = Array<OptionAnswerType>(MAX_ANSWERS);
    Object.keys(selectedOptions).forEach((key) => {
      const numKey = Number(key);
      options[numKey] = selectedOptions[numKey];
    });
    assessTrivia(options, currentTriviaIndex)
  };

  const handleNextQuestion = (direction: string) => {
    switch (direction) {
      case "back":
        if (currentQuestionIdx === 0) return;
        setCurrentQuestion((prev) => prev - 1);
        break;
      case "forward":
        if (!(currentQuestionIdx < MAX_QUESTIONS - 1)) return;
        setCurrentQuestion((prev) => prev + 1);
    }
  };

  return (
    <div id="panel-Trivia" className=" bg-stone-300 border-2 border-orange-300">
      <p className="font-bold text-md text-center bg-blue-200">{currentTriviaIndex + 1}. {Trivia.name}</p>
      <div className="text-md">
        <ArrowControls
          handleMovement={handleNextTrivia}
          iconLeft="ᐊ"
          iconRight="ᐅ"
          tooltipMovement="Trivia"
        />
        <p className="px-2">{currentQuestionIdx + 1}. {Trivia.items[currentQuestionIdx].question}</p>
      </div>
      <div className="flex flex-col my-4 space-y-2 ml-8">
        {Trivia.items[currentQuestionIdx].options.map((item) => (
          <label key={item.index} className="italic text-sm">
            <input
              type="radio"
              name={`option-${currentQuestionIdx}`}
              value={item.index}
              checked={selectedOptions[currentQuestionIdx] === item.index}
              onChange={() =>
                handleOptionChange(item.index as OptionAnswerType)
              }
            />
            {` ${item.index}. ${item.text}`}
          </label>
        ))}
      </div>
      <ArrowControls
        handleMovement={handleNextQuestion}
        iconLeft="🠔"
        iconRight="➝"
        tooltipMovement="Pregunta"
      />
      <button className="mt-4 border border-blue-200" onClick={checkAnswers}>
        Evaluar Respuestas
      </button>
    </div>
  );
};

function ArrowControls({
  handleMovement,
  iconLeft,
  iconRight,
  tooltipMovement,
}: {
  handleMovement: (direction: string) => void;
  iconLeft: string;
  iconRight: string;
  tooltipMovement: string;
}) {
  return (
    <div className="flex justify-between ">
      <button
        className="pl-4"
        onClick={() => handleMovement("back")}
        title={`${tooltipMovement} Anterior`}
      >
        {" "}
        {iconLeft}{" "}
      </button>

      <button
        className="pr-4 "
        onClick={() => handleMovement("forward")}
        title={`Próxima ${tooltipMovement}`}
      >
        {" "}
        {iconRight}{" "}
      </button>
    </div>
  );
}

export default ShowTrivia;
