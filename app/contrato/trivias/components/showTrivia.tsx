
import {Trivia} from "@/app/contrato/trivias/types/triviaTypes"

const ShowTrivia = ({trivia}:{trivia:trivia}) => {
console.log('trivia', trivia)
    return (
        <div>
            <section>
            {
                <p>{trivia.name}</p>
                <p>{trivia.}</p>
                {
                    trivia.items.map(item =>
                        <div key={item.}>
                        <p> {item.marker}</p>
                        <p> {item.option}</p>
                        </div>
                    )

                }
                )
            }
                
            </section>
        </div>
    )

}

export default ShowTrivia