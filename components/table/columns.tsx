"use client";

import { ColumnDef } from "@tanstack/react-table";

import { StatusBadge } from "../StatusBage"; 
import { Button } from "../ui/button";
import { IFacture } from "@/types/facture.type";
import Link from "next/link";
import { DeleteModal } from "../DeleteModal";


export const columns: ColumnDef<IFacture>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const facture = row.original;
      return <p className="text-14-medium ">{facture.name}</p>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const facture = row.original;
      return <p className="text-14-medium ">0{facture.phone}</p>;
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const facture = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge total={facture?.total} color="green" />
        </div>
      );
    },
  },
  {
    accessorKey: "totalVercement",
    header: "Vercement",
    cell: ({ row }) => {
      const facture = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge total={facture?.totalVercement} color="blue" />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Date",
    cell: ({ row }) => {
      const facture = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
            {new Date(facture.createdAt).toLocaleDateString('en-US')}
        </p>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const facture = row.original;

      return (
        <div className="flex gap-1">
            <Button
            variant="ghost"
            asChild
            className={`capitalize text-green-500 `}
            >
              <Link href={`/create/${facture._id}`}>
                update              
              </Link>
            </Button>
            <DeleteModal id={facture._id}  />
            <Button
            variant="ghost"
            asChild
            className={`capitalize text-blue-500 `}
            >
              <Link href={`/facture/${facture._id}/print`}>
                details              
              </Link>
            </Button>
        </div>
      );
    },
  },
];