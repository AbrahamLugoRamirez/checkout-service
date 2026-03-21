# Checkout Service API

## 📌 Description

Backend service built with NestJS to manage products and process transactions with a simulated payment flow.

This project implements a complete checkout flow including:

* Product management
* Transaction creation
* Payment simulation (SUCCESS / FAILED)
* Stock validation and update

---

## 🚀 Technologies

* NestJS
* TypeORM
* SQLite
* Jest
* Swagger

---

## ⚙️ Installation

```bash
npm install
```

---

## ▶️ Run project

```bash
npm run start:dev
```

---

## 📡 API Documentation

Swagger available at:

```
http://localhost:3000/api
```

---

## 🧪 Run tests

```bash
npm run test
npm run test:cov
```

### 📊 Coverage

* Statements: 86%
* Lines: 83%

---

## 💳 Payment Flow

1. Create transaction → `PENDING`
2. Simulate payment result:

   * SUCCESS
   * FAILED
3. If SUCCESS:

   * Update transaction status
   * Reduce product stock

---

## 🔐 Validations

* DTOs implemented using `class-validator`
* Automatic request validation enabled globally

---

## ⚠️ Notes

* Payment integration is simulated for testing purposes
* The system is designed to be easily integrated with real payment gateways (e.g. Wompi)

---

## 👤 Author

Abraham Lugo Ramirez
