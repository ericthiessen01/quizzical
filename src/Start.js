import React from "react"

export default function Start(props) {
    return (
        <div className="container">
            <div className="main">
                <h1>Quizzical</h1>
                <h4>How big is your brain?</h4>
                <button className="btn" onClick={props.startGame} >Start quiz!</button>
            </div>
        </div>
    )
}