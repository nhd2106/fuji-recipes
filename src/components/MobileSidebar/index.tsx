"use client";
import { clsx } from "clsx";

const openClassNames = {
  right: "translate-x-0",
  left: "translate-x-0",
  top: "translate-y-0",
  bottom: "translate-y-0",
  fixed: "fixed",
};

const closeClassNames = {
  right: "translate-x-full",
  left: "-translate-x-full",
  top: "-translate-y-full",
  bottom: "translate-y-full",
  hidden: "hidden",
};

const classNames = {
  right: "inset-y-0 right-0",
  left: "inset-y-0 left-0",
  top: "inset-x-0 top-0",
  bottom: "inset-x-0 bottom-0",
};

const MobileSidebar = ({
  open,
  setOpen,
  side = "right",
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  side?: "right" | "left" | "top" | "bottom";
}) => {
  return (
    <div
      className={clsx(
        " top-0 left-0 z-20 w-64 h-full transition-all duration-500 transform bg-white shadow-lg",
        classNames[side],
        open ? openClassNames[side] : closeClassNames[side]
      )}
    >
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold">Drawer</h2>
        <p className="text-gray-500">This is a drawer.</p>
      </div>
    </div>
  );
};

export default MobileSidebar;
