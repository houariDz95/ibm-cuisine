import { cn, formatter } from "@/lib/utils";
import Image from "next/image";


export const StatusBadge = ({ total, color }: { total: any, color: string }) => {
  return (
    <div
      className={cn("status-badge", color === "green" ? "bg-green-600" : "bg-blue-600")}
    >
      <Image
        src="/assets/icons/check-circle.svg"
        alt="doctor"
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={`text-12-semibold capitalize ${color === "green" ? "text-green-500" : "text-blue-500" }`}
      >
        {formatter.format(total)}
      </p>
    </div>
  );
};