# ⚙️ Payment Backend (NestJS + Wompi)

Backend service built with **NestJS** that handles payment processing using **Wompi API**.

---

## 🚀 Features

* 💳 Tokenization of credit cards
* 💰 Transaction creation
* 🔄 Transaction status polling
* 🧾 Transaction management
* 🔐 Secure handling of payment data

---

## 🏗️ Tech Stack

* NestJS
* Axios
* Wompi API
* TypeScript

---

## 📂 Modules

* `payments` → Handles payment creation
* `transaction` → Manages transaction status

---

## ⚙️ Installation

```bash
npm install
npm run start:dev
```

---

## 🔑 Environment Variables

Create a `.env` file:

```env
WOMPI_PUBLIC_KEY=your_public_key
WOMPI_PRIVATE_KEY=your_private_key
WOMPI_INTEGRITY_KEY=your_integrity_key
```

---

## 🔌 API Endpoints

### Create Payment

```http
POST /payments/create
```

**Body:**

```json
{
  "card": {
    "number": "4242424242424242",
    "exp_month": "12",
    "exp_year": "25",
    "cvc": "123",
    "card_holder": "John Doe"
  },
  "amount": 100000,
  "email": "test@test.com"
}
```

---

### Get Transaction Status

```http
GET /payments/:id
```

---

### Update Transaction Status (internal)

```http
PATCH /transactions/:id/:status
```

---

## 🔄 Payment Flow

1. Receive card data
2. Generate token with Wompi
3. Create transaction
4. Store transaction locally
5. Return transaction ID
6. Frontend polls status

---

## ⚠️ Important Notes

* Card data is not persisted
* Always use test cards
* Follow PCI compliance practices

---

## 👩‍💻 Author

Abraham Lugo Ramirez
