# Abolore Sanni — Portfolio

The personal portfolio of **Abolore Sanni**, an AI/Agent Engineer and Full-Stack
Developer based in Lagos, Nigeria. It presents production AI work, full-stack
projects, skills, credentials, and a CV-grounded AI assistant.

**Live:** [portfolio-eta-flax-91.vercel.app](https://portfolio-eta-flax-91.vercel.app)

## Highlights

- Dark-first, accessible interface with a light theme and a persisted toggle.
- Case-study pages for each project, driven by the portfolio API.
- Filterable project grid with real grid and list layouts.
- Categorized skill matrix with no self-assessed percentage scores.
- AI assistant grounded in the CV via a separate RAG service.
- Contact form with inline validation and an admin inbox for replies.
- Per-route titles, metadata, JSON-LD, sitemap, robots, and social cards.
- Reduced-motion support, keyboard navigation, and skip-to-content.

## Stack

- **Framework:** React 19 + Vite 7
- **Styling:** Tailwind CSS v4 (CSS-first tokens), custom design tokens
- **Animation:** Framer Motion
- **Icons:** Lucide React + a small set of neutral inline SVGs
- **Routing:** React Router
- **Notifications:** React Hot Toast
- **API:** FastAPI backend and a separate FastAPI RAG chatbot

## Getting started

Requirements: Node.js 20+ and npm.

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

The app runs at <http://localhost:5173>.

### Environment variables

| Variable | Purpose | Default |
| --- | --- | --- |
| `VITE_API_URL` | Portfolio backend base URL | `http://localhost:8000` |
| `VITE_CHATBOT_API_URL` | CV chatbot base URL | `http://localhost:8010` |

For production, set both variables in Vercel and redeploy. The build inlines
them, so a missing value produces a build that points at `localhost`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint over the project |

## Routes

| Route | Description |
| --- | --- |
| `/` | Home, about, projects, skills, credentials, approach, contact |
| `/project/:id` | Project case study |
| `/admin` | Admin panel for projects, skills, profile, CV, and messages |

## Project structure

```text
src/
  components/    Page sections and shared UI
  pages/         Project detail and 404 routes
  utils/         Project parsing helpers
  assets/        Optimized portrait
  App.jsx        Routing, route metadata, layout
  App.css        Tailwind entry + design tokens
  index.css      Base styles and shared component classes
public/
  cv.pdf         Current CV
  og-image.png   1200x630 social card
  robots.txt
  sitemap.xml
```

## Related services

- **Backend:** `../backend` — projects, skills, profile, CV uploads, contact
  messages, and admin authentication.
- **Chatbot:** `../AI_Chatbot` — CV-grounded RAG assistant exposed at `/chat`
  and `/health`.

## Deployment

The frontend is deployed on Vercel. `vercel.json` rewrites all routes to
`index.html` so client-side routes work on refresh.

```powershell
npm run build
```

Before deploying, confirm that `VITE_API_URL` and `VITE_CHATBOT_API_URL` point
to the live services, not localhost.

## Contact

- Email: [aboloresanni001@gmail.com](mailto:aboloresanni001@gmail.com)
- GitHub: [O-R-E001-dotcom](https://github.com/O-R-E001-dotcom)
- LinkedIn: [abolore-sanni-68078b292](https://www.linkedin.com/in/abolore-sanni-68078b292)
