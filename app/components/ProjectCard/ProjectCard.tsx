/* eslint-disable jsx-a11y/anchor-has-content */
import { Link } from "@remix-run/react";
import clsx from "clsx";
import type { FC } from "react";

export interface ProjectCardProps {
  tag?: string;
  title?: string;
  description?: string;
  to?: string;
  isInternalLink?: boolean;
}

const ProjectCard: FC<ProjectCardProps> = ({
  tag,
  title,
  description,
  to,
  isInternalLink,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "p-11 bg-semantic-dark100",
        "transform hover:scale-110",
        "hover:shadow-[0_0_0_1000px_rgba(21,21,21,0.5)]",
        "z-10 hover:z-[11]",
        "transition-transform duration-300 ease-out"
      )}
      role="article"
    >
      <span className="font-bold uppercase text-xs text-semantic-light tracking-wide">
        {tag}
      </span>
      <h2 className="font-bold text-2xl tracking-wide mt-2 mb-4">{title}</h2>

      <p className="text-semantic-gray text-sm">{description}</p>

      {isInternalLink ? (
        <Link to={to ?? "/"} className="absolute top-0 left-0 w-full h-full" />
      ) : (
        <a
          href={to}
          target="_blank"
          rel="noreferrer"
          className="absolute top-0 left-0 w-full h-full"
        />
      )}
    </div>
  );
};

ProjectCard.defaultProps = {
  description: "",
  isInternalLink: false,
  tag: "",
  title: "",
  to: "",
};

export default ProjectCard;
