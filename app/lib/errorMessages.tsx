
interface ErrorMessages {
    [key: string]: string
  }

export const errorMessages: ErrorMessages = {
  // web3 and system errors
    "NotOwner": "Solo el dueño del contrato puede ejecutar esta función",
    "NoEnoughTimePassed": "Debe esperar un día al menos" ,
    "NoEnoughBalanceInContract":"Lo siento, ya no hay mas crypto monedas en el contrato" ,
    "NoBalanceTowithdraw": "No hay balance en el contrato",
    "ContractInactive":"El contrato ha sido desactivado" ,
    "TriviaAlreadySolved": "Ya ha resuelto esta Trivia",
    "InsufficientTokensInContract":"Ya no hay suficientes Tokens de Trivia",
    "ErrorIndeterminado":"Error indeterminado, verifique la red",
    "NoWallet":"No hallé Billetera. Instale Metamask",
    "WalletNeededToSign": "Necesita instalar Billetera para firmar",
    "NoNetworkProvider":"No pude conectarme a la red Blockchain",
    "UserRejectedRequestError":"Usuario rechazó la solicitud",
    "WaitForTransactionReceiptTimeoutError":"La transaccion tardó demasiado, sigue pendiente",
    "ContractFunctionExecutionError":"Error en la ejecución del contrato",
    "ContractFunctionRevertedError":"El Contrato rechazó la transacción",
    "NoRightNetwork":"Red Blockchain incorrecta",
    "SwitchChainError":"No pude cambiar de blockchain",
  // Aplication errors
    "incompleteAnswers":"Incompleto. Necesita contestar todas las preguntas de esta Trivia",
    "AnsweredIncorrect":"Su respuesta a la Trivia es incorrecta, vuelva a intentarlo"
}