import React, { useState, createContext, useContext, useEffect } from 'react';

import { Context } from "../context"; 

import { useNavigate } from 'react-router-dom';

//import FS from 'fs';

function ReviewDetailsForm() {
    const { items, setItems } = useContext(Context);
    const navigate = useNavigate();

    var courseNum = items[0].numselectedcourses;
    var courseNamesDecoded = [];

    useEffect(() => {
        if (items[0][`data__student-grade`] === null || items[0][`data__selected-times1`] === null) {
            navigate("/enquiries/course")
        } 
    }, []);



    if (items[0][`data__selected-times1`] === null || items[0][`data__selected-times1`] === undefined) {

    } else {

        for (let index = 0; index < items[0][`data__selected-times1`].length; index++) {
            const element = items[0][`data__selected-times1`][index];
            var courseNameSubstringed = [];
            const substring1 = element.substring(0, 3);
            console.log(`element ${element}`);
            var substring2 = element.substring(4, 9);
            const substring3 = element.substring(10, 13);
            const substring4 = element.substring(14, 21);
            var substring5 = element.substring(22, 31);
            console.log(`${substring1} + ${substring2} + ${substring3} + ${substring4} + ${substring5}`);
            if (substring2 === "EngA2") {
                substring2 = "English Advanced";
            } else if (substring2 === "Chem2") {
                substring2 = "Chemistry";
            } else if (substring2 === "Phys2") {
                substring2 = "Physics";
            } else if (substring2 === "Econ2") {
                substring2 = "Economics";
            } else if (substring2 === "Math4") {
                substring2 = "4U Maths";
            } else if (substring2 === "Math3") {
                substring2 = "3U Maths";
            } else if (substring2 === "Math2") {
                substring2 = "2U Maths";
            } else {

            }

            if (substring5 === "campus") {
                substring5 = "On Campus";
            } else if (substring5 === "online") {
                substring5 = "Online";
            }
            var courseStringArray = [`${substring1} ${substring2}`, `${substring3} ${substring4}`, `${substring5}`];
            courseNamesDecoded.push(courseStringArray);
        }
    }

    function DynamicClassList() {
        var list_elements = [];
        for (let index = 0; index < courseNamesDecoded.length; index++) {
            
            if (courseNamesDecoded[index][2] === "On Campus") {
                var list = 
                <div className='review_class_box'>
                    <div>
                        <h4 className='Review_Title_H4_Inline'>{courseNamesDecoded[index][0]}</h4>
                        <p className='Review_Div_Time'>{courseNamesDecoded[index][1]}</p>
                    </div>
                    <div>
                        <div className='Review_Div_Campus'>{courseNamesDecoded[index][2]}</div>
                    </div>
                    
                </div>;
            } else if (courseNamesDecoded[index][2] === "Online") {
                var list = 
                <div className='review_class_box'>
                    <div>
                        <h4 className='Review_Title_H4_Inline'>{courseNamesDecoded[index][0]}</h4>
                        <p className='Review_Div_Time'>{courseNamesDecoded[index][1]}</p>
                    </div>
                    <div>
                        <div className='Review_Div_Online'>{courseNamesDecoded[index][2]}</div>
                    </div>
                    
                </div>;
            }

            list_elements.push(list);
        }
        console.log(list_elements);

        return (
            list_elements
        );
    }

    function send_json () {
        items[0][`data__selected-options`] = items[0][`data__selected-options`].toString();
        items[0][`data__Send Email To`] = `${items[0][`data__parent-first-name`]}: ${items[0][`data__Send Email To`]}`
        items[0]['data__student-grade'] = `${items[0]['data__student-grade'].substring(4,8)} ${items[0]['data__student-grade'].substring(8,11)}`
        console.log(items[0]['data__student-grade']);
        console.log("here")

        var json_string = JSON.stringify(items);
        //FS.writeFile("response.json", json_string);

        // Sending and receiving data in JSON format using POST method
        // https://stackoverflow.com/questions/24468459/sending-a-json-to-server-and-retrieving-a-json-in-return-without-jquery
        var xhr = new XMLHttpRequest();
        var url = "https://hooks.zapier.com/hooks/catch/11244329/3yl522e/";
        xhr.open("POST", url, true);
        //xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                //var json = JSON.parse(xhr.responseText);
                console.log("file sent!!! inside if statement");
            }
        };
        console.log("file sent!!! normal");
        var data = JSON.stringify(items);
        xhr.send(data);

        //FS.unlink("response.json", err_func);
    }

/*
    function err_func () {
        if (err) {
            throw err;
        } else {
            console.log("response.json file deleted!");
        }
    }
*/




function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

const submitHandlerSuper = () => {
    delay(300).then(() => (document.getElementById("submit_button").innerText = "Loading ."));
    delay(700).then(() => (document.getElementById("submit_button").innerText = "Loading . ."));
    delay(1200).then(() => (document.getElementById("submit_button").innerText = "Loading . . ."));
    
    delay(2500).then(() => submitHandler());
};

    const submitHandler = () => {
        window.scrollTo(0, 0);

        // items[14]
        //setItems((items) => [...items, courseNamesDecoded]);
        //setItems((items) => [...items, document.getElementById("pref_email_address").value]);
        //setItems((items) => [...items, document.getElementById("heard_about_project_from").value]);
        // items[16]
        items[0][`data__Send Email To`] = document.getElementById("pref_email_address").value;
        items[0][`data__Discovery`] = document.getElementById("heard_about_project_from").value;
        
        //signup();
        document.getElementById("root").className = "root_animation2";
        
        send_json();
        
        navigate("/enquiries/success"); 
    };


    var substr_join_yr_1;
    var substr_join_yr_2;
    var join_yr;
    if (items[0][`data__student-grade`] === null || items[0][`data__selected-times1`] === null) {
        
    } else {
        substr_join_yr_1 = items[0][`data__student-grade`].substring(4, 8);
        substr_join_yr_2 = items[0][`data__student-grade`].substring(8, 10);
        join_yr = `${substr_join_yr_1} ${substr_join_yr_2}`;
    

        return (
            <>
                <div className='Central_Col_1_2_3'>
                    <div className='Ticker'>
                        <div className='Ticker_Filled'></div>
                        <div className='Ticker_Filled'></div>
                        <div className='Ticker_Filled'></div>
                        <div className='Ticker_Filled'></div>
                        <div className='Ticker_Filled'></div>
                        <div className='Ticker_Unfilled'></div>
                    </div>
                    <div className='Subtitle'>5 of 6</div> 
                    <div>
                        <h1 className='Title_H1'>{items[0][`data__student-first-name`]}'s Offer</h1>
                    </div>

                    <br></br>

                    <div className='Review_Div'>
                        <div>
                            <h3 className='Review_Title_H3'>1. Your class offer</h3>
                            <p className='Review_Text'>Based on your information, we are pleased to offer you a trial spot for the following class times.</p>
                        </div>
                        <div className='Line_Mark'></div>
    
                        <DynamicClassList/>

                        <div>
                            <h4 className='Review_Title_H4'>What's included</h4>
                            <p className='Review_Text'>As part of the program, every class comes with a comprehensive suite of offerings specific to that subject and learning option. An email will be sent to you with further details.</p>
                        </div>
                    </div>

                    <br></br>

                    <div className='Review_Div'>
                        <div>
                            <h3 className='Review_Title_H3'>2. Your details</h3>
                            <p className='Review_Text'>Please confirm your details so we can contact you with the right information.</p>
                        </div>
                        <div className='Line_Mark'></div>
                        <div className='Review_Horizontal_Div_1'>
                            <div className='Review_Horizontal_Div_2'>
                                <h4 className='Review_Title_H4'>Student's Details</h4>
                                <div>
                                    <div className='Review_Col_LHS'>
                                        <p className='Review_Bold_Text'>First name: <span className='Review_Normal_Text'>{items[0][`data__student-first-name`]}</span></p>
                                        <p className='Review_Bold_Text'>School: <span className='Review_Normal_Text'>{items[0][`data__student-school`]}</span></p>
                                        <p className='Review_Bold_Text'>Email: <span className='Review_Normal_Text'>{items[0][`data__student-email`]}</span></p>
                                    </div>
                                    <div className='Review_Col_RHS'>
                                        <p className='Review_Bold_Text'>Last name: <span className='Review_Normal_Text'>{items[0][`data__student-last-name`]}</span></p>
                                        <p className='Review_Bold_Text'>Grade: <span className='Review_Normal_Text'>{join_yr}</span></p>
                                        <p className='Review_Bold_Text'>Phone: <span className='Review_Normal_Text'>{items[0][`data__student-mobile`]}</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className='Review_Horizontal_Div_2'>
                                <h4 className='Review_Title_H4'>Parent's Details</h4>
                                <div>
                                    <div className='Review_Col_LHS'>
                                        <p className='Review_Bold_Text'>First name: <span className='Review_Normal_Text'>{items[0][`data__parent-first-name`]}</span></p>
                                        <p className='Review_Bold_Text'>Email: <span className='Review_Normal_Text'>{items[0][`data__parent-email`]}</span></p>
                                    </div>
                                    <div className='Review_Col_RHS'>
                                        <p className='Review_Bold_Text'>Last name: <span className='Review_Normal_Text'>{items[0][`data__parent-last-name`]}</span></p>
                                        <p className='Review_Bold_Text'>Phone: <span className='Review_Normal_Text'>{items[0][`data__parent-mobile`]}</span></p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <br></br>
                    <form>
                    <div className='Review_Div'>
                        <div>
                            <h3 className='Review_Title_H3'>3. How the 3 week trial works</h3>
                            <p className='Review_Text'>
                                You only pay the first 3 weeks if you find it valuable and choose to 
                                continue your enrolment beyond 3 weeks. If you don’t find it valuable, 
                                you can quit in the first 3 weeks and not pay anything.
                            </p>
                            <p className='Review_Text'>
                                If you miss a class, we will give you access to resources and book you 
                                into additional tutorials if your course includes tutorials to support 
                                you the best we can! Course fees and Trial periods do not change based 
                                on missed classes.
                            </p>
                            <p className='Review_Text'>
                                The trial period does not apply for LEAP, but you can cancel anytime. 
                                LEAP is a mock HSC exam program that starts in July.
                            </p>
                        </div>
                        <div>
                            <input className="Review_Checkbox" type="checkbox" id="understood_conditions" name="TandCs" value="understood" required></input>
                            <label className='Review_Checkbox_Label' for="understood_conditions" id="TandCcheckBox" >I understand</label>
                        </div> 
                    </div>
                    <div className='Line_Mark'></div>
                    <div className='Review_Div_2'>
                        <div></div>
                        <div>
                            <label className='Review_Textbox_Label'>Project Academy should send emails to...</label>
                            <br></br>
                            <select className='Review_Textbox' id="pref_email_address" name="pref_email_address" required>
                                <option value="">Select one...</option>
                                <option name="prntEmail" value={items[0][`data__student-email`]}>Student Email: {items[0][`data__student-email`]}</option>
                                <option name="stdtEmail" value={items[0][`data__parent-email`]}>Parent email: {items[0][`data__parent-email`]}</option>
                            </select>
                            <br></br>
                        </div>
                        <div>
                            <label className='Review_Textbox_Label'>I learnt about Project from...</label>
                            <br></br>
                            <select className='Review_Textbox' id="heard_about_project_from" name="heard_about_project_from" required>
                                <option value="">Select one...</option>
                                <option name="Facebook" value="Facebook">Facebook</option>
                                <option name="Instagram" value="Instagram">Instagram</option>
                                <option name="Tiktok" value="Tiktok">Tiktok</option>
                                <option name="Procon" value="Procon">Procon</option>
                                <option name="Friend/Family" value="Friend/Family">Friend/Family</option>
                                <option name="Google" value="Google">Google</option>
                                <option name="Magazine/Newspaper" value="Magazine/Newspaper">Magazine/Newspaper</option>
                                <option name="Other" value="Other">Other</option>
                            </select>
                            <br></br>
                        </div>
                    </div>
                    </form> 
                    <div>
                        <button className='Continue_Button' onClick={submitHandlerSuper} id="submit_button">Confirm & Secure Your Spot</button>
                    </div>
                    
                </div>
            </>
        );
    }
}

export default ReviewDetailsForm;