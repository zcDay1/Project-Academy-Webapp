import React from 'react';
import { useNavigate } from 'react-router-dom';

function StartForm() {

    const navigate = useNavigate();

    const submitHandler = (event) => {
        window.scrollTo(0, 0);
        if (event) {
            event.preventDefault(); 
        }

        // the following is what causes the fade in animation, it needs to specify different classes with different animations
        // in order for it to not be ignored by the compiler.
        document.getElementById("root").className = "root_animation1";
        navigate("/enquiries/student-info");
    };

    return (
        <>
        <div className='Central_Col_1_2_3'> 
            <div className='Ticker'>
                <div className='Ticker_Unfilled'></div>
                <div className='Ticker_Unfilled'></div>
                <div className='Ticker_Unfilled'></div>
                <div className='Ticker_Unfilled'></div>
                <div className='Ticker_Unfilled'></div>
                <div className='Ticker_Unfilled'></div>
            </div>
            <div className='Subtitle'>Est. time to complete: 2 minutes</div>
            <div className='Start_Div'>
                <img className='Start_Image' src={require('../image_1.png')} alt=""></img>
                <div className='Start_Text_Div'>
                    <h3 className='Start_H3'>1. Complete this enquiry form</h3>
                    <p className='Start_P'>Choose your subjects, class times, and enter your details so we can personalise our program to you.</p>
                </div>
            </div>
            <div className='Start_Div'>
                <img className='Start_Image' src={require('../image_2.png')} alt=""></img>
                <div className='Start_Text_Div'>
                    <h3 className='Start_H3'>2. Pay the $50 refundable bond to confirm class</h3>
                    <p className='Start_P'>For a refundable $50, lock in your spot & have all your resources including the iPad setup.</p>
                </div>
            </div>
            <div className='Start_Div'>
                <img className='Start_Image' src={require('../image_3.png')} alt=""></img>
                <div className='Start_Text_Div'>
                    <h3 className='Start_H3'>3. Our team will get in touch before your class</h3>
                    <p className='Start_P'>Our team will reach out to welcome you and set you up before your first class!</p>
                </div>
            </div>
            <div>
                <button className='Continue_Button' type="submit" onClick={submitHandler}>Continue</button>
            </div>
        </div>

        </>
    );
}

export default StartForm;