import React, { useState } from 'react';

function FeedbackForm() {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle the form submission here
        console.log('Feedback submitted:', feedback);
    };

    const handleCancel = () => {
        // You can handle the cancel action here
        console.log('Feedback canceled');
    };

    return (
        <div>
            <h1>Feedback Form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="feedback">Your Feedback:</label><br />
                <textarea
                    id="feedback"
                    name="feedback"
                    rows="4"
                    cols="50"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
                <br /><br />
                <button type="submit">Submit Feedback</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
}

export default FeedbackForm;
