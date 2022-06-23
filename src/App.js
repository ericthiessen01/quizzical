import React from "react"
import Start from "./Start"
import Quiz from "./Quiz"
import { nanoid } from "nanoid"

export default function App() {
    const [questions, setQuestions] = React.useState([])
    const [answers, setAnswers] = React.useState([])
    const [gameIteration, setGameIteration] = React.useState(0)
    const [gameStarted, setGameStarted] = React.useState(false)
    const [score, setScore] = React.useState(0)
    const [answersChecked, setAnswersChecked] = React.useState(false)

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple&encode=url3986")
        .then(response => response.json())
        .then(data => {
            return setQuestions(() => data.results.map(item => {
                return {
                    value: item.question,
                    id: nanoid()
                }
            })),
            setAnswers(() => data.results.map(item => {
                const incorrectAnswersArr = item.incorrect_answers.map(item => ({
                    value: item, id: nanoid(), isHeld: false
                }))
                const correctAnswer = {value: item.correct_answer, id: nanoid(), isHeld: false, isCorrect: true}
                const randomIndex = Math.floor(Math.random() * 4)
                const allAnswersArr = incorrectAnswersArr
                allAnswersArr.splice(randomIndex, 0, correctAnswer)
                return allAnswersArr
            }))
        })
    }, [gameIteration])
    
    function selectAnswer(event, id) {
        setAnswers(prevState => prevState.map(item => {
            const targetItem = item.find(e => e.id === id)
            if (item.includes(targetItem)) 
                return item.map(obj => {
                    return obj.id === id ? 
                    {...obj, isHeld: !obj.isHeld} :
                    {...obj, isHeld: false}
            })
            else {
                return item
            }
        }))
    }
    
    function checkAnswers() {
        setAnswersChecked(true)
        answers.map(subarray => {
            return subarray.map(answer => {
                if (answer.isHeld && answer.isCorrect) {
                    setScore(prevState => prevState + 1)
                }
            })
        })
    }

    // add feature to show # of rounds played and total score + score for each round
    function newQuestions() {
        setGameIteration(prevState => prevState + 1)
        setScore(0)
        setAnswersChecked(false)
    }
    
    function startGame() {
        setGameStarted(true)
    }
    
    return (
        <div>
            {gameStarted ? 
            <Quiz questions={questions}
                answers={answers}
                score={score}
                selectAnswer={selectAnswer}
                newQuestions={newQuestions}
                checkAnswers={checkAnswers}
                answersChecked={answersChecked} /> : 
            <Start startGame={startGame} />}
        </div>
    )
}