import { useOutletContext } from "@remix-run/react";
import { throttle } from "lodash";
import { useEffect, useRef } from "react";
import ProjectCard from "~/components/ProjectCard/ProjectCard";
import ShowcaseCard from "~/components/ShowcaseCard/ShowcaseCard";
import openSources from "~/mocks/open-sources.json";
import showcases from "~/mocks/showcases.json";
import type { AppContextProps } from "../__app";

export interface AppIndexProps {}

const Index = (props: AppIndexProps) => {
  const { setStoolPigeon } = useOutletContext<AppContextProps>();
  const librarySectionRef = useRef<HTMLDivElement>(null);
  const showCaseSectionRef = useRef<HTMLDivElement>(null);

  const onThrottleScrolling = throttle(() => {
    const libraryRect = librarySectionRef.current?.getBoundingClientRect();
    const showCaseRect = showCaseSectionRef.current?.getBoundingClientRect();

    const offsetLibrary =
      Number(libraryRect?.top) + Number(libraryRect?.height);

    const offsetShowcase =
      Number(showCaseRect?.top) + Number(libraryRect?.height);

    if (offsetLibrary > 0) {
      setStoolPigeon("libraries");
    } else if (offsetShowcase > 0) {
      setStoolPigeon("showcases");
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
    </div>
  );
};

export default Index;
