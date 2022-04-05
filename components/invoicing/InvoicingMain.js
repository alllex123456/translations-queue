import classes from './InvoicingMain.module.css';
import { useEffect, useState } from 'react';
import ClientStatement from './ClientStatement';

const InvoicingMain = (props) => {
  const [invoicing, setInvoicing] = useState([]);

  useEffect(() => {
    fetch('/api/invoicing/get-invoices')
      .then((res) => res.json())
      .then((data) => setInvoicing(data.message));
  }, []);

  return <section>none</section>;
};

export default InvoicingMain;
