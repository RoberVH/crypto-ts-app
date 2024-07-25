// Function to process an error returned by a viem library function call
import { BaseError, ContractFunctionRevertedError, TransactionExecutionError } from 'viem'


function viemErrorProcessing(err: unknown): string {
  if (err instanceof BaseError) {
    // treatment for  ContractFunctionRevertedError errors
    const revertError = err.walk(
      (e) => e instanceof ContractFunctionRevertedError
    );
    if (revertError instanceof ContractFunctionRevertedError) {
      const errorName = revertError.data?.errorName ?? '';
      return errorName || 'ContractFunctionRevertedError';
    }

    // tratment for TransactionExecutionError (for example if user reject transaction in metamask)
    if (err instanceof TransactionExecutionError) {
      // Si hay una causa, devolver el nombre de la causa
      if (err.cause instanceof Error) {
        return err.cause.constructor.name;
      }
      // Si no hay causa, devolver TransactionExecutionError
      return 'TransactionExecutionError';
    }

    // other  BaseError type of errors
    return err.constructor.name;
  }

  // if not a BaseError tpye them check for regular error
  if (err instanceof Error) {
    return err.name;
  }

  // everything else failed, tell error couldn't be determined
  return 'ErrorIndeterminado';
}

export default viemErrorProcessing
