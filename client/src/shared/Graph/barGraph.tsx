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
import { useDate } from '../../hooks/useDate'

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

const BarGraph: React.FC<Props> = (props: Props) => {

  const {
		dateHeaders
	} = useDate();

  const labels = dateHeaders();

  const data = {
    labels,
    datasets: props.data
  };

  return <Bar options={options} data={data} />;
}

export default BarGraph;