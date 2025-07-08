"use client";

import { useState } from "react";
import Filters from "./Filters";
import TransactionList from "./TransactionList";

export enum Order {
    ASC = "asc",
    DESC = "desc",
    NONE = "none",
}

const Dashboard = () => {
    const [dateFrom, setDateFrom] = useState<string>("");
    const [dateTo, setDateTo] = useState<string>("");
    const [dateOrder, setDateOrder] = useState<Order>(Order.NONE);
    const [amountOrder, setAmountOrder] = useState<Order>(Order.NONE);

    return (
        <>
            <Filters setDateFrom={setDateFrom} setDateTo={setDateTo} setDateOrder={setDateOrder} dateOrder={dateOrder} setAmountOrder={setAmountOrder} amountOrder={amountOrder} />
            <TransactionList dateFrom={dateFrom} dateTo={dateTo} dateOrder={dateOrder} amountOrder={amountOrder} />
        </>
    );
}

export default Dashboard;