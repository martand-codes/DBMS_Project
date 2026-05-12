import { useEffect, useState } from "react";

import Navbar from "./Components/Navbar.jsx";
import SummaryCards from "./Components/SummaryCards.jsx";
import TransactionForm from "./Components/TransactionForm.jsx";
import TransactionTable from "./Components/TransactionTable.jsx";

import API from "./Api/axios.js";

function App() {

    const [summary, setSummary] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0
    });

    const fetchSummary = async () => {

        try {

            const response = await API.get("/transactions/summary");

            setSummary({...response.data});

        } catch (err) {
            console.log(err);
        }

    };

    const [transactions, setTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const fetchTransactions = async () => {

      try {

        const response = await API.get("/transactions");

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

        <div className="min-h-screen bg-gray-100">

            <Navbar balance={summary.balance} />

            <div className="max-w-7xl mx-auto px-6">

                <SummaryCards summary={summary} />
                
                <TransactionForm 
                  fetchSummary={fetchSummary}
                  fetchTransactions={fetchTransactions}
                  editingTransaction={editingTransaction}
                  setEditingTransaction={setEditingTransaction}
                />

                <TransactionTable
                  transactions={transactions}
                  fetchTransactions={fetchTransactions}
                  fetchSummary={fetchSummary}
                  setEditingTransaction={setEditingTransaction}
                />
            </div>

        </div>

    );

}

export default App;
