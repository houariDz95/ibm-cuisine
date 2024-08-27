"use client"
import { decryptKey, formatter } from "@/lib/utils";
import clsx from "clsx";
import Image from "next/image";
import { redirect } from "next/navigation";

type StatCardProps = {
  type: "factures" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
  revenue: number;
};

export const StatCard = ({ count = 0, label, icon, type, revenue }: StatCardProps) => {

  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "factures",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          height={32}
          width={32}
          alt="appointments"
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>
      <h3 className="text-24-bold text-gray-400">{formatter.format(revenue)}</h3>
      <p className="text-14-regular">{label}</p>
    </div>
  );
};