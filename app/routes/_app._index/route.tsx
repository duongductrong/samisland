import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import clsx from "clsx";
import dayjs from "dayjs";
import { throttle } from "lodash";
import { useEffect, useRef } from "react";
import { Bookmark, Eye, Star } from "react-feather";
import ProjectCard from "~/components/ProjectCard/ProjectCard";
import ShowcaseCard from "~/components/ShowcaseCard/ShowcaseCard";
import type { Post } from "~/libs/types/post";
import openSources from "~/mocks/open-sources.json";
import showcases from "~/mocks/showcases.json";
import type { AppContextProps } from "../_app";

export interface AppIndexProps {}

export interface AppIndexLoaderData {
  posts: Post[];
}

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(
    "https://api.codestus.com/api/v1/posts?sortableBy=views&orderBy=desc&rowsPerPage=6"
  ).then((res) => res.json());

  return response.data.posts.data;
}

export const loader: LoaderFunction = async () => {
  const data = await fetchPosts();

  return json({ posts: data });
};

const Index = (props: AppIndexProps) => {
  const { posts } = useLoaderData<AppIndexLoaderData>();
  const { setStoolPigeon } = useOutletContext<AppContextProps>();
  const librarySectionRef = useRef<HTMLDivElement>(null);
  const showCaseSectionRef = useRef<HTMLDivElement>(null);
  const articleSectionRef = useRef<HTMLDivElement>(null);

  const onThrottleScrolling = throttle(() => {
    const libraryRect = librarySectionRef.current?.getBoundingClientRect();
    const showCaseRect = showCaseSectionRef.current?.getBoundingClientRect();
    const articleRect = articleSectionRef.current?.getBoundingClientRect();

    const offsetLibrary =
      Number(libraryRect?.top) + Number(libraryRect?.height);

    const offsetShowcase =
      Number(showCaseRect?.top) + Number(showCaseRect?.height);

    const offsetArticle =
      Number(articleRect?.top) + Number(articleRect?.height);

    if (offsetLibrary > 0) {
      setStoolPigeon("libraries");
    } else if (offsetShowcase > 0) {
      setStoolPigeon("showcases");
    } else if (offsetArticle > 0) {
      setStoolPigeon("blogs");
    }
  }, 20);

  useEffect(() => {
    onThrottleScrolling();

    window.addEventListener("scroll", onThrottleScrolling);

    return () => {
      window.removeEventListener("scroll", onThrottleScrolling);
    };
  }, [librarySectionRef.current, showCaseSectionRef.current]);

  return (
    <div className="p-0 sm:p-4 md:p-8 lg:p-12 !pt-0 overflow-hidden">
      <div
        ref={librarySectionRef}
        id="libraries"
        className="flex flex-col gap-2 pt-0 sm:pt-4 md:pt-8 lg:pt-12"
      >
        {openSources.map(
          ({ description, key, tag, title, to, isInternalLink }) => (
            <ProjectCard
              key={key}
              tag={tag}
              title={title}
              description={description}
              to={to}
              isInternalLink={isInternalLink}
            />
          )
        )}
      </div>

      <div
        ref={showCaseSectionRef}
        id="showcases"
        className="grid grid-cols-1 lg:grid-cols-2 gap-2 pt-20"
      >
        {showcases.map((showcase) => (
          <ShowcaseCard
            key={showcase.id}
            tag={showcase.tags.join(",")}
            title={showcase.title}
            description={showcase.description}
            to={showcase.to}
            isInternalLink={showcase.isInternalLink}
            className="lg:even:transform lg:even:translate-y-6"
            visitText="Link"
          />
        ))}
      </div>

      <div id="blogs" ref={articleSectionRef} className="pt-20 pb-10">
        {posts.map((post) => (
          <div
            key={post.postId}
            className={clsx(
              "relative",
              "pb-10 last:pb-0 transform hover:scale-105 transition-transform duration-200 ease-out",
              "hover:shadow-[0_0_0_1000px_rgba(21,21,21,0.5)]",
              "z-10 hover:z-[11]"
            )}
          >
            <a
              className="flex items-center gap-6"
              href={`https://codestus.com/posts/${post.slug}`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="min-w-[100px] h-[100px] rounded-full bg-semantic-dark100 flex items-center justify-center">
                <Bookmark className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-2xl tracking-wide mt-2 mb-4">
                  {post.title}
                </h2>
                <p className="text-semantic-gray text-sm mt-2 mb-4 line-clamp-1">
                  {post.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <span className="text-xs text-semantic-light font-semibold uppercase">
                    {dayjs(post.updated_at).format("MMM D, YYYY")}
                  </span>
                  <span className="text-xs text-semantic-gray inline-flex items-center gap-2">
                    <Star className="w-3 h-3" />
                    {Intl.NumberFormat().format(post.views)} views
                  </span>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
