'use client';
import React, { useEffect, useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';
import "./dashboard.css"
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const Dashboard = () => {
    const [candlestickData, setCandlestickData] = useState(null);
    const [lineChartData, setLineChartData] = useState(null);
    const [barChartData, setBarChartData] = useState(null);
    const [pieChartData, setPieChartData] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/candle/')
            .then(res => res.json())
            .then(data => setCandlestickData(data.data.map(item => [
                new Date(item.x).getTime(),  // Convert date to timestamp
                item.open,
                item.high,
                item.low,
                item.close,
            ])));

        fetch('http://127.0.0.1:8000/api/line/')
            .then(res => res.json())
            .then(data => setLineChartData(data));

        fetch('http://127.0.0.1:8000/api/bar/')
            .then(res => res.json())
            .then(data => setBarChartData(data));

        fetch('http://127.0.0.1:8000/api/pie/')
            .then(res => res.json())
            .then(data => setPieChartData(data));
    }, []);

    const options = {
        series: [
            {
                type: 'candlestick',
                name: 'Stock Price',
                data: candlestickData,
            },
        ],
        xAxis: {
            type: 'datetime',
        },
        yAxis: {
            title: {
                text: 'Price',
            },
        },
    };

    return (
        <div className='dashboard-container'>
            <h1>Dashboard</h1>
            {lineChartData && (
                <div className='chart-wrapper'>
                    <h2>Line Chart</h2>
                    <Line
                        data={{
                            labels: lineChartData.labels,
                            datasets: [
                                {
                                    label: 'Sales',
                                    data: lineChartData.data,
                                    fill: false,
                                    borderColor: 'rgba(75,192,192,1)',
                                },
                            ],
                        }}
                    />
                </div>
            )}
            {candlestickData && (
                <div className='chart-wrapper'>
                    <h2>Candlestick Chart</h2>
                    <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options} />
                </div>
            )}
            {barChartData && (
                <div className='chart-wrapper'>
                    <h2>Bar Chart</h2>
                    <Bar
                        data={{
                            labels: barChartData.labels,
                            datasets: [
                                {
                                    label: 'Sales',
                                    data: barChartData.data,
                                    backgroundColor: 'rgba(75,192,192,0.4)',
                                },
                            ],
                        }}
                    />
                </div>
            )}
            {pieChartData && (
                <div className='chart-wrapper'>
                    <h2>Pie Chart</h2>
                    <Pie
                        data={{
                            labels: pieChartData.labels,
                            datasets: [
                                {
                                    data: pieChartData.data,
                                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                                },
                            ],
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Dashboard;