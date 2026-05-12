import {
    IndianRupee,
    TrendingUp,
    TrendingDown
} from "lucide-react";

const SummaryCards = ({ summary }) => {

    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

            {/* Income */}
            <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-green-500">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-gray-500 text-sm">
                            Total Income
                        </p>

                        <h2 className="text-2xl font-bold text-green-600 mt-2">
                            ₹ {summary.totalIncome}
                        </h2>

                    </div>

                    <TrendingUp className="text-green-500" size={32} />

                </div>

            </div>

            {/* Expense */}
            <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-red-500">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-gray-500 text-sm">
                            Total Expense
                        </p>

                        <h2 className="text-2xl font-bold text-red-600 mt-2">
                            ₹ {summary.totalExpense}
                        </h2>

                    </div>

                    <TrendingDown className="text-red-500" size={32} />

                </div>

            </div>

            {/* Balance */}
            <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-blue-500">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-gray-500 text-sm">
                            Current Balance
                        </p>

                        <h2 className="text-2xl font-bold text-blue-600 mt-2">
                            ₹ {summary.balance}
                        </h2>

                    </div>

                    <IndianRupee className="text-blue-500" size={32} />

                </div>

            </div>

        </div>

    );

};

export default SummaryCards;
