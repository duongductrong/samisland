import { Link } from "@remix-run/react";
import clsx from "clsx";
import type { FC, HTMLAttributes } from "react";
import LinkIcon from "../Icons/LinkIcon";

export interface ShowcaseCardProps extends HTMLAttributes<HTMLDivElement> {
  tag?: string;
  title?: string;
  description?: string;
  to?: string;
  visitText?: string;
  isInternalLink?: boolean;
}

const ShowcaseCard: FC<ShowcaseCardProps> = ({
  tag,
  title,
  description,
  className,
  isInternalLink,
  to,
  visitText,
  ...props
}) => {
  return (
    <div
      {...props}
      className={clsx(
        className,
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

      <p className="text-semantic-gray text-sm mt-2 mb-4">{description}</p>

      <h2 className="font-bold text-2xl tracking-wide mt-2 mb-4">{title}</h2>

      {isInternalLink ? (
        <Link
          to={to ?? "/"}
          className="text-sm mt-4 font-semibold flex items-center gap-2"
        >
          {visitText} <LinkIcon className="w-3 h-3 text-semantic-gray" />
        </Link>
      ) : (
        <a
          href={to}
          target="_blank"
          rel="noreferrer"
          className="text-sm mt-4 font-semibold flex items-center gap-2"
        >
          {visitText} <LinkIcon className="w-3 h-3 text-semantic-gray" />
        </a>
      )}
    </div>
  );
};

ShowcaseCard.defaultProps = {
  title: "",
  tag: "",
  isInternalLink: false,
  to: "",
  visitText: "",
};

export default ShowcaseCard;
