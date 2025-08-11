<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Admin Panel - Orders</title>
  <link rel="stylesheet" href="admin.css" />
</head>
<body>
  <div class="admin-container">
    <h1>Admin Panel - Orders</h1>
    <?php if (!isset($_SESSION['orders']) || count($_SESSION['orders']) === 0): ?>
      <p>No orders yet.</p>
    <?php else: ?>
      <?php foreach ($_SESSION['orders'] as $index => $order): ?>
        <div class="order-card">
          <h2>Order #<?= $index + 1 ?> - <span class="order-time"><?= htmlspecialchars($order['timestamp']) ?></span></h2>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price (RM)</th>
                <th>Subtotal (RM)</th>
              </tr>
            </thead>
            <tbody>
              <?php
                $total = 0;
                foreach ($order['items'] as $item):
                  $subtotal = $item['price'] * $item['quantity'];
                  $total += $subtotal;
              ?>
                <tr>
                  <td><?= htmlspecialchars($item['name']) ?></td>
                  <td><?= intval($item['quantity']) ?></td>
                  <td><?= number_format($item['price'], 2) ?></td>
                  <td><?= number_format($subtotal, 2) ?></td>
                </tr>
              <?php endforeach; ?>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3"><strong>Total</strong></td>
                <td><strong><?= number_format($total, 2) ?></strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
      <?php endforeach; ?>
    <?php endif; ?>
  </div>
</body>
</html>
