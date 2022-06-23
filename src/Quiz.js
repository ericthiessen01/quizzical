import React from "react"

export default function Quiz(props) {
    
    const answersHtml = props.answers.map(item => {
        return item.map(item => {
            const answersHidden = {
                backgroundColor: item.isHeld ? 
                "#D6DBF5" : 
                "#ffffff"
            }
            const answersShown = {
                backgroundColor: item.isCorrect ? 
                "#94D7A2" : 
                item.isHeld ? 
                "#F8BCBC" :
                "#ffffff"
            } 
            return (
                <li key={item.id} 
                style={props.answersChecked ? answersShown : answersHidden} 
                onClick={(e) => props.selectAnswer(e, item.id)} >
                    {decodeURIComponent(item.value)}
                </li>
            )     
        })
    })
    
    const questionsHtml = props.questions.map((item, i) => {
        return (
            <div key={item.id} className="question-container" >
                <h3>{decodeURIComponent(item.value)}</h3>
                <ul>
                    {answersHtml[i]}
                </ul>
            </div>
        )
    })
    
    return (
        <div className="container">
            {questionsHtml}
            {props.answersChecked ?
            <div className="footer" >
                <p>You scored {props.score}/5 correct answers!</p>
                <button className="btn" onClick={props.newQuestions}>New Questions</button>
            </div> :
            <div className="footer">
                <button className="btn" onClick={props.checkAnswers}>Check answers</button>
            </div>}
        </div>
    )
}