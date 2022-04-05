import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Fragment, useState, useEffect } from 'react';
import MyDocument from '../components/PDF/pdftest';

const PDF = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Fragment>
      {isClient && (
        <PDFDownloadLink document={<MyDocument />} fileName="INVOICE">
          {({ loading }) =>
            loading ? (
              <button>Loading document...</button>
            ) : (
              <button>Download</button>
            )
          }
        </PDFDownloadLink>
      )}
      <MyDocument />
    </Fragment>
  );
};

export default PDF;
