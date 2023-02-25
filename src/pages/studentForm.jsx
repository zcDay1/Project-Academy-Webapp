import React, { useState, createContext, useContext } from 'react'; 

//import useSignUpForm from './hooks';

import { Context } from "../context"; 

import { useNavigate } from 'react-router-dom';

function StudentForm() {

    const { items, setItems } = useContext(Context);
    const navigate = useNavigate();

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    
    function submitHandlerSuper() {
        if (document.getElementById("firstName").value != "" && document.getElementById("lastName").value != "") {
            if (document.getElementById("s_mob_num").value != "" && document.getElementById("s_email").value != "") {
                if (document.getElementById("s_email").value != "") {

                    setTimeout(() => {
                        document.getElementById("submit_button").innerText = "Loading ."
                    }, 100);
                    setTimeout(() => {
                        document.getElementById("submit_button").innerText = "Loading . ."
                    }, 400);
                    setTimeout(() => {
                        document.getElementById("submit_button").innerText = "Loading . . ."
                    }, 800);
                    setTimeout(() => {
                        submitHandler()
                    }, 1300);
                }
            }
        }
    };

    const submitHandler = () => {
        window.scrollTo(0, 0);

        items[0][`data__student-first-name`] = document.getElementById("firstName").value;
        items[0][`data__student-last-name`] = document.getElementById("lastName").value;
        items[0][`data__student-mobile`] = document.getElementById("s_mob_num").value;
        items[0][`data__student-email`] = document.getElementById("s_email").value;
        document.getElementById("root").className = "root_animation2";
        navigate("/enquiries/parent-info"); 
    };
 
    const signup = () => {
        // NOTE: THIS WORKS, BUT ONLY IF YOU CLICK BACK PAGE BUTTON AND CLICK ONLY THE SUBMIT BUTTON AGAIN
        // MAYBE THE ABOVE SETITEMS((ITEMS) => [...ITEMS, ETC]) ONLY SAVES TO CONTEXT AFTER LEAVING THE PAGE!
        alert(`hello hello`);
    }


    return (
        <>
            <div className='Central_Col_1_2_3'>
                <div className='Ticker'>
                    <div className='Ticker_Filled'></div>
                    <div className='Ticker_Unfilled'></div>
                    <div className='Ticker_Unfilled'></div>
                    <div className='Ticker_Unfilled'></div>
                    <div className='Ticker_Unfilled'></div>
                    <div className='Ticker_Unfilled'></div>
                </div>
                <div className='Subtitle'>1 of 6</div> 
                <h1 className='Title_H1'>Student's Information</h1>
                <form>
                    <div className="central_input_group">
                        <label className='Central_Text_Label'>Student's First Name</label>
                        <br></br>
                        <input className='Central_Textbox' type="text" id="firstName" name="firstName" placeholder="Enter Student's First Name" required></input>
                        <br></br>
                    </div>
                    <div className="central_input_group">
                        <label className='Central_Text_Label'>Student's Last Name</label>
                        <br></br>
                        <input className='Central_Textbox' type="text" id="lastName" placeholder="Enter Student's Last Name" required></input>
                        <br></br>
                    </div>
                    <div className="central_input_group">
                        <label className='Central_Text_Label'>Student's Mobile</label>
                        <br></br>
                        <input className='Central_Textbox' type="text" id="s_mob_num" placeholder="Enter Student's Mobile" required></input>
                        <br></br>
                    </div>
                    <div className="central_input_group">
                        <label className='Central_Text_Label'>Student's Email</label>
                        <br></br>
                        <input className='Central_Textbox' type="text" id="s_email" placeholder="Enter Student's Email" required></input>
                        <br></br>
                    </div>
                    <button className='Continue_Button' type="button" id="submit_button" onClick={submitHandlerSuper}>Continue</button>
                </form>
            </div>
        </>
    );
}

// button used to be:
// <button type="submit" onClick={submitHandler}>Continue</button>
// but this way meant the form and the submit event were sort of de-coupled and the "required" attribute
// of the input forms wasn't working correctly.
// so I moved that to be onSubmit={submitHandler} inside the <form> tag. 

export default StudentForm;