"use client";
import { viewInstances, deleteInstance } from "@/app/services/shadeformAPI";
import React, { useEffect, useState } from "react";
import { InstancesTable } from "./instancesTable";
import { columns } from "./columns";
import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "@/app/ui/skeleton";
import { DataWithId } from "../types/gpu";

const Page = () => {
  const [instances, setInstances] = useState<DataWithId[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstances = async () => {
      const response = await viewInstances();
      setInstances(response);
      setLoading(false);
    };
    fetchInstances();
  }, []);
  const handleDelete = async (id: number) => {
    await deleteInstance(id);
    setInstances(instances.filter((item) => item.id !== id));
  };

  if (instances.length === 0 && loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Running Instances</h1>
        <div className="mx-auto py-5">
          <Skeleton className="flex items-center h-[125px] w-[250px] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Running Instances</h1>
      <div className="mx-auto py-5">
        <InstancesTable
          columns={columns as ColumnDef<DataWithId, unknown>[]}
          data={instances}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Page;
