# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint.

## Supabase join requests

The Join form inserts `full_name`, `email`, and `department` into
`public.join_requests`. Copy `.env.example` to `.env.local` and fill in the
project URL and publishable key from your Supabase project settings. Vite reads
`.env.local` automatically; restart the dev server after changing it. The
existing `creditionals.env` filename is not loaded by Vite, so copy its variable
values into `.env.local` if that is where you currently keep them.

Use only the publishable key in this frontend. Never put a secret or
`service_role` key in a `VITE_` variable or browser code.

The table must have `full_name`, `email`, and `department` columns. Enable row
level security and run this once in the Supabase SQL Editor to permit anonymous
form submissions while requiring non-empty values:

```sql
alter table public.join_requests enable row level security;
grant usage on schema public to anon;
grant insert on table public.join_requests to anon;

create policy "Allow anonymous join requests"
on public.join_requests
for insert
to anon
with check (
  char_length(trim(full_name)) between 1 and 120
  and char_length(trim(email)) between 3 and 320
  and char_length(trim(department)) between 1 and 120
);
```

Start the app with `npm run dev`, submit the form with valid values, and confirm
the new row in the Supabase Table Editor. The UI shows success only when the
insert request returns without a Supabase error. Empty or malformed values are
blocked by browser validation; RLS or network errors appear in the form.
