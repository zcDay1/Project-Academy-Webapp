import React, { useState, createContext, useContext, useEffect } from 'react';
import { Context } from "../context"; 
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

export const TimetableForm = () => {

    // from here: HELPFUL!!! https://stackoverflow.com/questions/62634114/stop-rendering-before-data-load-using-hooks
    const {response: subscriptions, isLoading} = useFetch('https://pg-app-kp1ok8p4uahhpfuhjhssc4iuepk87x.scalabl.cloud/1/classes/Timetable?where=%7B%22type%22%3A%22class%22%2C%20%22week%22%3A%22template%22%7D', {
        headers: {
            'X-Parse-Application-Id': '9cxDFDarIMWWW9I54HV1zRVU9wi9bax98fU8dEN4',
            'X-Parse-REST-API-Key': '1hPo7Ff0MZIuuWO5DJlRCwojXpliB1t5bw3OTdHn'
        }
    });


    const { items, setItems } = useContext(Context);
    const navigate = useNavigate();

    var selectedTimeSlotsName = [];
    var selectedTimeSlotsId = [];
    var numSelectedTimeSlots = 0;

    useEffect(() => {
        // this method in useEffect() hook runs after the component has been mounted to react DOM.
        // otherwise before I implemented this, it always runs before the elements were loaded leading to errors.
        // //console.log(document.getElementById("HSCEngA2U"));
        
        // showing all the course timeslots
        // needs to be put here otherwise the code fails: only works after all the elements are loaded/rendered into DOM.
        // items[0].currselectedcourses = array of coursesCheckbox.value
        ////console.log(`items[0].currselectedcourses info ${items[0].currselectedcourses}`);


    }, []);

    const handleDivClick = (event) => {
        if (event.target.id === "_FULL_CAPACITY") {
            waitlist();
            //console.log("FULL CAPACITY DETECTED");
        } else {
            var nameToId;
            if (event.target.id.substring(0, 1) != "_") {
                
                nameToId = event.target.id.substring(1);
                //console.log(`nametoid ${nameToId}`);
                ////console.log(event.target.id);
                ////console.log(nameToId);
                document.getElementById(nameToId).checked = true;
                ////console.log(document.getElementById(nameToId).checked);
            } else {
                nameToId = event.target.id;
            }
    
    
    
            // code copy pasted and adapted from TrackTimetableSelection(event) function below.
            // I HAVE NOT CHECKED IF THIS SAVES THE DATA TO ITEMS[] CORRECTLY!!!
            // CHECK HERE IF DATA SAVING ISSUES HAPPEN.
            //console.log(`console log ${event.target.id.substring(0, 2)}`);
            if (event.target.id.substring(0, 2) != "l_" && document.getElementById(nameToId).checked === true) {
                numSelectedTimeSlots++;
                //console.log(`numselectedtimeslots++ handle div click() ${nameToId}`);
    
                for (let indx = 0; indx < selectedTimeSlotsId.length; indx++) {
                    const element = document.getElementById(selectedTimeSlotsId[indx]).name;
    
                    if (element === document.getElementById(nameToId).name) {
                        selectedTimeSlotsId.splice(indx, 1);
                        selectedTimeSlotsName.splice(indx, 1);
    
                        ////console.log(`spliced ${element}`);
                        numSelectedTimeSlots--; 
                    }
                    ////console.log(`2 [${selectedTimeSlotsId[indx]}] \n`);
                }
                
                ////console.log(`pushed++numselTS ${numSelectedTimeSlots}`);
                selectedTimeSlotsId.push(document.getElementById(nameToId).id);
                selectedTimeSlotsName.push(document.getElementById(nameToId).value);
            }
        }
        

    };

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    
    const submitHandlerSuper = () => {
        delay(300).then(() => (document.getElementById("submit_button").innerText = "Loading ."));
        delay(700).then(() => (document.getElementById("submit_button").textContent = "Loading . ."));
        delay(1200).then(() => (document.getElementById("submit_button").innerText = "Loading . . ."));
        delay(2500).then(() => submitHandler());
    };




    const submitHandler = (event) => {
        window.scrollTo(0, 0);
        if (event) {
            event.preventDefault(); 
        }
        /*
        setItems((items) => [...items, document.getElementById("firstName").value]);
        setItems((items) => [...items, document.getElementById("lastName").value]);
        setItems((items) => [...items, document.getElementById("s_mob_num").value]);
        setItems((items) => [...items, document.getElementById("s_email").value]);
        */


        //setItems(items.push(document.getElementById("s_email").value));
        //setItems(items.push(document.getElementById("lastName").value));
        ////console.log(`selected timeslots name ${selectedTimeSlotsName}`);
        ////console.log(`selected timeslots id ${selectedTimeSlotsId}`);
        ////console.log(`num selected timeslots ${numSelectedTimeSlots}`);
        //signup();
        if (numSelectedTimeSlots < items[0].numselectedcourses) {
            
            alert(`Please select a time for each course.`);
            document.getElementById(`submit_button`).innerText = "Continue";

        } else if (numSelectedTimeSlots > items[0].numselectedcourses) {

            alert(`Please select only one timeslot for each course.`);
            document.getElementById(`submit_button`).innerText = "Continue";

        } else if (selectedTimeSlotsName.length === items[0].numselectedcourses) {
            // items[0].selectedtimeslots
            //setItems((items) => [...items, selectedTimeSlotsName]);
            items[0][`data__selected-times1`] = selectedTimeSlotsName;

            var iterator = 0;
            var mappedNamesArray = [];
            while (iterator < selectedTimeSlotsName.length) {
                //console.log("iterator iterator");
                //console.log(selectedTimeSlotsName[iterator]);

                var substring_time = selectedTimeSlotsName[iterator].substring(10, 21);
                var substring_time1 = selectedTimeSlotsName[iterator].substring(10, 19);

                var substring_branch = selectedTimeSlotsName[iterator].substring(22, 31);

                //console.log(`time substring ${substring_time}`);

                if (substring_time.substring(9, 11) === "AM") {
                    substring_time = `${substring_time1}` + "am";
                } else if (substring_time.substring(9, 11) === "PM") {
                    substring_time = `${substring_time1}` + "pm";
                }
                //console.log(`substringtime ${substring_time.substring(8,10)}`);
                mappedNamesArray.push(`${mapNames(selectedTimeSlotsName[iterator])} - ${substring_time} - ${substring_branch} - `); 
                iterator++;
            }
            
            var iterator1 = 1;
            while (iterator1 < mappedNamesArray.length) {
                mappedNamesArray[iterator1] = ` ` + `${mappedNamesArray[iterator1]}`;

                iterator1++;
            }


            items[0][`data__selected-times`] = mappedNamesArray.toString();

            //console.log("tostring tostring");
            //console.log(mappedNamesArray);
            
            numSelectedTimeSlots = 0;

            // extra long 3 sec fade in animation
            document.getElementById("root").className = "root_animation3";
            navigate("/enquiries/final-review");
        }
        // 
    };

    function mapNames(mapname) {
        var mappedName = "";
        var mapnamed = mapname.substring(0, 9);
        //console.log("mapnamed");
        //console.log(mapnamed);

        if (mapnamed === "HSC_EngA2") {
            mappedName = "HSC English Advanced";
        } else if (mapnamed === "HSC_Chem2") {
            mappedName = "HSC Chemistry";
        } else if (mapnamed === "HSC_Econ2") {
            mappedName = "HSC Economics";
        } else if (mapnamed === "HSC_Phys2") {
            mappedName = "HSC Physics";
        } else if (mapnamed === "HSC_Math4") {
            mappedName = "HSC 4U Maths";
        } else if (mapnamed === "HSC_Math3") {
            mappedName = "HSC 3U Maths";
        } else if (mapnamed === "HSC_Math2") {
            mappedName = "HSC 2U Maths";
        } else if (mapnamed === "Y11_EngA2") {
            mappedName = "Y11 English Advanced";
        } else if (mapnamed === "Y11_Chem2") {
            mappedName = "Y11 Chemistry";
        } else if (mapnamed === "Y11_Phys2") {
            mappedName = "Y11 Physics";
        } else if (mapnamed === "Y11_Econ2") {
            mappedName = "Y11 Economics";
        } else if (mapnamed === "Y11_Math3") {
            mappedName = "Y11 Maths Accelerated";
        } else if (mapnamed === "Y11_Math2") {
            mappedName = "Y11 Maths Advanced";
        } else if (mapnamed === "Y10_Math2") {
            mappedName = "Y10 Maths Advanced";
        } else if (mapnamed === "Y09_Math2") {
            mappedName = "Y09 Maths Advanced";
        }
        return mappedName;
    };


    // 2023-jan-30
    const waitlist = () => {
        // NOTE: THIS WORKS, BUT ONLY IF YOU CLICK BACK PAGE BUTTON AND CLICK ONLY THE SUBMIT BUTTON AGAIN
        // MAYBE THE ABOVE SETITEMS((ITEMS) => [...ITEMS, ETC]) ONLY SAVES TO CONTEXT AFTER LEAVING THE PAGE!
        alert(`This class is only accepting waitlists. To be part of the waitlist, please send an email to enquiries@projectacademy.com.au.
            `);
            document.getElementById(`submit_button`).innerText = "Continue";
    }

    const signup = () => {
        // NOTE: THIS WORKS, BUT ONLY IF YOU CLICK BACK PAGE BUTTON AND CLICK ONLY THE SUBMIT BUTTON AGAIN
        // MAYBE THE ABOVE SETITEMS((ITEMS) => [...ITEMS, ETC]) ONLY SAVES TO CONTEXT AFTER LEAVING THE PAGE!
        alert(`User Created!`);
    }

    // NEEDS TAILORING
    const trackTimetableSelection = (event) => {
        if (event.target.id === `"_FULL_CAPACITY"`) {
            waitlist();
        } else {

            if (event.target.checked === true) {
                numSelectedTimeSlots++;
                //console.log(`num selected timeslots incremented ${numSelectedTimeSlots}`);
    
                for (let indx = 0; indx < selectedTimeSlotsId.length; indx++) {
                    const element = document.getElementById(selectedTimeSlotsId[indx]).name;
    
                    if (element === event.target.name) {
                        selectedTimeSlotsId.splice(indx, 1);
                        selectedTimeSlotsName.splice(indx, 1);
    
                        numSelectedTimeSlots--;
                        //console.log(`num selected timeslots decreased ${numSelectedTimeSlots} and spliced ${element}`);
                    }
                    ////console.log(`2 [${selectedTimeSlotsId[indx]}] \n`);
                }
                
                ////console.log(`pushed++numselTS ${numSelectedTimeSlots}`);
                selectedTimeSlotsId.push(event.target.id);
                selectedTimeSlotsName.push(event.target.value);
            }

        }

    }; 






    



    function DynamicTimetable(timeslot_info) {
        //console.log(`TIMESLOT INFO RECEIVED: ${timeslot_info}`);
        ////console.log(`yelloooooooo ${subscriptions.results}`);

        var list_elements = [];
        var fetched_objs = [];
        var timeslot_options = [];

        var substring0;
        var substring1;
        var substring2;
        var substring3;
        var substring4;
        var substring5;
        var substring6;
        var substring7;

        for (var i = 0; i < subscriptions.results.length; i++) {

            const thing = subscriptions.results[i];

            substring0 = '';
            substring1 = '';
            substring2 = '';
            substring3 = '';
            substring4 = '';
            substring5 = '';
            substring6 = '';
            substring7 = '';

            // 2023-jan-30

            //console.log(`thing`);
            //console.log(thing);
            
            fetched_objs.push(thing);
            //console.log(`fetched_objs.length ${fetched_objs.length}`);

                const element = subscriptions.results[i];
                // //console.log(`THIS IS WHERE ${JSON.stringify(element)}`);

                // year - "HSC or Y11 - Y09"
                substring0 = JSON.stringify(element.focus);
                ////console.log(`element focus for substr 0 ${element.focus}`);
                substring0 = substring0.substring(1, 4);
                ////console.log(`substr0 from 1-4 ${substring0}`);

                // subject - "Math Mat2-Mat4 Chem Econ Phys EAdv"
                substring1 = JSON.stringify(element.focus).substring(5, 9);
                ////console.log(`substr1 ${substring1}`);

                // day - "M TU W TH F SA-1-2-3 SU-1-2-3"
                substring2 = JSON.stringify(element.day);
                substring2 = substring2.substring(1, 3);
                //console.log(`substr2 ${substring2}`);

                // time
                substring3 = JSON.stringify(element.time).substring(1, 8);

                // substring 4 is underneath the if statements
                

                // location "random room names or zoom or TBA"
                substring5 = JSON.stringify(element.location);

                // tier of class lite, pro, etc
                // var substring6 = element. ;
                
                ////console.log(`YEEEEEEEEEEEEEEEEE ${substring0} + ${substring1} + ${substring2} + ${substring3} + ${substring4} + ${substring5}`);
                
                
                //
                if (substring1 === "EAdv") {
                    substring1 = "EngA2";
                } else if (substring1 === "Chem") {
                    substring1 = "Chem2";
                } else if (substring1 === "Phys") {
                    substring1 = "Phys2";
                } else if (substring1 === "Econ") {
                    substring1 = "Econ2";
                } else if (substring1 === "Mat4") {
                    substring1 = "Math4";
                } else if (substring1 === "Mat3") {
                    substring1 = "Math3";
                } else if (substring1 === "Mat2") {
                    substring1 = "Math2";
                } else if (substring1 === "MatA") {
                    // Y11 normal math
                    substring1 = "Math2";
                } else if (substring1 === "Math") {
                    // Y10 normal math
                    // Y09 normal math
                    substring1 = "Math2";
                }

                if (substring2 === 'M"') {
                    substring2 = "Mon";
                } else if (substring2 === "TU") {
                    substring2 = "Tue";
                } else if (substring2 === 'W"') {
                    substring2 = "Wed";
                } else if (substring2 === "TH") {
                    substring2 = "Thu";
                } else if (substring2 === 'F"') {
                    substring2 = "Fri";
                } else if (substring2 === 'SA') {
                    substring2 = "Sat";
                } else if (substring2 === 'SU') {
                    substring2 = "Sun";
                }

                if (element.tier === "Lite") {
                    substring5 = "Online";
                } else if (substring5 === "TBA") {
                    substring5 = "TBA";
                } else {
                    substring5 = "On Campus";
                }

                if (element.focus === "HSC.Mat4") {
                    console.log(element);
                }

                // english text or info about class
                //const substring4 = JSON.stringify(element.lesson);
                if (substring1 === "EngA2" && substring0 === "HSC") {
                    substring4 = `Text: ${element.lesson}`;
                } else {
                    if (element.tier === "Lite") {
                        substring4 = "Normal stream online class.";
                    } else {
                        substring4 = "Normal stream Chatswood class.";
                        // = JSON.stringify(`Normal stream ` + element.branch + ` class.`);
                    }
                }

                substring7 = `${element.location}`;
                substring6 = '';

                if (element.assigned.length >= 17) {
                    if (element.location === "Cube") {
                        substring6 = "At_Capacity";
                        //console.log("console log CUBE");
                    } else if (element.location === "Forest") {
                        substring6 = "At_Capacity";
                        //console.log("console log FOREST");
                    } else if (element.location === "zoom" || element.location === "Berry") {
                        substring6 = "At_Capacity";
                        //console.log("console log ZOOM");
                    }
                } else if (element.assigned.length >= 11) {
                    if (element.location === "Coconut") {
                        substring6 = "At_Capacity";
                        //console.log("console log COCONUT");
                    } else if (element.location === "Mango") {
                        substring6 = "At_Capacity";
                        //console.log("console log MANGO");
                    }
                } else {
                    substring6 = "Not_At_Capacity";
                }


                //console.log(`current spots ${element.assigned.length}`);

                var timeslot_string;
                var timeslot_year;

                timeslot_string = timeslot_info.substring(3, 8);
                ////console.log(`THIS TIMESLOT INFO PART ${timeslot_string}`);
                timeslot_year = timeslot_info.substring(0, 3);
                ////console.log(`substr0 from 1-4 ${substring0}`);
                ////console.log(`THIS TIMESLOT INFO PART 2 ${timeslot_year}`);

                if (substring0 === timeslot_year && substring1 === timeslot_string) {
                    
                    var timeslotStringArray = [`${substring0}`, `${substring1}`, `${substring2} ${substring3}`, `${substring4}`, `${substring5}`, `${substring6}`, `${substring7}`];
                    //console.log(`passed if condition, the timeslotstringarray pushed to timeslot_options is:`);
                    //console.log(`${timeslotStringArray}`);
                    timeslot_options.push(timeslotStringArray);
                }
        }


        list_elements = [];
            
        for (let index = 0; index < timeslot_options.length; index++) {

            var div_common = `${timeslot_options[index][0]}_${timeslot_options[index][1]}_${timeslot_options[index][2]}_${timeslot_options[index][4]}`;
            var div_id = `d_${div_common}`;
            
            var checkbox_id;
            if (timeslot_options[index][5] === "At_Capacity") {
                checkbox_id = "_FULL_CAPACITY";
                //console.log(`FAILED FULL CAPCITY CHECK CHECKBOX_ID ${checkbox_id} ${timeslot_options[index][2]}`);
            } else {
                //console.log(`PASSED FULL CAPACITY CHECK`);
                checkbox_id = `_${div_common}`;
            }
            
            var checkbox_name = `_${timeslot_options[index][0]}_${timeslot_options[index][1]}`;
            var div_checkbox_value = div_common;
            
            var div_label_id = `l_${div_common}`;
    
            var div_timeslot_info_description_id = `r_${div_common}`;
            var div_timeslot_info_location_id = `o_${div_common}`;




            var list;
            if (checkbox_id === "_FULL_CAPACITY") {

                list = 
                <>
                <div className="Timetable_Div_Shown" id={checkbox_id} onClick={handleDivClick}>
                    <div className="timetable_container" id={div_id}>
                        <div className='Timetable_Group' id={div_id}>
                            <div className='Timetable_Checkbox_Cross' id={checkbox_id}>❌</div>
                            <label className='Timetable_Checkbox_Label' for={checkbox_id} id={checkbox_id}>{timeslot_options[index][2]}</label>
                            <p className="Timetable_Div_Desc" id={checkbox_id}>{timeslot_options[index][3]}</p>
                        </div>
                        <div className='Timetable_Div_Campus'>
                            <p className='Timetable_Location' id={checkbox_id}>{timeslot_options[index][4]}</p>
                        </div>
                    </div>
                </div>
                </>;

            } else if (timeslot_options[index][4] === "Online") {

                list = 
                <>
                <div className="Timetable_Div_Shown" id={div_id} onClick={handleDivClick}>
                    <div className="timetable_container" id={div_id}>
                        <div className='Timetable_Group' id={div_id}>
                            <input className='Timetable_Checkbox' type="radio" id={checkbox_id} name={checkbox_name} value={div_checkbox_value} onChange={trackTimetableSelection}></input>
                            <label className='Timetable_Checkbox_Label' for={checkbox_id} id={div_label_id}>{timeslot_options[index][2]}</label>
                            <p className="Timetable_Div_Desc" id={div_timeslot_info_description_id}>{timeslot_options[index][3]}</p>
                        </div>
                        <div className='Timetable_Div_Online'>
                            <p className='Timetable_Location' id={div_timeslot_info_location_id}>{timeslot_options[index][4]}</p>
                        </div>
                    </div>    
                </div>
                </>;

            } else if (timeslot_options[index][4]  === "On Campus") {

                list = 
                <>
                <div className="Timetable_Div_Shown" id={div_id} onClick={handleDivClick}>
                    <div className="timetable_container" id={div_id}>
                        <div className='Timetable_Group' id={div_id}>
                            <input className='Timetable_Checkbox' type="radio" id={checkbox_id} name={checkbox_name} value={div_checkbox_value} onChange={trackTimetableSelection}></input>
                            <label className='Timetable_Checkbox_Label' for={checkbox_id} id={div_label_id}>{timeslot_options[index][2]}</label>
                            <p className="Timetable_Div_Desc" id={div_timeslot_info_description_id}>{timeslot_options[index][3]}</p>
                        </div>
                        <div className='Timetable_Div_Campus'>
                                <p className='Timetable_Location' id={div_timeslot_info_location_id}>{timeslot_options[index][4]}</p>
                        </div>
                    </div>
                </div>
                </>;

            } 

            list_elements.push(list);
        }


        return (
            list_elements
        );
    };






    
    function DynamicTimetable2() {
        var list_subjects = [];
        for (let index = 0; index < items[0][`data__selected-options1`].length; index++) {
            

            var subj_name = items[0][`data__selected-options1`][index];
            var subject = "";

            if (subj_name.substring(3, 8) === 'EngA2') {
                subject = "English Advanced";
            } else if (subj_name.substring(3, 8) === 'Math2') {
                subject = "Maths Advanced";
            } else if (subj_name.substring(3, 8) === 'Math3') {
                subject = "3U Maths";
            } else if (subj_name.substring(3, 8) === 'Math4') {
                subject = "4U Maths";
            } else if (subj_name.substring(3, 8) === 'Econ2') {
                subject = "Economics";
            } else if (subj_name.substring(3, 8) === "Chem2") {
                subject = "Chemistry";
            } else if (subj_name.substring(3, 8) === "Phys2") {
                subject = "Physics";
            }


//
            var ts_string = items[0][`data__selected-options1`][index];
            ts_string = ts_string.substring(3, 8);

            var ts_year = items[0][`data__selected-options1`][index];
            ts_year = ts_year.substring(0, 3);

            ////console.log(`ts_Year = ${ts_year}`);
            if (ts_string === 'EngA2') {
                ts_string = "EAdv";
            } else if (ts_string === 'Math2') {
                ts_string = "Mat2";
            } else if (ts_string === 'Math3') {
                ts_string = "Mat3";
            } else if (ts_string === 'Math4') {
                ts_string = "Mat4";
            } else if (ts_string === 'Econ2') {
                ts_string = "Econ";
            } else if (ts_string === "Chem2") {
                ts_string = "Chem";
            } else if (ts_string === "Phys2") {
                ts_string = "Phys";
            }
            ////console.log(`ts string = ${ts_string}`);

            if (ts_year === "Y11" && subject === "3U Maths") {
                subj_name = `${ts_year} Maths Accelerated`;
            } else {
                subj_name = `${ts_year} ${subject}`;
            }
            
            ////console.log(`subj overall ${subj_name}`);

            var subject_internal_elements = 
            <>
                <div className='Timetable_Subj_Shown'>
                    <div className='Linebreak_Div'></div>
                    <p className='Timetable_Subjname'>{subj_name}</p>

                    {isLoading && <div>Loading...</div>}
                    {!isLoading && (
                        <div>{DynamicTimetable(items[0][`data__selected-options1`][index])}</div>
                    )}

                </div>
            </>;
            ////console.log(subject_internal_elements);
            ////console.log(`subject internal elements`);
            list_subjects.push(subject_internal_elements);
        }

        return (
            list_subjects
        );
    };





    if (items[0][`data__selected-options1`] === null) {
        navigate("/enquiries/course");
        // putting an alert here will have it run 4 times.
    } else {
        return (
            <>
                <div className='Central_Col_1_2_3'>
                    <div className='Ticker'>
                        <div className='Ticker_Filled'></div>
                        <div className='Ticker_Filled'></div>
                        <div className='Ticker_Filled'></div>
                        <div className='Ticker_Filled'></div>
                        <div className='Ticker_Unfilled'></div>
                        <div className='Ticker_Unfilled'></div>
                    </div>
                    <div className='Subtitle'>4 of 6</div> 
                </div>
               
                <div className="Central_Timetable_Div">
                    <div>
                        <h1 className='Title_H1_Timetable'>Timetable</h1>
                    </div>
                    <form>
                        <div>{DynamicTimetable2()}</div>
                    </form>
                </div>
                <button className='Timetable_Continue_Button' onClick={submitHandlerSuper} id="submit_button">Continue</button>
            </>
        );
    }


}

export default TimetableForm;