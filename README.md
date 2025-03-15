# ERP Agent

A comprehensive Enterprise Resource Planning (ERP) system built with Next.js, Material-UI, and PostgreSQL. This system helps businesses manage their inventory, sales, purchases, clients, cash flow, and expenses in one centralized platform.

## Features

- **Dashboard**
  - Overview of key metrics
  - Sales and revenue trends
  - Visual data representation

- **Inventory Management**
  - Track stock levels
  - Manage product information
  - Low stock alerts
  - SKU and category management

- **Sales Management**
  - Create and manage sales orders
  - Client selection
  - Real-time pricing calculation
  - Sales history tracking

- **Purchase Management**
  - Create purchase orders
  - Supplier management
  - Cost tracking
  - Purchase history

- **Cash Register**
  - Track cash inflow and outflow
  - Daily transaction summary
  - Balance tracking
  - Transaction history

- **Expense Management**
  - Categorize expenses
  - Track spending patterns
  - Expense reports and analytics
  - Monthly and category-wise breakdown

## Tech Stack

- **Frontend**
  - Next.js 14
  - React
  - TypeScript
  - Material-UI
  - Tailwind CSS
  - Recharts for data visualization

- **Backend**
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL Database

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/erp-agent.git
   cd erp-agent
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   - Copy `.env.example` to `.env`
   - Update the database connection string and other required variables

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
erp-agent/
├── app/                    # Next.js app directory
│   ├── inventory/         # Inventory management
│   ├── sales/            # Sales management
│   ├── purchases/        # Purchase management
│   ├── cash/             # Cash register
│   └── expenses/         # Expense management
├── components/            # Reusable React components
├── prisma/               # Database schema and migrations
├── public/               # Static assets
└── styles/               # Global styles
```

## Database Schema

The system uses a PostgreSQL database with the following main entities:
- Users
- Items (Products)
- Clients
- Suppliers
- Sales
- Purchases
- Expenses
- Cash Register Transactions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
