import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const options = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#F23A1D', '#FFCBC4'],
  chart: {
    fontFamily: 'sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#0A1540', '#12295D'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 100,
  },
};

const ChartOne = () => {
  const [state, setState] = useState({
    series: [
      {
        name: 'Questions',
        data: [],
      },
      {
        name: 'Users',
        data: [],
      },
    ],
  });

  useEffect(() => {
    axios.get('/api/monthly-stats')
      .then(response => {
        const months = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const questionsData = Array(12).fill(0);
        const usersData = Array(12).fill(0);

        response.data.forEach(stat => {
          const monthIndex = months.indexOf(stat.month);
          if (monthIndex !== -1) {
            questionsData[monthIndex] = stat.questionCount;
            usersData[monthIndex] = stat.userCount;
          }
        });

        setState({
          series: [
            {
              name: 'Questions',
              data: questionsData,
            },
            {
              name: 'Users',
              data: usersData,
            },
          ],
        });
      })
      .catch(error => console.error('Error fetching monthly stats:', error));
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-[20px] shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
      <div className="flex flex-wrap flex-row items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex flex-row w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5 flex-row w-1/2">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#F23A1D]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#F23A1D]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Questions</p>
              <div className="text-sm font-medium flex flex-nowrap w-full">01.01.2023 - 12.12.2024</div>
            </div>
          </div>
          <div className="flex flex-row w-[40%]">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#F23A1D]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#FFCBC4]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Total Users</p>
              <p className="text-sm font-medium flex flex-nowrap w-full">01.01.2023 - 12.12.2024</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
