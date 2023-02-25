import React from 'react';

function FinishPage() {
    return (
        <>
            <div className='Central_Col_1_2_3'>
                <div className='Ticker'>
                    <div className='Ticker_Filled'></div>
                    <div className='Ticker_Filled'></div>
                    <div className='Ticker_Filled'></div>
                    <div className='Ticker_Filled'></div>
                    <div className='Ticker_Filled'></div>
                    <div className='Ticker_Filled'></div>
                </div>
                <h1 className='Title_H1'>There's ONE more step!</h1>
                <div className='Finish_Col'>
                    <div>
                        <h3 className='Final_Title_H3'>👉 Your next steps:</h3>
                        <p className='Final_Text'>Your enquiry has been received and our team will get back to you within 30 minutes with an email that contains a few things you need to do before you start your class.</p>
                        <p className='Final_Text'><strong>Step 1:</strong> Check the email and read through it thoroughly.</p>
                        <p className='Final_Text'><strong>Step 2:</strong> Sign the iPad agreement and pay the refundable $50 iPad bond to secure your resources and class.</p>
                        <p className='Final_Text'><strong>Step 3:</strong> If you ever need to speak to someone over the phone or over a video call, simply reply to our email.</p>
                        <p className='Final_Text'>Finally, to help you understand what to expect, we've made a short video with our students, teachers and alumni about Life at Project.</p>
                        <p className='Final_Text'>We're super excited and hope to see you on campus soon! ❤️</p>
                        <div className='Final_Embed_Div'>
                            <iframe className='Final_Embed_Video' width="951" height="535" src="https://www.youtube.com/embed/uH8TonYlvJk" title="Life at Project Academy" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FinishPage;