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

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui + Radix UI
- Lucide Icons
- Recharts
- next-themes (Dark Mode)
