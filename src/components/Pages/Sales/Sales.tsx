import React, { FC, useEffect } from "react";
import styles from "./Sales.module.scss";
import Summary from "../../Summary/Summary";
import DataControl from "../../DataControl/DataControl";
import { useSales } from "./useSales";
import Table from "../../Table/Table";
import { useFormatDate } from "../../../hooks/useFormatDate";
import { CustomerType } from "../../../models/CustomerType";
import { SaleType } from "../../../models/SaleType";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../store/store";

interface SalesProps {}

const Sales: FC<SalesProps> = () => {
  const { formik, data, events, states, setters, analyze } = useSales();

  const { sales, clients } = data;
  const { onChange_selectRow } = events;
  const { setSelectedRows } = setters;
  const { summaries } = analyze;
  const columns = [`id`, `Date`, `Customer`, `Quantity`, `Total Amount`];

  const rows = sales.map((sale: SaleType) => {
    const dateString = new Date(sale.date).toISOString();
    const justDate = new Date(dateString).toLocaleDateString().split(`.`).join(`/`);
    const justTime = new Date(dateString).toLocaleTimeString().slice(0, 5);

    const formattedDate = `${justDate} ${justTime}`;

    const customers = clients.map((client: CustomerType) => {
      if (client._id === sale.customerId) {
        console.log("true");
        
        return `${client.firstName} ${client.lastName}`;
      }
    });
    return {
      id: sale._id,
      date: formattedDate,
      customer: customers,
      quantity: sale.productsSold.reduce((sum, product) => (sum += product.quantity), 0),
      totalAmount: `$${sale.totalAmount}`,
    };
  });


  return (
    <div className={styles.Sales}>
      <Summary analysisObject={summaries} />
      <DataControl data={[]} formikbag={formik} filterFields={[]} filterFunctions={{ "": () => { return []; } }} initStateFormik={{}}/>
      <div className={styles.salesTable}>
        <Table
          columns={columns}
          valueRows={rows}
          onChange_selectRow={onChange_selectRow}
          setSelectedRows={setSelectedRows}
        />
      </div>
    </div>
  );
};

export default Sales;
