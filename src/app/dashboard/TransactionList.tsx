"use client";

import { useEffect, useState } from "react";
import { DateOrder } from "./Dashboard";

interface Transaction {
    id: number;
    date: string;
    description: string;
    amount: number;
}

interface TransactionListProps {
    dateFrom: string;
    dateTo: string;
    dateOrder: DateOrder;
}

const TransactionList = ({ dateFrom, dateTo, dateOrder }: TransactionListProps) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
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
            const filteredTransactions = transactions.filter(transaction => {
                const transactionDate = new Date(transaction.date);
                if (dateFrom && dateTo) {
                    console.log("1", transactionDate, "2", new Date(dateFrom), "3", new Date(dateTo))
                    return transactionDate >= new Date(dateFrom) && transactionDate <= new Date(dateTo);
                } else if (dateFrom) {
                    return transactionDate >= new Date(dateFrom);
                } else if (dateTo) {
                    return transactionDate <= new Date(dateTo);
                }
                return true;
            });
            if (dateOrder === DateOrder.ASC) {
                filteredTransactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            } else if (dateOrder === DateOrder.DESC) {
                filteredTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            }
            setTransactions(filteredTransactions);
            setLoading(false);
        }).catch((e) => {
            setLoading(false);
            setError(e.message);
        });
    }, [dateFrom, dateTo, dateOrder]);

    if (loading) {
        return (
            <div className="text-center py-8 text-gray-500">
                Loading transactions...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4">
                <div className="max-w-md mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-lg font-medium text-red-800">
                                    Failed to load transactions
                                </h3>
                                <p className="mt-1 text-sm text-red-700">
                                    {error}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No transactions to show
            </div>
        );
    }

    return (
        <div className="p-4">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto shadow-md rounded-lg">
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
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {transaction.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(transaction.date).toLocaleDateString()}
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
                {transactions.map((transaction) => (
                    <div key={transaction.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-medium text-gray-900">ID: {transaction.id}</span>
                            <span className={`text-sm font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                ${Math.abs(transaction.amount).toFixed(2)}
                            </span>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                            {new Date(transaction.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-900">
                            {transaction.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TransactionList;
