"use client";

import { useEffect, useState } from "react";

interface Transaction {
    id: number;
    date: string;
    description: string;
    amount: number;
}

const TransactionList = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const getTransactions = async (): Promise<Transaction[]> => {
            const response = await fetch("/api/transactions");
            const data = await response.json();
            return data as Transaction[];
        }
        getTransactions().then(transactions => setTransactions(transactions));
    }, []);

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
