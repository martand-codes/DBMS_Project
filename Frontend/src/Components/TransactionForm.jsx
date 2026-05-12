import { useEffect, useState } from "react";
import SummaryCards from "./SummaryCards.jsx";
import API from "../api/axios";

const TransactionForm = ({ fetchSummary, fetchTransactions, editingTransaction, setEditingTransaction }) => {

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        type: "expense",
        category_id: "",
        transaction_date: ""
    });

    // Fetch Categories
    const fetchCategories = async () => {

        try {

            const response = await API.get("/categories");

            setCategories(response.data);

        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {

        if (editingTransaction) {

        setFormData({
            title: editingTransaction.title,
            amount: editingTransaction.amount,
            type: editingTransaction.type,
            category_id: editingTransaction.category_id || "",
            transaction_date:
                editingTransaction.transaction_date.split("T")[0]
            });

        }

    }, [editingTransaction]);

    // Handle Input Change
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    // Submit Form
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingTransaction) {

                await API.put(
                `/transactions/${editingTransaction.id}`,
                formData
                );

                setEditingTransaction(null);

            } else {

                    await API.post("/transactions", formData);

            }
            await fetchSummary();
            await fetchTransactions();
            alert("Transaction Added Successfully");

            setFormData({
                title: "",
                amount: "",
                type: "expense",
                category_id: "",
                transaction_date: ""
            });

        } catch (err) {
            console.log(err);
        }

    };

    // Filter categories by type
    const filteredCategories = categories.filter(
        (category) => category.type === formData.type
    );

    return (

        <div className="bg-white shadow-lg rounded-2xl p-6 mt-8">

            <h2 className="text-2xl font-bold mb-6">
                Add Transaction
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >

                {/* Title */}
                <input
                    type="text"
                    name="title"
                    placeholder="Transaction Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                {/* Amount */}
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                {/* Type */}
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                >

                    <option value="expense">
                        Expense
                    </option>

                    <option value="income">
                        Income
                    </option>

                </select>

                {/* Category */}
                <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                    required
                >

                    <option value="">
                        Select Category
                    </option>

                    {
                        filteredCategories.map((category) => (

                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>

                        ))
                    }

                </select>

                {/* Date */}
                <input
                    type="date"
                    name="transaction_date"
                    value={formData.transaction_date}
                    onChange={handleChange}
                    className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all"
                >
                    Add Transaction
                </button>

            </form>

        </div>

    );

};

export default TransactionForm;