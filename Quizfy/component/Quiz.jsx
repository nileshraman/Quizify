import React, { useEffect, useState } from 'react'
import jSONData from './data.json'
import MultiProgress from 'react-multi-progress';
import { useNavigate } from "react-router-dom"



function Quiz() {

    let navigate = useNavigate();

    //state for current question number .
    const [currentQuestionNumber, setcurrentQuestionNumber] = useState(0);

    //State for question index.
    const [questionindex, setQuestionindex] = useState(1);

    //state for validate answer function.
    const [checkAnswer, setCheckAnswer] = useState('');

    //this state for shuffle.
    const [shuffle] = useState(true);

    //State for Reset button rendering.
    const [resetOption, setResetOption] = useState(false);

    //state that store current score.
    const [currentScore, setCurrentScore] = useState(0);

    //state for incorrect question.
    const [incorrect, setIncorrect] = useState(100);

    //State for updated data array.
    const [updatedArray, setUpdatedArray] = useState([])

    //This is state is used to take the index of option selected by user.
    const [optionSelection, setoptionSelection] = useState('')



    //This function is used to push and  shuffle the data in a new array.
    const makeShuffled = (index) => {
        //here ,pushing the correct and in correct data in a empty array (array)
        let array = [jSONData[index].correct_answer];
        if (shuffle) {
            for (let newData of jSONData[index].incorrect_answers) {
                array.push(newData)
            }
        }
        //shuffling of data.
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;

    }

    //Here useEffect is used to render the shuffle array when the current question is rendered.
    useEffect(() => {
        const suffled = makeShuffled(currentQuestionNumber)
        setUpdatedArray(suffled)
    }, [currentQuestionNumber])

    //This function handle the next button 
    const handleChangeQuestion = () => {
        setResetOption(false)
        if (currentQuestionNumber < jSONData.length - 1) {
            setcurrentQuestionNumber(currentQuestionNumber + 1)
            setCheckAnswer('')
            setQuestionindex(questionindex + 1)
            setoptionSelection('')

        }

    }


    //This function is used to handel (print) star according to difficulty level
    const printStar = (difficulty) => {
        if (difficulty === "easy") {
            return "★☆☆☆☆";
        }
        else if (difficulty === "medium") {
            return "★★★☆☆"
        } else {
            return "★★★★★"
        }
    }

    //Here we are validating the Anser given by user.
    
    const validateAnswer = (value, index) => {
        //this validate the correct answer
        if (value === jSONData[currentQuestionNumber].correct_answer) {
            setCheckAnswer('Correct Answer 😊')
            // setShuffle(false)
            setResetOption(true);
            setCurrentScore(currentScore + 100/jSONData.length);
            setoptionSelection(index);


        }
        //this validate the Incorrect answer
        else {
            setCheckAnswer("Incorrect 😣🙁 !!")
            setResetOption(true)
            setIncorrect(incorrect - 100/jSONData.length)
            setoptionSelection(index);
        }



    }
    //Here we are setting the data in local storage.
    const handleResult = () => {
        localStorage.setItem('Score', currentScore)
        localStorage.setItem('Correct', currentScore / 5)
        localStorage.setItem('Incorrect', jSONData.length - (currentScore / 5))
        navigate('/Result');

    }

    return (
        //Main Container div
        <div className="Main_container">
            
            <progress id='topProgressBar' className='top_progress' value={currentQuestionNumber + 1} max={jSONData.length}></progress>
          
            <div>
                <h1 className='font'>Quizify</h1>
                <h3 className='font_ques'>Question {decodeURIComponent(currentQuestionNumber + 1)} of {jSONData.length}.</h3>
                <h4 className='font_category'>Category : {decodeURIComponent(jSONData[currentQuestionNumber].category)}</h4>
                <h3 className='font_star'>Difficulty Level : {printStar(jSONData[currentQuestionNumber].difficulty)}</h3>
            </div>

            <div className="question_container" >
                {<h3 className='currentScore'>Current Score : {currentScore}</h3>}
                <div className='ques'>
                    <span>{decodeURIComponent(jSONData[currentQuestionNumber].question)}</span>
                </div>
                <div className='mid_container' >


                    {updatedArray.map((option, index) => {
                        return (
                            <div>

                                {checkAnswer.length > 0 ? <button className="option_button" style={{
                                    backgroundColor: index === optionSelection && "black",
                                    color: index === optionSelection && "white",
                                    border: index === optionSelection && "1px solid black",
                                }}>{decodeURIComponent(option)}</button> : <button onClick={() => validateAnswer(option, index)} className="option_button" >{decodeURIComponent(option)}</button>}

                            </div>
                        )

                    })}
                    {
                        checkAnswer.length > 0 ? <h2 className='ques'>{checkAnswer}</h2> : null
                    }



                </div>
                {resetOption ?
                    <input type="button" value='Next' onClick={handleChangeQuestion} className="next_button" /> : null
                }

                {
                    questionindex + 1 > jSONData.length ? <button onClick={handleResult} className="next_button">Show Results</button> : null
                }


            </div>
            <span className='lower_lable'>Score: {currentScore.toFixed(2)}</span> <span className='sub_lower_lable' >Max score: {incorrect}</span>
            <MultiProgress className='downbar'
                transitionTime={1.2}
                elements={[
                    {
                        value: currentScore,
                        color: "yellow",
                        isBold: false,
                    },
                    {
                        value: 0,
                        color: "rgb(100,0,0)",
                        showPercentage: true,
                        fontSize: 20,
                        textColor: "White",
                        isBold: true,
                    },
                    {
                        value: incorrect,
                        color: "black",
                        showPercentage: true,
                        textColor: "white",
                        fontSize: 20,
                        isBold: false,
                        className: "my-custom-css-class",
                    },
                ]}
                height={30}
            />

        </div>
    )
}

export default Quiz



