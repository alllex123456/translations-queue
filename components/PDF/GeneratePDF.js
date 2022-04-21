import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Button from '../layout/Button';

export default function GeneratePDF(props) {
  function generate() {
    const doc = new jsPDF();
    doc.text(`Total: ${props.total} ${props.currency}`, 15, 15);

    doc.autoTable({
      head: [['Data primirii', 'Volum (ccs)', 'Tarif/pg.', 'Total', 'Note']],
      body: props.client.map(({ received, count, rate, notes }) => {
        return [
          new Date(received).toLocaleDateString('ro'),
          count,
          rate,
          `${(rate, ((count * rate) / 2000).toFixed(2))} ${props.currency}`,
          notes,
        ];
      }),
    });

    doc.save(`${props.client[0].client}-STATEMENT.pdf`);
  }

  return (
    <div>
      <Button onClick={generate} type="primary">
        Download as PDF
      </Button>
    </div>
  );
}
