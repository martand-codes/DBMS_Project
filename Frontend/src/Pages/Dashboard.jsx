import { useEffect, useState } from "react";

import Navbar from "../Components/Navbar";
import SummaryCards from "../Components/SummaryCards";
import TransactionForm from "../Components/TransactionForm";
import TransactionTable from "../Components/TransactionTable";
import FinanceChart from "../Components/FinanceChart";

import API from "../Api/axios";

const Dashboard = ({ setToken }) => {

    const [summary, setSummary] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0
    });

    const [transactions, setTransactions] = useState([]);

    const [editingTransaction, setEditingTransaction] =
        useState(null);

    // Fetch Summary
    const fetchSummary = async () => {

        try {

            const response =
                await API.get("/transactions/summary");

            setSummary({
                ...response.data
            });

        } catch (err) {

            console.log(err);

        }

    };

    // Fetch Transactions
    const fetchTransactions = async () => {

        try {

            const response =
                await API.get("/transactions");

            setTransactions(response.data);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        fetchSummary();

        fetchTransactions();

    }, []);

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200">

            {/* Navbar */}
            <Navbar
                balance={summary.balance}
                setToken={setToken}
            />

            {/* Main Container */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

                {/* Welcome Section */}
                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
                        Financial Dashboard
                    </h1>

                    <p className="text-slate-500 mt-2 text-lg">
                        Manage your income, expenses and financial insights.
                    </p>

                </div>

                {/* Summary Cards */}
                <SummaryCards summary={summary} />

                {/* Form + Chart Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">

                    {/* Transaction Form */}
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">

                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">

                            <h2 className="text-2xl font-bold text-white">
                                {
                                    editingTransaction
                                    ? "Update Transaction"
                                    : "Add New Transaction"
                                }
                            </h2>

                            <p className="text-blue-100 mt-1 text-sm">
                                Track your financial activities in real time.
                            </p>

                        </div>

                        <div className="p-6">

                            <TransactionForm
                                fetchSummary={fetchSummary}
                                fetchTransactions={fetchTransactions}
                                editingTransaction={editingTransaction}
                                setEditingTransaction={setEditingTransaction}
                            />

                        </div>

                    </div>

                    {/* Chart Section */}
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">

                        <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-4">

                            <h2 className="text-2xl font-bold text-white">
                                Financial Analytics
                            </h2>

                            <p className="text-green-100 mt-1 text-sm">
                                Income vs Expense distribution overview.
                            </p>

                        </div>

                        <div className="p-6">

                            <FinanceChart summary={summary} />

                        </div>

                    </div>

                </div>

                {/* Transaction Table */}
                <div className="mt-10 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">

                    <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50">

                        <div>

                            <h2 className="text-2xl font-bold text-slate-800">
                                Recent Transactions
                            </h2>

                            <p className="text-slate-500 text-sm mt-1">
                                View and manage all your financial records.
                            </p>

                        </div>

                        <div className="bg-slate-900 text-white px-4 py-2 rounded-xl shadow-md">

                            <span className="text-sm text-slate-300">
                                Total Records
                            </span>

                            <p className="font-bold text-lg text-center">
                                {transactions.length}
                            </p>

                        </div>

                    </div>

                    <div className="p-6">

                        {
                            transactions.length === 0 ? (

                                <div className="flex flex-col items-center justify-center py-16 text-center">

                                    <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-4xl mb-4">
                                        📉
                                    </div>

                                    <h3 className="text-2xl font-semibold text-slate-700">
                                        No Transactions Found
                                    </h3>

                                    <p className="text-slate-500 mt-2 max-w-md">
                                        Start by adding your first income or expense transaction to track your finances.
                                    </p>

                                </div>

                            ) : (

                                <TransactionTable
                                    transactions={transactions}
                                    fetchTransactions={fetchTransactions}
                                    fetchSummary={fetchSummary}
                                    setEditingTransaction={setEditingTransaction}
                                />

                            )
                        }

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Dashboard;

