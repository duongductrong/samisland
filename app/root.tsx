import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import tailwindStyle from "~/styles/tailwind.css";
import MetaTags from "./components/SEO/MetaTags";

export interface RootLoaderData {
  host: string;
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: tailwindStyle,
  },
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: " https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap",
    crossOrigin: "anonymous",
  },
];

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);

  return {
    host: url.host,
  };
};

export default function App() {
  const { host } = useLoaderData<RootLoaderData>();

  return (
    <html lang="en">
      <head>
        <MetaTags host={host} />
        <Meta />
        <Links />
      </head>
      <body className="bg-semantic-dark font-inter">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
