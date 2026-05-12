import { Trash2, Pencil } from "lucide-react";


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

    return (

        <div className="bg-white shadow-lg rounded-2xl p-6 mt-8">

            <h2 className="text-2xl font-bold mb-6">
                Transactions
            </h2>

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