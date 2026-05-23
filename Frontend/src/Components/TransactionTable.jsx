import {
    Trash2,
    Pencil,
    ChevronDown,
    ChevronUp
} from "lucide-react";

import { useState } from "react";


import API from "../api/axios";

const TransactionTable = ({
    transactions,
    fetchTransactions,
    fetchSummary,
    setEditingTransaction

}) => {

    const handleDelete = async (id) => {

        try {

            await API.delete(`/transactions/${id}`);

            await fetchTransactions();

            await fetchSummary();

        } catch (err) {

            console.log(err);

        }

    };
    const handleEdit = (transaction) => {

        setEditingTransaction(transaction);

    };

    const [showStats, setShowStats] =
    useState(false);

    const amounts = transactions.map(
        (transaction) => Number(transaction.amount)
    );

    const average =
        amounts.length > 0
        ? (
            amounts.reduce((a, b) => a + b, 0)
            / amounts.length
        ).toFixed(2)
        : 0;

    const maximum =
        amounts.length > 0
        ? Math.max(...amounts)
        : 0;

    const minimum =
     amounts.length > 0
        ? Math.min(...amounts)
        : 0;

    return (

        <div className="bg-white shadow-lg rounded-2xl p-6 mt-8">

            <h2 className="text-2xl font-bold mb-6">
                Transactions
            </h2>

            <div className="mb-6">

                <button
                    onClick={() =>
            setShowStats(!showStats)
        }
        className="
            flex items-center gap-2
            bg-slate-900 text-white
            px-4 py-3 rounded-xl
            hover:bg-slate-800
            transition-all
        "
    >

        Transaction Statistics

        {
            showStats
            ? <ChevronUp size={18} />
            : <ChevronDown size={18} />
        }

    </button>

    {
        showStats && (

            <div
                className="
                    mt-4
                    bg-slate-100
                    p-5
                    rounded-2xl
                    shadow-md
                    grid grid-cols-1 md:grid-cols-3
                    gap-4
                "
            >

                {/* Average */}
                <div className="bg-white p-4 rounded-xl shadow-sm">

                    <h3 className="text-sm text-gray-500">
                        Average Transaction
                    </h3>

                    <p className="text-2xl font-bold text-blue-600">
                        ₹ {Number(average).toLocaleString("en-IN")}
                    </p>

                </div>

                {/* Maximum */}
                <div className="bg-white p-4 rounded-xl shadow-sm">

                    <h3 className="text-sm text-gray-500">
                        Highest Transaction
                    </h3>

                    <p className="text-2xl font-bold text-green-600">
                        ₹ {maximum.toLocaleString("en-IN")}
                    </p>

                </div>

                {/* Minimum */}
                <div className="bg-white p-4 rounded-xl shadow-sm">

                    <h3 className="text-sm text-gray-500">
                        Minimum Transaction
                    </h3>

                    <p className="text-2xl font-bold text-red-600">
                        ₹ {minimum.toLocaleString("en-IN")}
                    </p>

                </div>

            </div>

        )
    }

</div>

            <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                    <thead>

                        <tr className="bg-gray-100 text-left">

                            <th className="p-4">
                                Title
                            </th>

                            <th className="p-4">
                                Amount
                            </th>

                            <th className="p-4">
                                Type
                            </th>

                            <th className="p-4">
                                Category
                            </th>

                            <th className="p-4">
                                Date
                            </th>

                            <th className="p-4">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            transactions.map((transaction) => (

                                <tr
                                    key={transaction.id}
                                    className="border-b"
                                >

                                    <td className="p-4">
                                        {transaction.title}
                                    </td>

                                    <td className="p-4 font-semibold">
                                        ₹ {transaction.amount}
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm text-white
                                            ${
                                                transaction.type === "income"
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                            }`}
                                        >
                                            {transaction.type}
                                        </span>

                                    </td>

                                    <td className="p-4">
                                        {transaction.category}
                                    </td>

                                    <td className="p-4">
                                        {
                                            new Date(
                                                transaction.transaction_date
                                            ).toLocaleDateString()
                                        }
                                    </td>

                                   <td className="p-4">

                                        <div className="flex gap-2">

                                        {/* Edit Button */}
                                            <button
                                                onClick={() => handleEdit(transaction)}
                                                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                                            >

                                                <Pencil size={18} />

                                            </button>

                                        {/* Delete Button */}
                                            <button
                                                onClick={() =>
                                                handleDelete(transaction.id)
                                                }
                                                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                                            >

                                                <Trash2 size={18} />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default TransactionTable;