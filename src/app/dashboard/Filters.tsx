"use client";

import { Order } from "./Dashboard";

interface FiltersProps {
    setDateFrom: (date: string) => void;
    setDateTo: (date: string) => void;
    setDateOrder: (order: Order) => void;
    setAmountOrder: (order: Order) => void;
    dateOrder: Order;
    amountOrder: Order;
}

const Filters = ({ setDateFrom, setDateTo, setDateOrder, dateOrder, setAmountOrder, amountOrder }: FiltersProps) => {
    return (
        <form className="w-full p-4">
            <div className="flex flex-col md:flex-row md:items-end gap-4 w-full">
                {/* Date From */}
                <div className="flex flex-col w-full md:w-auto">
                    <label htmlFor="dateFrom" className="mb-1 text-sm font-medium text-gray-700">Date From</label>
                    <input
                        type="date"
                        id="dateFrom"
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                {/* Date To */}
                <div className="flex flex-col w-full md:w-auto">
                    <label htmlFor="dateTo" className="mb-1 text-sm font-medium text-gray-700">Date To</label>
                    <input
                        type="date"
                        id="dateTo"
                        onChange={(e) => setDateTo(e.target.value)}
                        className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                {/* Date Order */}
                <div className="flex flex-col w-full md:w-auto">
                    <label htmlFor="dateOrder" className="mb-1 text-sm font-medium text-gray-700">Sort By Date</label>
                    <select
                        id="dateOrder"
                        value={dateOrder}
                        onChange={(e) => {setDateOrder(e.target.value as Order); setAmountOrder(Order.NONE);}}
                        className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value={Order.ASC}>Ascending</option>
                        <option value={Order.DESC}>Descending</option>
                        <option value={Order.NONE}>None</option>
                    </select>
                </div>
                {/* Amount Order */}
                <div className="flex flex-col w-full md:w-auto">
                    <label htmlFor="amountOrder" className="mb-1 text-sm font-medium text-gray-700">Sort By Amount</label>
                    <select
                        id="amountOrder"
                        value={amountOrder}
                        onChange={(e) => {setAmountOrder(e.target.value as Order); setDateOrder(Order.NONE);}}
                        className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value={Order.ASC}>Ascending</option>
                        <option value={Order.DESC}>Descending</option>
                        <option value={Order.NONE}>None</option>
                    </select>
                </div>
            </div>
        </form>
    );
}

export default Filters;