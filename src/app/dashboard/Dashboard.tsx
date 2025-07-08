"use client";

import { useState } from "react";
import Filters from "./Filters";
import TransactionList from "./TransactionList";

export enum DateOrder {
    ASC = "asc",
    DESC = "desc",
    NONE = "none",
}

const Dashboard = () => {
    const [dateFrom, setDateFrom] = useState<string>("");
    const [dateTo, setDateTo] = useState<string>("");
    const [dateOrder, setDateOrder] = useState<DateOrder>(DateOrder.NONE);

    return (
        <>
            <Filters setDateFrom={setDateFrom} setDateTo={setDateTo} setDateOrder={setDateOrder} dateOrder={dateOrder} />
            <TransactionList dateFrom={dateFrom} dateTo={dateTo} dateOrder={dateOrder} />
        </>
    );
}

export default Dashboard;