import React from 'react'
import { useNavigate } from 'react-router-dom'


function Result() {
    const navigate = useNavigate('')
    //This function is used to navigate form this('Result') component to 'Quiz' component
    function handleReset(){
        navigate( '/')
    }
    return (
        //Main div
        <div className="question_container">
            <div >
                <h3 className='result_font'>Your Result :</h3>
                <h2  className='credential_of_result'>Score : {localStorage.getItem('Score')} Out of 100.</h2>
                <h2  className='credential_of_result'> Correct Question : {localStorage.getItem('Correct')} </h2>
                <h2  className='credential_of_result'> Incorrect Question :{localStorage.getItem('Incorrect')}</h2>

            </div>
            <button className="restart_button" onClick={handleReset}>Restart Quiz</button>
        </div>
    )
}

export default Result
