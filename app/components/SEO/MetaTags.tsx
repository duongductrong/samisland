import { defineRoutes } from "@remix-run/dev/dist/config/routes";
import type { MetaFunction } from "@remix-run/node";
import { useLocation, useMatches } from "@remix-run/react";
import type { FC } from "react";

export interface MetaTagsProps {
  host?: string;
}

export type MetaTagsFunction = MetaFunction;

const MetaTags: FC<MetaTagsProps> = ({ host }) => {
  const matches = useMatches();
  const location = useLocation();
  const currentUrl = location.pathname + location.search;
  // const rootMatcher = matches.find((matcher) => matcher.id === rootMatch);
  // const rootLoader = rootMatcher?.data;

  const defaultMetaTags: { [x: string]: any } = {
    url: `${host}${currentUrl}`,
    image: "/assets/project-sample.png",
    title: "Sam | Software Engineer",
    description: "The portfolio of Trong Duong (Sam)",
    keywords: "portfolio",
    robots: "index, follow",
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
  };

  try {
    const matcherDataOfRoute = matches[matches.length - 1];
    const handleMetaTagsFn = matcherDataOfRoute?.handle?.metaTags;

    if (handleMetaTagsFn && typeof handleMetaTagsFn === "function") {
      const customMetaTags = handleMetaTagsFn({
        location,
        data: matcherDataOfRoute.data,
        params: matcherDataOfRoute.params,
        parentsData: matches,
      });

      Object.entries(customMetaTags).forEach(([key, value]) => {
        defaultMetaTags[key] = value;
      });
    }
  } catch (e) {
    console.log("error", e);
  }

  const {
    charset,
    description,
    image,
    keywords,
    robots,
    title,
    url,
    viewport,
  } = defaultMetaTags;

  console.log(currentUrl);

  return (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="charset" content={charset} />
      <meta name="viewport" content={viewport} />
      <title>{`${title} - Codestus.com`}</title>

      <link rel="canonical" href={url} />

      <meta name="title" content={`${title} - Codestus.com`} />
      <meta name="description" content={`${description} - Codestus.com`} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />

      {/* <!-- Google / Search Engine Tags --> */}
      <meta itemProp="name" content={`${title} - Codestus.com`} />
      <meta itemProp="description" content={`${description} - Codestus.com`} />
      <meta itemProp="image" content={image} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={`${title} - Codestus.com`} />
      <meta
        property="og:description"
        content={`${description} - Codestus.com`}
      />
      <meta property="og:image" content={image} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={`${title} - Codestus.com`} />
      <meta
        property="twitter:description"
        content={`${description} - Codestus.com`}
      />
      <meta property="twitter:image" content={image} />
    </>
  );
};

MetaTags.defaultProps = {
  rootMatch: "",
};

export default MetaTags;
