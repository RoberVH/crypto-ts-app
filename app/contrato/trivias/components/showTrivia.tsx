import {
  TriviaType,
  OptionAnswerType,
  OptionAnswersType,
} from '@/app/types/triviaTypes'
import { toastError } from '@/app/lib/errormsg'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

const MAX_QUESTIONS = 5
const MAX_ANSWERS = 5
type SelectedOptionsType = { [index: number]: OptionAnswerType }

const ShowTrivia = ({
  Trivia,
  handleNextTrivia,
  assessTriviaonContract,
  currentTriviaIndex,
}: {
  Trivia: TriviaType
  handleNextTrivia: (direction: string) => void
  assessTriviaonContract: (
    selectedOptionsArray: OptionAnswersType,
    indexTrivia: number
  ) => void
  currentTriviaIndex: number
}) => {
  const [currentQuestionIdx, setCurrentQuestion] = useState<number>(0)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionsType>(
    {}
  )

  // When user move from Trivia reset Question Id to first one and clear selected options
  useEffect(() => {
    setCurrentQuestion(0)
    setSelectedOptions([])
  }, [Trivia.name])

  const handleOptionChange = (optionIndex: OptionAnswerType) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestionIdx]: optionIndex,
    })
  }

  const checkAnswers = async () => {
    const numberofAnsweredQuestions = Object.keys(selectedOptions).length
    if (numberofAnsweredQuestions < MAX_ANSWERS) {
      toastError('incompleteAnswers')
      return
    }
    const answeredOptions: OptionAnswersType = Array(MAX_ANSWERS).fill(null)

    Object.keys(selectedOptions).forEach((key) => {
      const numKey = Number(key)
      answeredOptions[numKey] = selectedOptions[numKey] as OptionAnswerType
    })
    assessTriviaonContract(answeredOptions, currentTriviaIndex)
  }

  const handleNextQuestion = (direction: string) => {
    switch (direction) {
      case 'back':
        if (currentQuestionIdx === 0) return
        setCurrentQuestion((prev) => prev - 1)
        break
      case 'forward':
        if (!(currentQuestionIdx < MAX_QUESTIONS - 1)) return
        setCurrentQuestion((prev) => prev + 1)
    }
  }

  function SendTriviaToBlockchainButton() {
    return (
      <button className="button-command-small px-2 py-1" onClick={checkAnswers}>
        Enviar
      </button>
    )
  }

  return (
    <div id="panel-Trivia" className=" flex justify-center">
      <div className="w-full">
        <p className=" text-sm text-center mb-4 mt-2">
          {currentTriviaIndex + 1}. {Trivia.name}
        </p>
        <div className="text-md pb-2">
          <ArrowControls
            handleMovement={handleNextTrivia}
            iconLeft="⇠"
            iconRight="⇢"
            tooltipMovement="Trivia"
            addinlClass="text-2xl bg-green-200 rounded-2xl px-2 text-center"
          />
        </div>
        <div className="h-[200px]">
          <div className="px-2 text-[13px] flex mt-2">
            <label>{currentQuestionIdx + 1}.</label>
            <label className="ml-2">
              {Trivia.items[currentQuestionIdx].question}
            </label>
          </div>
          <div className="flex flex-col my-4 space-y-2 ml-8 text-sm mb-8 ">
            {Trivia.items[currentQuestionIdx].options.map((item) => (
              <label
                key={item.index}
                className="italic text-sm flex items-start items-center space-x-2"
              >
                <input
                  type="radio"
                  name={`option-${currentQuestionIdx}`}
                  value={item.index}
                  checked={selectedOptions[currentQuestionIdx] === item.index}
                  onChange={() =>
                    handleOptionChange(item.index as OptionAnswerType)
                  }
                  className="mt-1"
                />
                <span className="leading-tight text-xs">
                  {' '}
                  {` ${item.index}. ${item.text}`}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <ArrowControls
            handleMovement={handleNextQuestion}
            iconLeft="←"
            iconRight="➝"
            tooltipMovement="Pregunta"
            addinlClass="text-2xl bg-blue-100 text-green-600 rounded-2xl text-center px-2"
          >
            <SendTriviaToBlockchainButton />
          </ArrowControls>
        </div>
      </div>
    </div>
  )
}

function ArrowControls({
  handleMovement,
  iconLeft,
  iconRight,
  tooltipMovement,
  addinlClass,
  children,
}: {
  handleMovement: (direction: string) => void
  iconLeft: string
  iconRight: string
  tooltipMovement: string
  addinlClass: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex justify-between items-center ">
      <button
        className={clsx(addinlClass, 'pb-1 ml-4')}
        onClick={() => handleMovement('back')}
        title={`${tooltipMovement} Anterior`}
      >
        {' '}
        {iconLeft}{' '}
      </button>
      {children}
      <button
        className={clsx(addinlClass, 'pb-1 mr-4 ')}
        onClick={() => handleMovement('forward')}
        title={`Próxima ${tooltipMovement}`}
      >
        {' '}
        {iconRight}{' '}
      </button>
    </div>
  )
}

export default ShowTrivia
