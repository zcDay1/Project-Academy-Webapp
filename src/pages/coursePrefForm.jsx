import React, { useState, createContext, useContext } from 'react';

import { Context } from "../context"; 

import { useNavigate } from 'react-router-dom';

function CoursePrefForm() { 

    const { items, setItems } = useContext(Context);
    const navigate = useNavigate();

    var numSelectedCourses = 0;
    var selectedCourses = [];

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    
    const submitHandlerSuper = () => {
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
    };

    const submitHandler = (event) => {
        window.scrollTo(0, 0);
        if (event) {
            event.preventDefault(); 
        }

        console.log(`numselectedcourses ${numSelectedCourses}`);
        console.log(`selected courses ${selectedCourses}`);

        if (numSelectedCourses > 0) {
            items[0][`data__student-grade`] = document.getElementById("s_pref_grade").value;
            items[0][`data__student-school`] = document.getElementById("s_school").value;
            items[0].numselectedcourses = numSelectedCourses;
            items[0][`data__selected-options1`] = selectedCourses;

            var iterator = 0;
            var mappedNamesArray = [];
            while (iterator < selectedCourses.length) {
                mappedNamesArray.push(mapNames(selectedCourses[iterator])); 
                iterator++;
            }
            items[0][`data__selected-options`] = mappedNamesArray;

            document.getElementById("root").className = "root_animation2";
            navigate("/enquiries/timetable"); 
        } else {
            courseNumSelectionWarning();
        }
        
    };

    function mapNames(mapname) {
        var mappedName = "";
        if (mapname === "HSCEngA2U") {
            mappedName = "HSC English Advanced";
        } else if (mapname === "HSCChem2U") {
            mappedName = "HSC Chemistry";
        } else if (mapname === "HSCEcon2U") {
            mappedName = "HSC Economics";
        } else if (mapname === "HSCPhys2U") {
            mappedName = "HSC Physics";
        } else if (mapname === "HSCMath4U") {
            mappedName = "HSC 4U Maths";
        } else if (mapname === "HSCMath3U") {
            mappedName = "HSC 3U Maths";
        } else if (mapname === "HSCMath2U") {
            mappedName = "HSC 2U Maths";
        } else if (mapname === "Y11EngA2U") {
            mappedName = "Y11 English Advanced";
        } else if (mapname === "Y11Chem2U") {
            mappedName = "Y11 Chemistry";
        } else if (mapname === "Y11Phys2U") {
            mappedName = "Y11 Physics";
        } else if (mapname === "Y11Econ2U") {
            mappedName = "Y11 Economics";
        } else if (mapname === "Y11Math3U") {
            mappedName = "Y11 Maths Accelerated";
        } else if (mapname === "Y11Math2U") {
            mappedName = "Y11 Maths Advanced";
        } else if (mapname === "Y10Math2U") {
            mappedName = "Y10 Maths Advanced";
        } else if (mapname === "Y09Math2U") {
            mappedName = "Y09 Maths Advanced";
        }
        return mappedName;
    };

    const courseNumSelectionWarning = () => {
        alert(`
            Please select at least one course!
        `);
        document.getElementById("submit_button").innerText = "Continue";
    }

    const signup = () => {
        // NOTE: THIS WORKS, BUT ONLY IF YOU CLICK BACK PAGE BUTTON AND CLICK ONLY THE SUBMIT BUTTON AGAIN
        // MAYBE THE ABOVE SETITEMS((ITEMS) => [...ITEMS, ETC]) ONLY SAVES TO CONTEXT AFTER LEAVING THE PAGE!
        alert(`User Created!`);
    }

    const showCourses = (event) => { 

        numSelectedCourses = 0;
        selectedCourses = [];

        if (event) {
            event.preventDefault(); 
        }

        unselectCourses();

        if (document.getElementById("s_pref_grade").value === "joinYear09") {

            var arr1 = document.getElementsByClassName("HSC_Subjpref_Div_Shown");
            var arr2 = document.getElementsByClassName("Y11_Subjpref_Div_Shown");
            var arr3 = document.getElementsByClassName("Y10_Subjpref_Div_Shown");
            var arr4 = document.getElementsByClassName("Y09_Subjpref_Div_Hidden");

            for (let index = 0; index < arr1.length; index++) {
                arr1[index].className = "HSC_Subjpref_Div_Hidden";
            }
            for (let index = 0; index < arr2.length; index++) {
                arr2[index].className = "Y11_Subjpref_Div_Hidden";
            }
            for (let index = 0; index < arr3.length; index++) {
                arr3[index].className = "Y10_Subjpref_Div_Hidden";
            }
            for (let index = 0; index < arr4.length; index++) {
                arr4[index].className = "Y09_Subjpref_Div_Shown";
            }

            document.getElementById("s_pref_HSC_EngA").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_HSC_Chem").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_HSC_Phys").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_HSC_Econ").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_HSC_Ma4U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_HSC_Ma3U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_HSC_Ma2U").className = "Subjpref_Checkbox_Hidden";

            document.getElementById("Label_HSCEngA2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_HSCChem2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_HSCPhys2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_HSCEcon2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_HSCMath4U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_HSCMath3U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_HSCMath2U").className = "Subjpref_Checkbox_Hidden";

            document.getElementById("s_pref_Y11_EngA").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_Y11_Chem").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_Y11_Phys").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_Y11_Econ").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_Y11_MaAc").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_Y11_Ma2U").className = "Subjpref_Checkbox_Hidden";

            document.getElementById("Label_Y11EngA2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_Y11Chem2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_Y11Phys2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_Y11Econ2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_Y11Math3U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_Y11Math2U").className = "Subjpref_Checkbox_Hidden";

            document.getElementById("s_pref_Y10_Ma2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_Y10Math2U").className = "Subjpref_Checkbox_Hidden";

            document.getElementById("s_pref_Y09_MAdv").className = "Subjpref_Checkbox_Shown";
            document.getElementById("Label_Y09Math2U").className = "Subjpref_Label_Shown";

        } else if (document.getElementById("s_pref_grade").value === "joinYear10") {

            var arr1 = document.getElementsByClassName("HSC_Subjpref_Div_Shown");
            var arr2 = document.getElementsByClassName("Y11_Subjpref_Div_Shown");
            var arr3 = document.getElementsByClassName("Y10_Subjpref_Div_Hidden");
            var arr4 = document.getElementsByClassName("Y09_Subjpref_Div_Shown");

            for (let index = 0; index < arr1.length; index++) {
                arr1[index].className = "HSC_Subjpref_Div_Hidden";
            }
            for (let index = 0; index < arr2.length; index++) {
                arr2[index].className = "Y11_Subjpref_Div_Hidden";
            }
            for (let index = 0; index < arr3.length; index++) {
                arr3[index].className = "Y10_Subjpref_Div_Shown";
            }
            for (let index = 0; index < arr4.length; index++) {
                arr4[index].className = "Y09_Subjpref_Div_Hidden";
            }

            document.getElementById("s_pref_HSC_EngA").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_HSC_Chem").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_HSC_Phys").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_HSC_Econ").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_HSC_Ma4U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_HSC_Ma3U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_HSC_Ma2U").className = "Subjpref_Checkbox_Hidden";

            document.getElementById("Label_HSCEngA2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_HSCChem2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_HSCPhys2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_HSCEcon2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_HSCMath4U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_HSCMath3U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_HSCMath2U").className = "Subjpref_Checkbox_Hidden";

            document.getElementById("s_pref_Y11_EngA").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_Y11_Chem").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_Y11_Phys").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_Y11_Econ").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_Y11_MaAc").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_Y11_Ma2U").className = "Subjpref_Checkbox_Hidden";

            document.getElementById("Label_Y11EngA2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_Y11Chem2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_Y11Phys2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_Y11Econ2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_Y11Math3U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_Y11Math2U").className = "Subjpref_Checkbox_Hidden";

            document.getElementById("s_pref_Y10_Ma2U").className = "Subjpref_Checkbox_Shown";
            document.getElementById("Label_Y10Math2U").className = "Subjpref_Label_Shown";

            document.getElementById("s_pref_Y09_MAdv").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_Y09Math2U").className = "Subjpref_Checkbox_Hidden";

        } else if (document.getElementById("s_pref_grade").value === "joinYear11") {

            var arr2 = document.getElementsByClassName("Y11_Subjpref_Div_Hidden");
            var arr1 = document.getElementsByClassName("HSC_Subjpref_Div_Shown");
            var arr3 = document.getElementsByClassName("Y10_Subjpref_Div_Shown");
            var arr4 = document.getElementsByClassName("Y09_Subjpref_Div_Shown");

            for (let index = 0; index < arr1.length; index) {
                arr1[index].className = "HSC_Subjpref_Div_Hidden";
            }
            for (let index = 0; index < arr2.length; index) {
                arr2[index].className = "Y11_Subjpref_Div_Shown";
            }
            for (let index = 0; index < arr3.length; index) {
                arr3[index].className = "Y10_Subjpref_Div_Hidden";
            }
            for (let index = 0; index < arr4.length; index) {
                arr4[index].className = "Y09_Subjpref_Div_Hidden";
            }

            document.getElementById("s_pref_HSC_EngA").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_HSC_Chem").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_HSC_Phys").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_HSC_Econ").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_HSC_Ma4U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_HSC_Ma3U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_HSC_Ma2U").className = "Subjpref_Checkbox_Hidden";

            document.getElementById("Label_HSCEngA2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_HSCChem2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_HSCPhys2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_HSCEcon2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_HSCMath4U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_HSCMath3U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_HSCMath2U").className = "Subjpref_Checkbox_Hidden";

            document.getElementById("s_pref_Y11_EngA").className = "Subjpref_Checkbox_Shown";
            document.getElementById("s_pref_Y11_Chem").className = "Subjpref_Checkbox_Shown";
            document.getElementById("s_pref_Y11_Phys").className = "Subjpref_Checkbox_Shown";
            document.getElementById("s_pref_Y11_Econ").className = "Subjpref_Checkbox_Shown";
            document.getElementById("s_pref_Y11_MaAc").className = "Subjpref_Checkbox_Shown";
            document.getElementById("s_pref_Y11_Ma2U").className = "Subjpref_Checkbox_Shown";

            document.getElementById("Label_Y11EngA2U").className = "Subjpref_Label_Shown";
            document.getElementById("Label_Y11Chem2U").className = "Subjpref_Label_Shown";
            document.getElementById("Label_Y11Phys2U").className = "Subjpref_Label_Shown";
            document.getElementById("Label_Y11Econ2U").className = "Subjpref_Label_Shown";
            document.getElementById("Label_Y11Math3U").className = "Subjpref_Label_Shown";
            document.getElementById("Label_Y11Math2U").className = "Subjpref_Label_Shown";

            document.getElementById("s_pref_Y10_Ma2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_Y10Math2U").className = "Subjpref_Checkbox_Hidden";

            document.getElementById("s_pref_Y09_MAdv").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_Y09Math2U").className = "Subjpref_Checkbox_Hidden";

            
        } else if (document.getElementById("s_pref_grade").value === "joinYear12") {

            var arr1 = document.getElementsByClassName("HSC_Subjpref_Div_Hidden");
            console.log(arr1);
            var arr2 = document.getElementsByClassName("Y11_Subjpref_Div_Shown");
            var arr3 = document.getElementsByClassName("Y10_Subjpref_Div_Shown");
            var arr4 = document.getElementsByClassName("Y09_Subjpref_Div_Shown");

            for (let index = 0; index < arr1.length; index) {
                arr1[index].className = "HSC_Subjpref_Div_Shown";
            }
            for (let index = 0; index < arr2.length; index) {
                arr2[index].className = "Y11_Subjpref_Div_Hidden";
            }
            for (let index = 0; index < arr3.length; index) {
                arr3[index].className = "Y10_Subjpref_Div_Hidden";
            }
            for (let index = 0; index < arr4.length; index) {
                arr4[index].className = "Y09_Subjpref_Div_Hidden";
            }

            document.getElementById("s_pref_HSC_EngA").className = "Subjpref_Checkbox_Shown";
            document.getElementById("s_pref_HSC_Chem").className = "Subjpref_Checkbox_Shown";
            document.getElementById("s_pref_HSC_Phys").className = "Subjpref_Checkbox_Shown";
            document.getElementById("s_pref_HSC_Econ").className = "Subjpref_Checkbox_Shown";
            document.getElementById("s_pref_HSC_Ma4U").className = "Subjpref_Checkbox_Shown";
            document.getElementById("s_pref_HSC_Ma3U").className = "Subjpref_Checkbox_Shown";
            document.getElementById("s_pref_HSC_Ma2U").className = "Subjpref_Checkbox_Shown";

            document.getElementById("Label_HSCEngA2U").className = "Subjpref_Label_Shown";
            document.getElementById("Label_HSCChem2U").className = "Subjpref_Label_Shown";
            document.getElementById("Label_HSCPhys2U").className = "Subjpref_Label_Shown";
            document.getElementById("Label_HSCEcon2U").className = "Subjpref_Label_Shown";
            document.getElementById("Label_HSCMath4U").className = "Subjpref_Label_Shown";
            document.getElementById("Label_HSCMath3U").className = "Subjpref_Label_Shown";
            document.getElementById("Label_HSCMath2U").className = "Subjpref_Label_Shown";

            document.getElementById("s_pref_Y11_EngA").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_Y11_Chem").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_Y11_Phys").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_Y11_Econ").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_Y11_MaAc").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("s_pref_Y11_Ma2U").className = "Subjpref_Checkbox_Hidden";

            document.getElementById("Label_Y11EngA2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_Y11Chem2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_Y11Phys2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_Y11Econ2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_Y11Math3U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_Y11Math2U").className = "Subjpref_Checkbox_Hidden";

            document.getElementById("s_pref_Y10_Ma2U").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_Y10Math2U").className = "Subjpref_Checkbox_Hidden";

            document.getElementById("s_pref_Y09_MAdv").className = "Subjpref_Checkbox_Hidden";
            document.getElementById("Label_Y09Math2U").className = "Subjpref_Checkbox_Hidden";
        }
    };
/*
    const trackCoursesSelection = (event) => {
        if (event.target.checked == true) {
            numSelectedCourses++;
            selectedCourses.push(event.target.value);
        } else {
            numSelectedCourses--;
            for (let indx = 0; indx < selectedCourses.length; indx++) {
                const element = selectedCourses[indx];
                if (element.value === event.target.value) {

                    for (let idex = 0; idex < indx; idex++) {
                        const element = selectedCourses[indx];
                        selectedCourses[indx] = element[(indx+1)];
                    }
                }
            }
        }
    };
*/
    const trackCoursesSelection = (event) => {
        
        if (event.target.checked == true) {
            selectedCourses.push(event.target.value);
            console.log("event target value");
            console.log(event.target.value);
            numSelectedCourses++;
        } else if (event.target.checked == false) {
            for (let index = 0; index < selectedCourses.length; index++) {
                //const element = selectedCourses[index];
                if (selectedCourses[index] == event.target.value) {
                    selectedCourses.splice(index, 1);
                }
            }
            numSelectedCourses--;
        }
    }; 

    const unselectCourses = () => {

        document.getElementById("s_pref_HSC_EngA").checked = false;
        document.getElementById("s_pref_HSC_Chem").checked = false;
        document.getElementById("s_pref_HSC_Phys").checked = false;
        document.getElementById("s_pref_HSC_Econ").checked = false;
        document.getElementById("s_pref_HSC_Ma4U").checked = false;
        document.getElementById("s_pref_HSC_Ma3U").checked = false;
        document.getElementById("s_pref_HSC_Ma2U").checked = false;
        
        document.getElementById("s_pref_Y11_EngA").checked = false;
        document.getElementById("s_pref_Y11_Chem").checked = false;
        document.getElementById("s_pref_Y11_Phys").checked = false;
        document.getElementById("s_pref_Y11_Econ").checked = false;
        document.getElementById("s_pref_Y11_MaAc").checked = false;
        document.getElementById("s_pref_Y11_Ma2U").checked = false;

        document.getElementById("s_pref_Y10_Ma2U").checked = false;

        document.getElementById("s_pref_Y09_MAdv").checked = false;

    };

    return (
        <>
            <div className='Central_Col_1_2_3'>
                <div className='Ticker'>
                    <div className='Ticker_Filled'></div>
                    <div className='Ticker_Filled'></div>
                    <div className='Ticker_Filled'></div>
                    <div className='Ticker_Unfilled'></div>
                    <div className='Ticker_Unfilled'></div>
                    <div className='Ticker_Unfilled'></div>
                </div>
                <div className='Subtitle'>3 of 6</div> 
                <div>
                    <h1 className='Title_H1'>Course Preferences</h1>
                </div>
                <form>
                    <div className="central_input_group">
                        <label className='Central_Text_Label'>Which year are you in?</label>
                        <select className='Coursepref_Dropdown' id="s_grade" name="s_grade" required>
                            <option name="none_" value="">Select a year...</option>
                            <option name="inY12" value="inYear12">Year 12</option>
                            <option name="inY11" value="inYear11">Year 11</option>
                            <option name="inY10" value="inYear10">Year 10</option>
                            <option name="inY09" value="inYear09">Year 9</option>
                        </select>
                    </div>
                    <div className="central_input_group">
                        <label className='Central_Text_Label'>Which classes are you interested in?</label>
                        <br></br>
                        <select className='Coursepref_Dropdown' id="s_pref_grade" name="s_pref_grade" onChange={showCourses} required>
                            <option name="none_" value="">Select a year...</option>
                            <option name="joinY12" value="joinYear12">Year 12 Classes</option>
                            <option name="joinY11" value="joinYear11">Year 11 Classes</option>
                            <option name="joinY10" value="joinYear10">Year 10 Classes</option>
                            <option name="joinY09" value="joinYear09">Year 9 Classes</option>
                        </select>
                    </div>
                    <div className="central_input_group">
                        <label className='Central_Text_Label'>Student's School</label>
                        <input className='Coursepref_Textbox' type="text" id="s_school" placeholder="Enter Student's School" required></input> 
                        <br></br> 
                    </div>
                    <div className="subject_preference_list">
                        <div>
                            <div className="HSC_Subjpref_Div_Hidden">
                                <input type="checkbox" className="Subjpref_Checkbox_Hidden" id="s_pref_HSC_EngA" name="HSCEngA2U" value="HSCEngA2U" onChange={trackCoursesSelection}></input>
                                <label for="s_pref_HSC_EngA" className="Subjpref_Checkbox_Hidden" id="Label_HSCEngA2U" >HSC English Advanced</label>
                            </div>

                            <div className="HSC_Subjpref_Div_Hidden">
                                <input type="checkbox" className="Subjpref_Checkbox_Hidden" id="s_pref_HSC_Chem" name="HSCChem2U" value="HSCChem2U" onChange={trackCoursesSelection} ></input>
                                <label for="s_pref_HSC_Chem" className="Subjpref_Checkbox_Hidden" id="Label_HSCChem2U" >HSC Chemistry</label>
                            </div>

                            <div className="HSC_Subjpref_Div_Hidden">
                                <input type="checkbox" className="Subjpref_Checkbox_Hidden" id="s_pref_HSC_Phys" name="HSCPhys2U" value="HSCPhys2U" onChange={trackCoursesSelection} ></input>
                                <label for="s_pref_HSC_Phys" className="Subjpref_Checkbox_Hidden" id="Label_HSCPhys2U" >HSC Physics</label>
                            </div>
                            <div className="HSC_Subjpref_Div_Hidden">
                                <input type="checkbox" className="Subjpref_Checkbox_Hidden" id="s_pref_HSC_Econ" name="HSCEcon2U" value="HSCEcon2U" onChange={trackCoursesSelection} ></input>
                                <label for="s_pref_HSC_Econ" className="Subjpref_Checkbox_Hidden" id="Label_HSCEcon2U" >HSC Economics</label>
                            </div>
                            <div className="HSC_Subjpref_Div_Hidden">
                                <input type="checkbox" className="Subjpref_Checkbox_Hidden" id="s_pref_HSC_Ma4U" name="HSCMath4U" value="HSCMath4U" onChange={trackCoursesSelection} ></input>
                                <label for="s_pref_HSC_Ma4U" className="Subjpref_Checkbox_Hidden" id="Label_HSCMath4U" >HSC 4U Maths</label>
                            </div>
                            <div className="HSC_Subjpref_Div_Hidden">
                                <input type="checkbox" className="Subjpref_Checkbox_Hidden" id="s_pref_HSC_Ma3U" name="HSCMath3U" value="HSCMath3U" onChange={trackCoursesSelection} ></input>
                                <label for="s_pref_HSC_Ma3U" className="Subjpref_Checkbox_Hidden" id="Label_HSCMath3U" >HSC 3U Maths</label>
                            </div>
                            <div className="HSC_Subjpref_Div_Hidden">
                                <input type="checkbox" className="Subjpref_Checkbox_Hidden" id="s_pref_HSC_Ma2U" name="HSCMath2U" value="HSCMath2U" onChange={trackCoursesSelection} ></input>
                                <label for="s_pref_HSC_Ma2U" className="Subjpref_Checkbox_Hidden" id="Label_HSCMath2U" >HSC 2U Adv Maths</label>
                            </div>
                            <div className="Y11_Subjpref_Div_Hidden">
                                <input type="checkbox" className="Subjpref_Checkbox_Hidden" id="s_pref_Y11_EngA" name="Y11EngA2U" value="Y11EngA2U" onChange={trackCoursesSelection}></input>
                                <label for="s_pref_Y11_EngA" className="Subjpref_Checkbox_Hidden" id="Label_Y11EngA2U">Y11 English Advanced</label>
                            </div>
                            <div className="Y11_Subjpref_Div_Hidden">
                                <input type="checkbox" className="Subjpref_Checkbox_Hidden" id="s_pref_Y11_Chem" name="Y11Chem2U" value="Y11Chem2U" onChange={trackCoursesSelection}></input>
                                <label for="s_pref_Y11_Chem" className="Subjpref_Checkbox_Hidden" id="Label_Y11Chem2U">Y11 Chemistry</label>
                            </div>
                            <div className="Y11_Subjpref_Div_Hidden">
                                <input type="checkbox" className="Subjpref_Checkbox_Hidden" id="s_pref_Y11_Phys" name="Y11Phys2U" value="Y11Phys2U" onChange={trackCoursesSelection}></input>
                                <label for="s_pref_Y11_Phys" className="Subjpref_Checkbox_Hidden" id="Label_Y11Phys2U">Y11 Physics</label>
                            </div>
                            <div className="Y11_Subjpref_Div_Hidden">
                                <input type="checkbox" className="Subjpref_Checkbox_Hidden" id="s_pref_Y11_MaAc" name="Y11Math3U" value="Y11Math3U" onChange={trackCoursesSelection}></input>
                                <label for="s_pref_Y11_MaAc" className="Subjpref_Checkbox_Hidden" id="Label_Y11Math3U">Y11 Maths Accelerated</label>
                            </div>
                            <div className="Y11_Subjpref_Div_Hidden">
                                <input type="checkbox" className="Subjpref_Checkbox_Hidden" id="s_pref_Y11_Ma2U" name="Y11Math2U" value="Y11Math2U" onChange={trackCoursesSelection}></input>
                                <label for="s_pref_Y11_Ma2U" className="Subjpref_Checkbox_Hidden" id="Label_Y11Math2U">Y11 Maths Advanced</label>
                            </div>
                            <div className="Y11_Subjpref_Div_Hidden">
                                <input type="checkbox" className="Subjpref_Checkbox_Hidden" id="s_pref_Y11_Econ" name="Y11Econ2U" value="Y11Econ2U" onChange={trackCoursesSelection}></input>
                                <label for="s_pref_Y11_Econ" className="Subjpref_Checkbox_Hidden" id="Label_Y11Econ2U">Y11 Economics</label>
                            </div>
                            <div className="Y10_Subjpref_Div_Hidden">
                                <input type="checkbox" className="Subjpref_Checkbox_Hidden" id="s_pref_Y10_Ma2U" name="Y10Math2U" value="Y10Math2U" onChange={trackCoursesSelection}></input>
                                <label for="s_pref_Y10_Ma2U" className="Subjpref_Checkbox_Hidden" id="Label_Y10Math2U">Y10 Maths</label>
                            </div>
                            <div className="Y09_Subjpref_Div_Hidden">
                                <input type="checkbox" className="Subjpref_Checkbox_Hidden" id="s_pref_Y09_MAdv" name="Y09Math2U" value="Y09Math2U" onChange={trackCoursesSelection}></input>
                                <label for="s_pref_Y09_MAdv" className="Subjpref_Checkbox_Hidden" id="Label_Y09Math2U">Y09 Maths Advanced</label> 
                            </div>
                        </div>
                    </div>
                    <div> 
                        
                        <button className='Continue_Button' type="button" id="submit_button" onClick={submitHandlerSuper}>Continue</button>
                    </div>
                </form>
            </div>
        </>
    );
}



export default CoursePrefForm;