import React from 'react';

export const App = ({ surveyQuestions }) => (
    <div>
        {surveyQuestions && surveyQuestions.map(({ title, options }, index) => (

            <div className="mb-2" key={index}>

                <h4>
                    {title}
                </h4>
                <form>
                    {Object.entries(options).map(([key, value]) => (
                        <span key={`q${key}`} >
                            <input type="checkbox" id={`q${key}`} name={`q${key}`} value={value} ></input>
                            <label htmlFor={`q${key}`}>{value}</label>
                        </span>))}
                </form>
            </div>

        ))}

    </div>
)