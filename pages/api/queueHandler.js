import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'lib', 'queue.json');

export const getOrders = () => {
  const queue = fs.readFileSync(filePath);
  const queueObject = JSON.parse(queue);
  return queueObject.sort((a, b) => (a.deadline > b.deadline ? 1 : -1));
};

export default function handler(req, res) {
  const { client, pages, received, deadline } = req.body;
  const newOrder = {
    id: new Date(),
    client,
    pages,
    received,
    deadline,
  };
  const queue = fs.readFileSync(filePath);
  const queueObject = JSON.parse(queue);

  if (req.method === 'POST') {
    queueObject.push(newOrder);
    fs.writeFileSync(filePath, JSON.stringify(queueObject));
    res.status(200).json({ orders: queueObject });
  }

  if (req.method === 'GET') {
    const orderedByDeadline = queueObject.sort((a, b) =>
      a.deadline > b.deadline ? 1 : -1
    );
    res.status(200).json({ orders: orderedByDeadline });
  }

  if (req.method === 'DELETE') {
    const newQueue = queueObject.filter((order) => {
      console.log(req.body.id);
      return order.id !== req.body.id;
    });
    fs.writeFileSync(filePath, JSON.stringify(newQueue));

    res.status(200).json({ orders: queueObject });
  }
}
