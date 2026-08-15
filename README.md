# Inventory Backend

Express + Sequelize (SQLite) API for the Inventory Management System.
Products, Suppliers, and JWT-based login — same pattern as your
tutorial-SG1 workshop project, plus image upload and route protection.

## Setup

```bash
npm install
npm run db:sync
npm run create-admin admin yourPasswordHere
npm run dev
```

- `npm run db:sync` creates the tables (products, suppliers, users).
- `npm run create-admin <username> <password>` creates the one login
  account you'll use for the Admin Login page. There's no public
  registration page — this is meant to be a single admin account.
- `npm run dev` starts the server on port 3000 (change PORT in `.env`
  if you need to).

## Folder structure

Same layered pattern as tutorial-SG1:
- `models/` — Sequelize models (Product, Supplier, User) + associations
- `services/` — business logic
- `controllers/` — HTTP request/response handling
- `routes/` — endpoint definitions, wires in validators + auth
- `middlewares/` — logger, error handler, validation, `requireAuth` (route
  protection), `upload` (multer, for image files)
- `validators/` — express-validator rule sets
- `scripts/` — one-off scripts (`syncDb.js`, `createAdmin.js`)

## Auth

- `POST /api/auth/login` — body `{ username, password }` → returns
  `{ token, id, username }`
- `POST /api/auth/logout` — stateless, just tells the frontend to
  discard the token

Every product/supplier route requires a valid token. Send it as a
header on every request:

```
Authorization: Bearer <token>
```

Requests without a valid token get `401 Unauthorized` — that's what
implements the "can't see or change any inventory data" requirement.
The frontend is responsible for redirecting to the login page when it
gets a 401 (or when there's no token stored at all).

## Products

- `GET /api/products` — list all. Supports `?search=name` and
  `?supplierId=1` query params for the search bar + supplier filter.
- `GET /api/products/:id` — one product, includes its Supplier
- `POST /api/products` — multipart/form-data body (not JSON!), fields:
  `name`, `description`, `price`, `quantity`, `supplierId`, and a file
  field named `image`
- `PUT /api/products/:id` — same as POST, image optional (keeps the
  old image if you don't send a new one)
- `DELETE /api/products/:id`

Uploaded images are saved to `uploads/` and served at
`http://localhost:3000/uploads/<filename>` — that's the URL to use in
an `<img src>` on the frontend. `imageUrl` on the product record holds
that path.

Low-stock is a frontend concern: any product with `quantity < 5`
should render with the red "low stock" styling (matches your
`.low` CSS class from the StockPilot mockup).

## Suppliers

- `GET /api/suppliers`
- `GET /api/suppliers/:id`
- `POST /api/suppliers` — JSON body: `{ name, contactEmail, phone }`
- `PUT /api/suppliers/:id`
- `DELETE /api/suppliers/:id`

## Validation

Bad requests return `400` with a `details` array listing which
field(s) failed and why — same shape as tutorial-SG1. Price and
quantity reject negative numbers; required fields reject blanks.
