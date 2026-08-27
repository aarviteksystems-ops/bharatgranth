import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Inter:wght@300;400;500;600;700&family=Noto+Serif+Devanagari:wght@400;600;700;800&family=Rozha+One&family=Yatra+One&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>BharatGranth - Digital Library of Mahabharata, Ramayana, Upanishads & Puranas</title>
        <meta name="description" content="Explore eternal Indian wisdom, Mahabharata, Ramayana, Upanishads, Puranas, Vedas, and Bhagavad Gita with verse-by-verse Sanskrit shlokas, Hindi & English translations, commentary, and audio recitations." />
        <Meta />
        <Links />
      </head>
      <body className="bg-stone-950 text-stone-100 font-sans antialiased min-h-screen selection:bg-amber-500 selection:text-stone-950">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404 - Page Not Found" : "Error";
    details =
      error.status === 404
        ? "The sacred scripture or route you are looking for could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-stone-950 p-6 text-center">
      <div className="max-w-md w-full bg-stone-900 border border-amber-900/50 rounded-2xl p-8 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 text-amber-400 text-3xl">
          ॐ
        </div>
        <h1 className="font-cinzel text-3xl text-amber-400 font-bold mb-2">{message}</h1>
        <p className="text-stone-300 mb-6">{details}</p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold transition shadow-lg shadow-amber-600/20"
        >
          Return to Library Home
        </a>
        {stack && (
          <pre className="mt-6 text-left w-full p-4 bg-stone-950 border border-stone-800 rounded-xl overflow-x-auto text-xs text-stone-400">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}
