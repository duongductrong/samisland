import clsx from "clsx";
import type { FC } from "react";

export interface StoolPigeonProps {
  prefix?: any;
  text?: string;
  active?: boolean;
  to?: string;
}

const StoolPigeon: FC<StoolPigeonProps> = ({ prefix, text, active, to }) => {
  return (
    <a
      href={to ?? "#"}
      hrefLang="vi"
      className={clsx(
        "text-xs text-semantic-gray hover:text-semantic-light",
        "flex items-center uppercase font-bold",
        "transition-all duration-300 ease-in",
        "cursor-pointer",
        "group/stool-pigeon",
        {
          "text-semantic-light": active,
        }
      )}
    >
      <span className="text-xs">{prefix}</span>
      <div
        className={clsx(
          "w-[30px] h-[1px] bg-semantic-gray inline-flex mx-2",
          "group-hover/stool-pigeon:w-[50px] group-hover/stool-pigeon:bg-semantic-light",
          "transition-all duration-300 ease-in",
          {
            "w-[50px]": active,
          }
        )}
      ></div>
      {text}
    </a>
  );
};

StoolPigeon.defaultProps = {
  prefix: null,
  text: "",
  active: false,
  to: "",
};

export default StoolPigeon;
