import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const datass = [
  {
    name: 'Page A',
    hours: [10, 20],
  },
  {
    name: 'Page B',
    hours: 30,
  },
  {
    name: 'Page C',
    hours: 4,
  }
];

const yaxisHrs = [5, 10, 15, 20];

type Props = {
  color: string
  data: any[]
}

const BarGraph: React.FC<Props> = (props: Props) => {
  const {color, data} = props;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="hours" fill={color}/>
      </BarChart>
    </ResponsiveContainer>
  );
}


export default BarGraph
