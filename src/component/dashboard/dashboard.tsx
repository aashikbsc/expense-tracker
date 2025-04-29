import React, { useState } from 'react';
import Authentication from '../authentication/Authentication';
import { addAPI, deleteAPI, getBudgetAPI, listAPI, updateAPI } from '../../services/TransactionService';

const Dashboard = () => {
    const [balance, setBalance] = useState<number>(0);
    const [expense, setExpense] = useState<number>(0);
    const [budget, setBudget] = useState<number>(0);
    const [transactions, setTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isUpdated, setIsUpdated] = useState<boolean>(false);

    React.useEffect(() => {
        listTransactions();
    }, [isUpdated])
    const listTransactions = async () => {
        const result: any = await listAPI();
        if (result.result) {
            setTransactions(result.result);
            let totalExpense = 0;
            for (let i = 0; i < result.result.length; i++) {
                const element = result.result[i]
                totalExpense += element.amount;
            }
            setExpense(totalExpense);
            getBudget(totalExpense);
        } else {
            let data: any = [
                {
                    id: '680f87b42ae8a279fef84816',
                    title: 'cofee',
                    amount: 5,
                    created_at: "2025-04-28T13:50:44.535Z"
                },
                {
                    id: '680f87a22ae8a279fef84811',
                    title: 'food',
                    amount: 125,
                    created_at: "2025-04-28T13:50:26.648Z"
                },
                {
                    id: '680f85ef2ae8a279fef84800',
                    title: 'trip',
                    amount: 2000,
                    created_at: "2025-04-28T13:43:11.934Z"
                },
                {
                    id: '680f83462ae8a279fef847ed',
                    title: 'petrol',
                    amount: 400,
                    created_at: "2025-04-28T13:31:50.761Z"
                }
            ]
            setTransactions(data);
        }
    }
    const getBudget = async (expense: any) => {
        const result: any = await getBudgetAPI();
        setBudget(result.budget);
        setBalance(result.budget - expense)
    }
    const handleAddExpense = async () => {
        const title = prompt("Enter expense title:");
        const amount = prompt("Enter expense amount:");
        if (title && !isNaN(Number(amount))) {
            const result = await addAPI({
                title: title,
                amount: amount,
            })
            setIsUpdated(!isUpdated)
            console.log("ADD API RESULT : ", result)
        }
    };

    const handleAddBudget = async () => {
        const budget = prompt("Enter budget amount:");
        if (budget && !isNaN(Number(budget))) {
            const result = await updateAPI({
                budget: budget,
            })
            console.log("UPDATE API RESULT : ", result)
            setBudget(Number(budget));
        }
    };

    const handleRemoveTransaction = async (id: number) => {
        const result = await deleteAPI({
            id: id,
        })
        console.log("DELETE API RESULT : ", result)
    };

    const handleSignout = () => {
        localStorage.removeItem("token")
        setIsUpdated(!isUpdated)
    }


    const filteredTransactions = transactions.filter((transaction: any) =>
        transaction.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    React.useEffect(() => {
        let data = [
            {
              id: '680f87b42ae8a279fef84816',
              title: 'cofee',
              amount: 5,
              created_at: "2025-04-28T13:50:44.535Z"
            },
            {
              id: '680f87a22ae8a279fef84811',
              title: 'food',
              amount: 125,
              created_at: "2025-04-28T13:50:26.648Z"
            },
            {
              id: '680f85ef2ae8a279fef84800',
              title: 'trip',
              amount: 2000,
              created_at: "2025-04-28T13:43:11.934Z"
            },
            {
              id: '680f83462ae8a279fef847ed',
              title: 'petrol',
              amount: 400,
              created_at: "2025-04-28T13:31:50.761Z"
            }
          ]
        console.log("groupByMonth(data);", groupByMonth(data));
    }, [])
    const groupByMonth = (data: any) => {
        return data.reduce((acc: any, item: any) => {
            const createdAt = new Date(item.created_at); // Ensure it's a Date object
            const yearMonth = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}`;
            if (!acc[yearMonth]) {
                acc[yearMonth] = [];
            }
            acc[yearMonth].push(item);
            return acc;
        }, {});
    }

    return (
        <div className="dashboard-container">
            <Authentication callback={() => setIsUpdated(!isUpdated)} />
            <header>
                <h1>ASHI</h1>
                <h2>Expense Tracker</h2>
                {localStorage.getItem("token") && (
                    <button 
                        className="sign-out-button"
                        onClick={() => handleSignout()}
                    >
                        Sign Out
                    </button>
                )}
            </header>

            {localStorage.getItem("token") && (
                <>
                    <div className="balance-card glass-effect">
                        <h3>Balance ₹{balance.toLocaleString()}</h3>
                    </div>
                    <div className="control-group glass-effect">
                        <button 
                            className="control-button add-button"
                            onClick={handleAddExpense}
                        >
                            ADD
                        </button>
                    </div>

                    <div className="controls-container">
                        <div className="control-group glass-effect">
                            <button 
                                className="control-button add-button"
                            >
                                Expense
                            </button>
                            <div className="control-details">
                                <span>₹{expense.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="control-group glass-effect">
                            <button 
                                className="control-button budget-button"
                                onClick={handleAddBudget}
                            >
                                Budget
                            </button>
                            <div className="control-details">
                                <span>₹{budget.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="transactions-container">
                        <h3>Transactions</h3>
                        <div className="search-container glass-effect">
                            <input
                                type="text"
                                placeholder="Search here"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="transactions-list">
                            {filteredTransactions.map((transaction: any) => (
                                <div key={transaction.id} className="transaction-item glass-effect">
                                    <div className="transaction-info">
                                        <span className="transaction-title">{transaction.title}</span>
                                        <span className="transaction-value">₹{transaction.amount.toLocaleString()}</span>
                                    </div>
                                    <button
                                        className="remove-button"
                                        onClick={() => handleRemoveTransaction(transaction.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;