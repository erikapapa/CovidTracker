import React from 'react';
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
import {dateHeaders} from '../../utilities/methods';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    
  },
};


type Props = {
  data: any
}

const labels = dateHeaders();

const BarGraph: React.FC<Props> = (props: Props) => {

  const data = {
    labels,
    datasets: props.data
  };

  return <Bar options={options} data={data} />;
}

export default BarGraph;