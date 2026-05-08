import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const RevenueChart = ({
  data,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow p-8">
      
      <h2 className="text-3xl font-bold mb-8">
        Revenue Overview
      </h2>

      <div className="h-96">
        
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>
            
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;