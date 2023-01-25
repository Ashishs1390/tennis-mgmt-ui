import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { forEach } from "lodash";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function CompetancyAggrGraph(props) {
    const [labels, setLabels] = useState([]);
    const [graphDataPlayer, setGraphDataPlayer] = useState({});
    const [graphDataCoach, setGraphDataCoach] = useState({});
    const [graphDataParent, setGraphDataParent] = useState({});
    const [dataSet, setDataSet] = useState([]);


    useEffect(() => {
        props.data.forEach((each) => {
            for (let e in each) {
                if (e == "player") {
                    console.log(each[e]);
                    setLabels(Object.keys(each[e]));
                    setDataSet(oldArray => [...oldArray,{
                        label: 'Player',
                        maxBarThickness: 8,
                        minBarLength: 2,
                        backgroundColor: '#ea3943',
                        borderColor: '#ea3943',
                        borderWidth: 1,
                        hoverBackgroundColor: '#ea3943',
                        hoverBorderColor: '#ea3943',
                        data: Object.values(each[e])
                    }]);
                }else
                if (e == "coach") {
                    setDataSet(oldArray => [...oldArray, {
                        label: 'Coach',
                        maxBarThickness: 8,
                        minBarLength: 2,
                        backgroundColor: '#0c96f3',
                        borderColor: '#0c96f3',
                        borderWidth: 1,
                        hoverBackgroundColor: '#0c96f3',
                        hoverBorderColor: '#0c96f3',
                        data: Object.values(each[e])
                    }]);
                }else
                if (e == "parent") {
                    setDataSet(oldArray => [...oldArray, {
                        label: 'Parent',
                        maxBarThickness: 8,
                        minBarLength: 2,
                        backgroundColor: 'rgba(25, 210, 116, 0.85)',
                        borderColor: 'rgba(25, 210, 116, 0.85)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(25, 210, 116, 0.85)',
                        hoverBorderColor: 'rgba(25, 210, 116, 0.85)',
                        data: Object.values(each[e])
                    }]);
                }
            }
        })
    }, [props]);

    // useEffect(() => {
    //     return (() => {
    //         setDataSet([]);
    //     })   
    // })

    useEffect(() => {
        console.log('--------dataSet----------')
        console.log(dataSet);
    }, [dataSet])
    const options = {
        indexAxis: 'y',
        legend: {
            display: false
        },
        scales: {
            x: {
                min: 0,
                max: 10
            }

        },
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right'
            }
        },
        layout: {
            padding: 1
        }
       
    };


    const dataBar = {
        labels: [...labels],
        datasets: [
            ...dataSet
        ]
    };

    return (
        <div>
            <Bar data={dataBar} options={options} />
        </div>
    )
};

export default CompetancyAggrGraph;

