// Function to process an error returned by a viem library function call
import { BaseError, ContractFunctionRevertedError } from 'viem'

// function viemErrorProcessing(err: any) : string{
//   if (err instanceof BaseError) {
//     const revertError = err.walk(
//       (err) => err instanceof ContractFunctionRevertedError
//     )
//     if (revertError instanceof ContractFunctionRevertedError) {
//       const errorName = revertError.data?.errorName ?? ''
//       // do something with `errorName`
//       return errorName
//     }
//   }
//   //couldn't determine what error was
//   return  'ErrorIndeterminado'
// }

function viemErrorProcessing(err: unknown): string {
  if (err instanceof BaseError) {
    // treat all instances of ContractFunctionRevertedError
    const revertError = err.walk(
      (e) => e instanceof ContractFunctionRevertedError
    )
    if (revertError instanceof ContractFunctionRevertedError) {
      const errorName = revertError.data?.errorName ?? ''
      return errorName
    }

    // Other types of error return the name of the error (InsufficientFundsError, WaitForTransactionReceiptTimeoutError, UserRejectedRequestError etc.)
    return err.constructor.name
  }

  // Not instance of BaseError? return the name instance
  if (err instanceof Error) {
    return err.name
  }

  // For everithing else 
  return 'ErrorIndeterminado'
}

export default viemErrorProcessing
