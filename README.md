# 🛒 Checkout Service

API de pagos que simula un flujo real de e-commerce integrando **Wompi** para procesamiento de transacciones con tarjeta de crédito.

---

## 🚀 Descripción

Este proyecto implementa un flujo completo de pago:

- Consulta de productos  
- Ingreso de datos de tarjeta  
- Creación de transacción  
- Procesamiento de pago con Wompi  
- Validación y actualización de estado  

Diseñado con separación clara entre lógica de negocio y pasarela de pagos.

---

## 🧠 Arquitectura

Frontend (React) → Backend (NestJS) → Wompi  
                             ↓  
                     Base de datos  

---

## ⚙️ Tecnologías

- Backend: NestJS, TypeORM, SQLite, Axios, Swagger  
- Frontend: React, Redux  
- Integración: Wompi  

---

## 🌐 Base URL

http://localhost:3000

---

## 📚 Swagger

http://localhost:3000/api

---

## 📦 Endpoints

### 🛍️ Products
- GET /products → Listar productos  
- GET /products/seed → Datos de prueba  

### 💳 Transactions
- POST /transactions → Crear transacción  
- PATCH /transactions/{id}/{status} → Actualizar estado  
- GET /transactions/signature → Generar firma  

### 💰 Payments
- POST /payments/create → Procesar pago  
- GET /payments/{id} → Consultar estado  
- GET /payments/acceptance-tokens → Tokens Wompi  

---

## 🔄 Flujo de pago

1. Obtener productos:
GET /products  

2. Enviar datos de pago:
POST /payments/create  

Body:
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

3. Backend procesa el pago con Wompi y crea transacción  

4. Consultar estado del pago:
GET /payments/{transactionId}  

5. Actualizar estado:
- APPROVED → SUCCESS  
- DECLINED → FAILED  

---

## ✅ Estados

- PENDING → En proceso  
- APPROVED → Exitoso  
- DECLINED → Rechazado  
- FAILED → Error  

---

## ⚙️ Instalación

npm install

---

## ▶️ Ejecución

npm run start:dev

---

## 🧪 Base de datos

- SQLite local  
- Persistencia de productos y transacciones  

---
## 🧪 Backend Test Coverage

The backend is tested using **Jest**, covering controllers, services, and core business logic.

### 📊 Coverage Summary

```text
Statements   : 93.7%
Functions    : 89.2%
Lines        : 92.2%
```

> ✅ The project meets the required **80%+ coverage threshold** across key metrics.

---

### 📁 High Coverage Modules

| Module       | Statements | Functions | Lines |
| ------------ | ---------- | --------- | ----- |
| Payments     | 100%       | 100%      | 100%  |
| Transactions | 100%       | 100%      | 100%  |
| DTOs         | 100%       | 100%      | 100%  |
| Entities     | 100%       | 100%      | 100%  |
| Modules      | 100%       | 100%      | 100%  |

---

### 🧠 Testing Strategy

* Unit tests for controllers and services
* Mocking external dependencies (APIs and database)
* Coverage of main business flows (payment creation, transaction lookup)
* Validation of data handling and service interactions

---

### ▶️ Run tests

```bash
npm run test
```

### 📈 Generate coverage report

```bash
npm run test:cov
```

Detailed report available at:

```text
coverage/lcov-report/index.html
```

---


## ⚠️ Consideraciones

- Uso de entorno sandbox de Wompi  
- No usar tarjetas reales  
- Validación básica en frontend  

---

## 🔥 Mejoras futuras

- Webhooks (eliminar polling)  
- Autenticación JWT  
- Idempotencia en pagos  
- Logs y auditoría  
- Tests automatizados  
- Docker  

---

## 👩‍💻 Autor

Abraham Lugo Ramirez

Backend Developer | APIs | Integraciones de pago  

---

## ⭐ Valor del proyecto

- Integración real con pasarela de pagos  
- Diseño de APIs REST  
- Manejo de estados transaccionales  
- Separación de responsabilidades  
- Buenas prácticas con NestJS  