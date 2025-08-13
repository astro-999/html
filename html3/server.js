const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve frontend files from /public

// Store orders in memory
const orders = [];

app.post('/api/order', (req, res) => {
    const order = req.body;
    if (!order || !order.items || order.items.length === 0) {
        return res.status(400).json({ message: 'Invalid order data' });
    }
    order.id = orders.length + 1;
    order.timestamp = new Date();
    orders.push(order);
    res.json({ message: 'Order received successfully', orderId: order.id });
});

app.get('/api/orders', (req, res) => {
    res.json(orders);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
