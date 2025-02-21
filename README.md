# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# food-delivery-frontend

### Site Structure

```
.
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│   ├── _redirects
│   ├── header_img.png
│   ├── logo.ico
│   └── vite.svg
├── src
│   ├── App.jsx
│   ├── components
│   │   ├── AppDownload
│   │   │   ├── AppDownload.jsx
│   │   │   └── AppDownloadStyle.css
│   │   ├── ButtonVariants
│   │   │   ├── BackToTop.jsx
│   │   │   └── BackToTopStyle.css
│   │   ├── ExploreMenu
│   │   │   ├── ExploreMenu.jsx
│   │   │   └── ExploreMenuStyle.css
│   │   ├── FoodDisplay
│   │   │   ├── FoodDisplay.jsx
│   │   │   └── FoodDisplayStyle.css
│   │   ├── FoodItem
│   │   │   ├── FoodItem.jsx
│   │   │   └── FoodItemStyle.css
│   │   ├── Footer
│   │   │   ├── Footer.jsx
│   │   │   └── FooterStyle.css
│   │   ├── Header
│   │   │   ├── Header.jsx
│   │   │   └── HeaderStyle.css
│   │   ├── LoginPopup
│   │   │   ├── LoginPopup.jsx
│   │   │   └── LoginPopupStyle.css
│   │   ├── Navbar
│   │   │   ├── Navbar.jsx
│   │   │   └── NavbarStyle.css
│   │   └── UserGreeting
│   │       ├── UserGreeting.Style.css
│   │       └── UserGreeting.jsx
│   ├── constants
│   │   ├── contact.js
│   │   ├── delivery-fee.js
│   │   ├── image-icon.js
│   │   └── menu.js
│   ├── context
│   │   └── StoreContext.jsx
│   ├── index.css
│   ├── main.jsx
│   └── pages
│       ├── Cart
│       │   ├── Cart.jsx
│       │   └── CartStyle.css
│       ├── Home
│       │   └── Home.jsx
│       ├── MyOrders
│       │   ├── MyOrders.jsx
│       │   └── MyOrdersStyle.css
│       ├── PlaceOrder
│       │   ├── PlaceOrder.jsx
│       │   └── PleaceOrderStyle.css
│       ├── UserProfile
│       │   ├── UserProfile.jsx
│       │   └── UserProfileStyle.css
│       └── vertify
│           ├── Verify.jsx
│           └── VerifyStyle.css
└── vite.config.js
```
