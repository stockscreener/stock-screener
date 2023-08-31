import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { checkIfPremium, joinPremium } from "../services/user";
import { useState } from "react";

function JoinPremium() {
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(()=>{
        isPremium()
    },[])

    const isPremium = async ()=>{
       let response = await checkIfPremium()
       if(response && response['status'] === 200){
            setIsSubscribed(response.data)
       }
    }
    const subscribe = async () => {
        try {
            const response = await joinPremium();
            if (response.status === 200) {
                toast.success(response.data);
                setIsSubscribed(true);
            } else {
                toast.error("Try again later");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Premium Plan Includes</h2>
            <div className="card p-3 px-5">
                <div className="section text-right mb-3">
                    <p>
                        Welcome to our Premium Stock Screener Membership, your gateway to an elevated investment experience. Unleash the power of data-driven decision-making with exclusive access to our advanced stock screening tools and resources. As a premium member, you'll enjoy a suite of benefits designed to give you a competitive edge in the world of investing:
                    </p>
                </div>
                <div className="section">
                    <h5><strong>Advanced Screening Algorithms:</strong></h5>
                    <p>
                        Gain access to cutting-edge stock screening algorithms that allow you to filter through thousands of stocks based on your preferred criteria. Identify hidden gems and potential opportunities with ease.
                    </p>
                </div>
                <div className="section">
                    <h5><strong>Customizable Metrics and Filters:</strong></h5>
                    <p>
                        Tailor your search to your unique investment preferences. Customize metrics and filters to align with your risk tolerance, investment horizon, and sector preferences.
                    </p>
                </div>
                <div className="section">
                    <h5><strong>Real-Time Data Insights:</strong></h5>
                    <p>
                        Access up-to-the-minute data and insights to make informed decisions. Stay ahead of market movements and capitalize on opportunities as they arise.
                    </p>
                </div>
                <div className="section">
                    <h5><strong>Exclusive Company Reports:</strong></h5>
                    <p>
                        Delve deeper into the stocks that pique your interest with comprehensive company reports. Gain insights into financials, performance history, competitive landscape, and analyst opinions.
                    </p>
                </div>
                <div className="section">
                    <h5><strong>Portfolio Integration and Tracking:</strong></h5>
                    <p>
                        Effortlessly integrate your stock screening results into your investment portfolio. Track the performance of your selected stocks and receive alerts when predefined thresholds are met.
                    </p>
                </div>
            </div>
            <div className="section mt-3 text-center ">
                <button className="btn btn-primary rounded-3 pt-3" onClick={subscribe} disabled={isSubscribed}>
                    <h4>{isSubscribed ? "Subscribed" : "Join Premium"}</h4>
                </button>
            </div>
        </div>



    );
}

export default JoinPremium;

