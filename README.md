# Flame Restaurant 

A simple web-based restaurant menu and ordering system.

## Features

- View today's randomly selected menu picks
- Browse the full menu with images
- Add items to a cart and place orders
- Admin panel to view all orders (session-based)
- Responsive and modern UI

## Project Structure

```
admin.css         # Styles for the admin panel
admin.php         # Admin panel to view orders
app.js            # Main JavaScript for menu and cart logic
data.php          # Backend for storing and retrieving orders (session-based)
index.html        # Main customer-facing page
style.css         # Main site styles
img/              # Menu item and background images
```

## Usage

1. Place the project in your PHP server root (e.g., `htdocs` for XAMPP).
2. Start your PHP server (e.g., Apache via XAMPP).
3. Open [http://localhost/flame-restoran-main/index.html](http://localhost/flame-restoran-main/index.html) in your browser.

### Placing Orders

- Browse the menu and add items to your cart.
- Click "My Cart" to review your order.
- Click "Place Order" to submit. Orders are stored in the PHP session.

### Admin Panel

- Click the "Admin Panel" button to view all orders placed during the session.

## Notes

- Orders are stored in PHP sessions and will reset when the session expires or the server restarts.
- No authentication is implemented.
- Images for menu items should be placed in the `img/` folder with filenames matching the lowercase, spaceless item names (e.g., `friedrice.png`).

## Credits

Web Developed by Elven Tan Kean Hong.
Web Designed by Tey Sukorn.

(C) 2025 Flame Restaurant.
(C) 2025 Excess Tools Holdings Sdn. Bhd.
