import React, { useState, createContext, useContext } from 'react';

import { Context } from "../context"; 

import { useNavigate } from 'react-router-dom';

function ParentForm() { 

    const { items, setItems } = useContext(Context);
    const navigate = useNavigate();

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    
    function submitHandlerSuper() {
        if (document.getElementById("pfirstName").value != "" && document.getElementById("plastName").value != "") {
            if (document.getElementById("p_mob_num").value != "" && document.getElementById("p_email").value != "") {
                if (document.getElementById("p_email").value != "") {

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

    const submitHandler = (event) => {
        window.scrollTo(0, 0);
        if (event) {
            event.preventDefault(); 
        }
        // items[4]
        //setItems((items) => [...items, document.getElementById("pfirstName").value]);
        //setItems((items) => [...items, document.getElementById("plastName").value]);
        //setItems((items) => [...items, document.getElementById("p_mob_num").value]);
        //setItems((items) => [...items, document.getElementById("p_email").value]);
        //setItems(items.push(document.getElementById("s_email").value));
        //setItems(items.push(document.getElementById("lastName").value));
        items[0][`data__parent-first-name`] = document.getElementById("pfirstName").value;
        items[0][`data__parent-last-name`] = document.getElementById("plastName").value;
        items[0][`data__parent-mobile`] = document.getElementById("p_mob_num").value;
        items[0][`data__parent-email`] = document.getElementById("p_email").value;
        //signup();
        document.getElementById("root").className = "root_animation1";
        navigate("/enquiries/course"); 
    };
 
    const signup = () => {
        // NOTE: THIS WORKS, BUT ONLY IF YOU CLICK BACK PAGE BUTTON AND CLICK ONLY THE SUBMIT BUTTON AGAIN
        // MAYBE THE ABOVE SETITEMS((ITEMS) => [...ITEMS, ETC]) ONLY SAVES TO CONTEXT AFTER LEAVING THE PAGE!
        alert(`Parent infos recorded!`);
    }


    return (
        <>
            <div className='Central_Col_1_2_3'>
                <div className='Ticker'>
                    <div className='Ticker_Filled'></div>
                    <div className='Ticker_Filled'></div>
                    <div className='Ticker_Unfilled'></div>
                    <div className='Ticker_Unfilled'></div>
                    <div className='Ticker_Unfilled'></div>
                    <div className='Ticker_Unfilled'></div>
                </div>
                <div className='Subtitle'>2 of 6</div> 
                <div>
                    <h1 className='Title_H1'>Parent's Information</h1>
                </div>
                <form>
                    <div className="central_input_group">                       
                        <label className='Central_Text_Label'>Parent's First Name</label>
                        <br></br>
                        <input className='Central_Textbox' type="text" id="pfirstName" name="pfirstName" placeholder="Enter Parent's First Name" required></input>
                        <br></br>
                    </div>
                    <div className="central_input_group">
                        <label className='Central_Text_Label'>Parent's Last Name</label>
                        <br></br>
                        <input className='Central_Textbox' type="text" id="plastName" placeholder="Enter Parent's Last Name" required></input>
                        <br></br>
                    </div>
                    <div className="central_input_group">
                        <label className='Central_Text_Label'>Parent's Mobile</label>
                        <br></br>
                        <input className='Central_Textbox' type="text" id="p_mob_num" placeholder="Enter Parent's Mobile" required></input>
                        <br></br>
                    </div>
                    <div className="central_input_group">
                        <label className='Central_Text_Label'>Parent's Email</label>
                        <br></br> 
                        <input className='Central_Textbox' type="text" id="p_email" placeholder="Enter Parent's Email" required></input>
                        <br></br>
                    </div>
                    <button className='Continue_Button' type="button" id="submit_button" onClick={submitHandlerSuper}>Continue</button>
                </form>
            </div>
        </>
    );
}

// previously:
//<button type="submit" onClick={submitHandler}>Continue</button>
// now moved to inside the form tag to make the text field "required" attribute work correctly.

export default ParentForm;