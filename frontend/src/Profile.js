// Example for Profile.js
import React, {useState} from 'react';
import EvaPropic from './assets/images/eva-propic.png'
import './Profile.css';
import { Doughnut } from "react-chartjs-2";
import { GiTortoise, GiSnail, GiRabbit } from "react-icons/gi";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Tooltip as TooltipInfo} from 'react-tooltip'
import {CiCircleQuestion} from "react-icons/ci";


const Profile = () => {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const [personalGoal, setPersonalGoal] = useState("short")

    return <div>
        <div className="propic-container">
            <img src={EvaPropic}  alt="propic"/>
        </div>
        <div className="header-intro">Hello <snap className="user-name">Eva</snap>!</div>
        <h2>
            Your investment goal
            <CiCircleQuestion
                data-tooltip-id="my-tooltip"
                data-tooltip-content="You might prefer a more active, short-term style of trading, a long-term-oriented approach holding for years, or a mix of the two!"
                data-tooltip-place="bottom"
            />
        </h2>
        <div className="goals-container">
            <div
                className={`financial-goal ${personalGoal === "short" ? "active" : ""}`}
                onClick={() => setPersonalGoal("short")}
            >
                <GiRabbit className="icon" size={40} />
                <p>Short term</p>
            </div>
            <div
                className={`financial-goal ${personalGoal === "medium" ? "active" : ""}`}
                onClick={() => setPersonalGoal("medium")}
            >
                <GiTortoise className="icon" size={40} />
                <p>Medium term</p>
            </div>
            <div
                className={`financial-goal ${personalGoal === "long" ? "active" : ""}`}
                onClick={() => setPersonalGoal("long")}
            >
                <GiSnail className="icon" size={40} />
                <p>Long term</p>
            </div>
        </div>
        <h2>Your account activities</h2>
        <Doughnut data = {{
            labels: ['Trading', 'Payment', 'Income', 'Forex'],
            datasets: [
                {
                    label: '# of transactions',
                    data: [90, 4, 15, 4],
                    backgroundColor: [
                    '#474747',
                    '#707070',
                    '#999999',
                    '#c2c2c2'
                    ],
                    borderWidth: 1,
                },
            ],
            }}
          options={{
              plugins: {
                  legend: {
                      display: true,
                      labels: {
                          font: {
                              family: "SwissquoteRegular"
                          }
                      }
                  }
              },
          }
          }
        />
        <TooltipInfo id="my-tooltip" />
    </div>;
};

export default Profile;