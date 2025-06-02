import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from "recharts";

const data = [
  {
    name: 'May 1, 2025',
    sales: 2400,
  },
  {
    name: 'May 5, 2025',
    sales: 1398,
  },
  {
    name: 'May 10, 2025',
    sales: 9800,
  },
  {
    name: 'May 15, 2025',
    sales: 3908,
  },
  {
    name: 'May 20, 2025',
    sales: 4800,
  },
  {
    name: 'May 25, 2025',
    sales: 3800,
  },
  {
    name: 'May 30, 2025',
    sales: 4300,
  },
];

export const RevenueGraph = () => {
  return (
    <>
      <div className="h-[calc(100%-32px)] text-sm">
          <ResponsiveContainer width="100%" height="100%">
              <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
              }}
              >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="sales" stroke="#432dd7" fill="#c4b5fd" />
              </AreaChart>
          </ResponsiveContainer>
      </div>
    </>
  )
}

