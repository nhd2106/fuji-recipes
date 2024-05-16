import { cn } from "@/lib/utils";

const MaxWidthWrapper = ({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className={cn([
        "mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
        className,
      ])}
      style={style}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
