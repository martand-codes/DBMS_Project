import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const FinanceChart = ({ summary }) => {

    const data = [
        {
            name: "Income",
            value: summary.totalIncome
        },
        {
            name: "Expense",
            value: summary.totalExpense
        }
    ];

    const COLORS = ["#22c55e", "#ef4444"];

    return (

        <div className="bg-white shadow-lg rounded-2xl p-6 mt-8">

            <h2 className="text-2xl font-bold mb-6">
                Finance Overview
            </h2>

            <div className="w-full h-100">

                <ResponsiveContainer>

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            label
                        >

                            {
                                data.map((entry, index) => (

                                    <Cell
                                        key={index}
                                        fill={COLORS[index]}
                                    />

                                ))
                            }

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

};

export default FinanceChart;