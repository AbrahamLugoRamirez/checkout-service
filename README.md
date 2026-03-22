# 🛒 Checkout Service

A payment API that simulates a real e-commerce checkout flow integrating **Wompi** for credit card transaction processing.

---

# 🚀 Getting Started

## 📦 Installation

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the backend:

```env
PORT=3000
WOMPI_BASE_URL=https://api-sandbox.co.uat.wompi.dev/v1
WOMPI_PUBLIC_KEY=your_public_key
WOMPI_PRIVATE_KEY=your_private_key
WOMPI_EVENTS_KEY=your_events_key
WOMPI_INTEGRITY_KEY=your_integrity_key
```

---

## 🔌 Environment Setup

Environment variables are loaded using:

```ts
import * as dotenv from 'dotenv';
dotenv.config();
```

---

## ▶️ Run the Application

```bash
npm run start:dev
```

Production:

```bash
npm run build
npm run start:prod
```

---

## 🌐 Base URL

```text
http://localhost:3000
```

---

## 📚 API Documentation (Swagger)

```text
http://localhost:3000/api
```

---

# 🧠 Architecture

Frontend (React) → Backend (NestJS) →  Database (SQLite) → Wompi

---

# ⚙️ Technologies

* Backend: NestJS, TypeORM, SQLite, Axios, Swagger
* Frontend: React, Redux
* Integration: Wompi

---

# 📦 API Endpoints

## 🛍️ Products

* `GET /products` → List products
* `GET /products/seed` → Seed test data

## 💳 Transactions

* `POST /transactions` → Create transaction
* `PATCH /transactions/{id}/{status}` → Update status
* `GET /transactions/signature` → Generate signature

## 💰 Payments

* `POST /payments/create` → Process payment
* `GET /payments/{id}` → Check payment status
* `GET /payments/acceptance-tokens` → Get Wompi tokens

---

# 🔄 Payment Flow

1. Fetch products:

```bash
GET /products
```

2. Send payment data:

```bash
POST /payments/create
```

Example body:

```json
{
  "card": {
    "number": "4242424242424242",
    "exp_month": "12",
    "exp_year": "28",
    "cvc": "123",
    "card_holder": "Test User"
  },
  "amount": 50000,
  "email": "test@test.com",
  "productId": 1
}
```

3. Backend processes payment with Wompi

4. Check transaction status:

```bash
GET /payments/{transactionId}
```

5. Update status:

* APPROVED → SUCCESS
* DECLINED → FAILED

---

# ✅ Transaction States

* `PENDING` → Processing
* `APPROVED` → Success
* `DECLINED` → Rejected
* `FAILED` → Error

---

# 🧪 Database

* SQLite
* Stores products and transactions

---

# 🧪 Test Coverage

The backend is tested using **Jest**, covering controllers, services, and business logic.

### 📊 Coverage Summary

```text
Statements   : 93.7%
Functions    : 89.2%
Lines        : 92.2%
```

> ✅ Meets the required **80%+ coverage threshold**

---

### ▶️ Run Tests

```bash
npm run test
```

### 📈 Coverage Report

```bash
npm run test:cov
```

---

# ☁️ Deployment

The backend is deployed on **AWS EC2 (Free Tier)**.

### 🌍 API URL

```text
http://<your-ec2-ip>:3000
```

---

# ⚠️ Common Issues

### ❌ Invalid URL error

```text
ERR_INVALID_URL: undefined/tokens/cards
```

#### ✅ Solution:

* Ensure `.env` exists
* Verify `dotenv.config()` is executed
* Restart the application

---

# 🔐 Security Notes

* Never expose private keys in frontend
* Use sandbox credentials for testing
* Rotate keys if exposed

---

# ⚠️ Considerations

* Uses Wompi sandbox environment
* Do not use real credit cards
* Basic frontend validations

---

# 🔥 Future Improvements

* Webhooks (replace polling)
* JWT authentication
* Idempotency for payments
* Logging & monitoring
* Docker support

---

# 👨‍💻 Author

Abraham Lugo Ramirez

Backend Developer | APIs | Payment Integrations

---

# ⭐ Project Value

* Real payment gateway integration
* REST API design
* Transaction state management
* Clean architecture with NestJS

---
