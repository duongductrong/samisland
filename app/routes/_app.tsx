import { Outlet } from "@remix-run/react";
import type { FC } from "react";
import { useState } from "react";
import { Activity, GitHub, Linkedin } from "react-feather";
import LinkIcon from "~/components/Icons/LinkIcon";
import StoolPigeon from "~/components/StoolPigeon/StoolPigeon";

export type StoolPigeonType = "libraries" | "showcases" | "blogs";

export interface AppContextProps {
  setStoolPigeon: React.Dispatch<React.SetStateAction<StoolPigeonType | null>>;
  stoolPigeon: StoolPigeonType | null;
}

export interface SocialLinkProps {
  Icon: FC<any>;
  text: string;
  to: string;
}

export const SocialLink: FC<SocialLinkProps> = ({ Icon, text, to }) => {
  return (
    <a
      href={to ?? "#"}
      className="flex items-center text-semantic-light"
      target="_blank"
      rel="noreferrer"
    >
      <Icon className="w-4 h-4 fill-current flex-none mr-2" />
      <span className="text-sm mr-2">{text}</span>
      <LinkIcon className="w-3 h-3" />
    </a>
  );
};

const Index = () => {
  const [stoolPigeon, setStoolPigeon] = useState<StoolPigeonType | null>(
    "libraries"
  );

  return (
    <section className="flex max-w-[1280px] flex-col md:flex-row mx-auto pt-24 md:gap-10 lg:gap-20 px-6">
      <aside className="flex flex-col max-w-full md:max-w-[440px] h-full md:h-[calc(100vh-88px-88px)] static md:sticky top-[100px] left-0">
        <h1 className="text-semantic-light text-6xl mb-4 font-bold">
          Trong Duong
        </h1>
        <h2 className="text-2xl text-semantic-light mb-8 font-semibold">
          Software Engineer at WhammyTech
        </h2>
        <p className="text-sm text-semantic-gray mb-3 leading-7">
          I am a frontend developer with experience in building web applications
          using modern web technologies
        </p>
        <p className="text-sm text-semantic-gray mb-14 leading-7">
          Skilled in: React, Typescript, Remix.run, Next.js. Familiar with Jira,
          Agile.
        </p>

        <div className="flex flex-col gap-y-8">
          <StoolPigeon
            prefix="01"
            text="Libraries"
            to="#libraries"
            active={stoolPigeon === "libraries"}
          />
          <StoolPigeon
            prefix="02"
            text="Show cases"
            to="#showcases"
            active={stoolPigeon === "showcases"}
          />
          <StoolPigeon
            prefix="03"
            text="Blogs"
            to="#blogs"
            active={stoolPigeon === "blogs"}
          />
        </div>

        <div className="my-12 md:mb-0 md:mt-auto flex flex-wrap sm:flex-nowrap gap-8">
          <img
            src="https://avatars.githubusercontent.com/u/39333905?v=4"
            alt="Avatar"
            className="w-[50px] h-[50px] rounded-full"
          />

          <SocialLink
            to="https://github.com/duongductrong"
            text="Github"
            Icon={GitHub}
          />

          <SocialLink
            to="https://www.linkedin.com/in/duongductrong/"
            text="LinkedIn"
            Icon={Linkedin}
          />

          <SocialLink
            to="/assets/Duong Duc Trong - Software Engineer.pdf"
            text="Resume"
            Icon={Activity}
          />
        </div>
      </aside>

      <main className="container mx-auto md:mt-0 text-semantic-light text-base">
        <Outlet context={{ setStoolPigeon, stoolPigeon }} />
      </main>
    </section>
  );
};

export default Index;
