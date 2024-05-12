"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/app/ui/button";
import { Badge } from "@/app/ui/badge";

export type ActiveInstance = {
  name: string;
  cost: number;
  cloud: string;
  region: string;
  type: string;
  status: string;
  ip: string;
};

export const columns: ColumnDef<ActiveInstance>[] = [
  {
    header: "Cloud",
    accessorKey: "cloud",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    accessorKey: "cost",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <div className="flex items-center content-end">
          Cost per hour
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      </Button>
    ),
    cell: ({ row }) => {
      const cost = parseFloat(row.getValue("cost")) / 100;
      const formattedCost = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(cost);

      return (
        <div className="text-center font-medium lg:mr-12">{formattedCost}</div>
      );
    },
  },
  {
    header: "IP Address",
    accessorKey: "ip",
  },
  {
    header: "Region",
    accessorKey: "region",
  },
  {
    header: "Instance Type",
    accessorKey: "type",
  },
  {
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge variant="active" className="text-center">
          {row.getValue("status")}
        </Badge>
      );
    },
    accessorKey: "status",
  },
];
