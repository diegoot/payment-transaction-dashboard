"use client";

import { useEffect, useState, useMemo } from "react";
import { Order } from "./Dashboard";
import Error from "../components/Error";

interface Transaction {
    id: number;
    date: string;
    description: string;
    amount: number;
}

interface TransactionListProps {
    dateFrom: string;
    dateTo: string;
    dateOrder: Order;
    amountOrder: Order;
}

const TransactionList = ({ dateFrom, dateTo, dateOrder, amountOrder }: TransactionListProps) => {
    const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const getTransactions = async (): Promise<Transaction[]> => {
            const response = await fetch("/api/transactions");
            const data = await response.json();
            return data as Transaction[];
        }
        setLoading(true);
        getTransactions().then(transactions => {
            setAllTransactions(transactions);
            setLoading(false);
        }).catch((e) => {
            setLoading(false);
            setError(e.message);
        });
    }, []);

    // Derive filtered and sorted transactions and totalAmount
    const filteredTransactions = useMemo(() => {
        let filtered = allTransactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            if (dateFrom && dateTo) {
                return transactionDate >= new Date(dateFrom) && transactionDate <= new Date(dateTo);
            } else if (dateFrom) {
                return transactionDate >= new Date(dateFrom);
            } else if (dateTo) {
                return transactionDate <= new Date(dateTo);
            }
            return true;
        });
        if (dateOrder === Order.ASC) {
            filtered = [...filtered].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        } else if (dateOrder === Order.DESC) {
            filtered = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
        if (amountOrder === Order.ASC) {
            filtered = [...filtered].sort((a, b) => a.amount - b.amount);
        } else if (amountOrder === Order.DESC) {
            filtered = [...filtered].sort((a, b) => b.amount - a.amount);
        }
        return filtered;
    }, [allTransactions, dateFrom, dateTo, dateOrder, amountOrder]);

    const totalAmount = useMemo(() => {
        return filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
    }, [filteredTransactions]);

    if (loading) {
        return (
            <div className="text-center py-8 text-gray-500">
                Loading transactions...
            </div>
        );
    }

    if (filteredTransactions.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No transactions to show
                {error && <Error title="Failed to load transactions" detail={error} />}
            </div>
        );
    }

    return (
        <div className="p-4">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto shadow-md rounded-lg relative group">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredTransactions.map((transaction) => (
                            <tr key={transaction.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {transaction.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(transaction.date).toLocaleDateString('en-US', { timeZone: 'UTC',   year: 'numeric', month: 'long', day: 'numeric' })}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    {transaction.description}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <span className={`font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        ${Math.abs(transaction.amount).toFixed(2)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
                {filteredTransactions.map((transaction) => (
                    <div key={transaction.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-medium text-gray-900">ID: {transaction.id}</span>
                            <span className={`text-sm font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                ${Math.abs(transaction.amount).toFixed(2)}
                            </span>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                            {new Date(transaction.date).toLocaleDateString('en-US', { timeZone: 'UTC',   year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <div className="text-sm text-gray-900">
                            {transaction.description}
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="w-full mt-4">
                <div className="flex flex-row justify-between items-center bg-gray-100 rounded px-4 py-2">
                    <span className="text-sm font-bold text-gray-800">
                        Total Transactions: {filteredTransactions.length}
                    </span>
                    <span className="text-sm font-bold text-gray-800">
                        Total Amount: ${totalAmount.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default TransactionList;
