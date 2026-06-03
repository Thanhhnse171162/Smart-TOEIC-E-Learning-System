# Smart TOEIC E-Learning System

Modern EdTech platform built with **Next.js 15**, **Tailwind CSS**, and **shadcn/ui**.

## 3-Layer Architecture

```
src/
├── app/                          # Presentation Layer (Pages & Routes)
├── components/                   # Presentation Layer (UI Components)
│   ├── ui/                       # shadcn/ui primitives
│   └── layout/                   # Shared layouts
├── layers/
│   ├── domain/                   # Domain Layer (Entities & Types)
│   │   └── types.ts
│   ├── data/                     # Data Access Layer
│   │   ├── mock/data.ts          # Mock data
│   │   └── repositories/         # Repository pattern
│   └── business/                 # Business Logic Layer
│       └── services/             # Service classes
└── lib/                          # Utilities & navigation
```

### Layer Responsibilities

| Layer | Folder | Responsibility |
|-------|--------|----------------|
| **Presentation** | `app/`, `components/` | UI, routing, user interaction |
| **Business Logic** | `layers/business/` | Business rules, validation, orchestration |
| **Data Access** | `layers/data/` | Data retrieval, repositories, mock/API |
| **Domain** | `layers/domain/` | Shared types, entities, interfaces |

## Pages

- `/` — Landing page
- `/login`, `/register` — Authentication
- `/student/*` — Student dashboard & features
- `/teacher/*` — Teacher portal
- `/admin/*` — Admin panel

## Getting Started

### 1. Start Backend (ASP.NET Core)

```bash
cd D:\THANH\SWD-BE\BE-Smart-TOEIC-E-Learning-System
dotnet run
```

API: [http://localhost:5136](http://localhost:5136) · Swagger: [http://localhost:5136/swagger](http://localhost:5136/swagger)

### 2. Start Frontend

```bash
cd D:\THANH\SWD
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Environment (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5136
NEXT_PUBLIC_USE_API=true
```

Set `NEXT_PUBLIC_USE_API=false` to use mock data only.

### Demo accounts (database seed)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@toeic.com | Password123! |
| Teacher | teacher@toeic.com | Password123! |
| Student | student@toeic.com | Password123! |

## FE ↔ BE Connection

| Layer | Path |
|-------|------|
| API client | `src/lib/api/client.ts` |
| Auth session | `src/lib/auth/session.ts` |
| API calls | `src/layers/data/api/` |
| Repositories (API + mock fallback) | `src/layers/data/repositories/` |

Pages using **live API**: Login, Register, Vocabulary, Courses, Admin Users, Teacher Students.

Other pages still use mock until matching BE endpoints exist.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui + Radix UI
- Lucide Icons
- Recharts
- next-themes (Dark Mode)
