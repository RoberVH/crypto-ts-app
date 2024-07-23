
 
/**
 * ButtonAcknowledge
 * @param msg: string - text to display on button
 *        setFlag: function - setting function to turn true flag 
 * @returns 
 */

 function ButtonAcknowledge ({msg, setFlag}:{msg: string , setFlag: (flag: boolean) => void}) {
    return (
      <button
        onClick={() => setFlag(false)}
        className="button-command mt-8"
      >
        {msg}
      </button>
    )
  }

  export default ButtonAcknowledge