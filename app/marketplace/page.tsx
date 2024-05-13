"use client";
import { useEffect, useState } from "react";
import { fetchInstanceTypes } from "@/app/services/shadeformAPI";
import { GPUInstance } from "../types/gpu";
import GpuCard from "./gpu-card";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/ui/pagination";

import { Skeleton } from "../ui/skeleton";

const ITEMS_PER_PAGE = 50;

export default function Page() {
  const [gpuInstances, setGpuInstances] = useState<GPUInstance[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchGpuInstances = async () => {
      const instances: GPUInstance[] = await fetchInstanceTypes();
      const availableInstances = instances.filter((instance) =>
        instance.availability.some((availability) => availability.available)
      );
      setGpuInstances(availableInstances);
      setTotalPages(Math.ceil(availableInstances.length / ITEMS_PER_PAGE));
    };

    fetchGpuInstances();
  }, [gpuInstances]);

  if (gpuInstances.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Select a GPU Instance</h1>
        <Skeleton className="flex items-center h-[125px] w-[250px]" />
        <div className="space-y-2 mt-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }
  const handleNext = () => {
    setCurrentPage((prevPageNumber) => prevPageNumber + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPageNumber) => prevPageNumber - 1);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = gpuInstances.slice(startIndex, endIndex);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Select a GPU Instance</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {currentItems.map((gpu) => (
          <GpuCard key={`${gpu.shade_instance_type}_${gpu.cloud}`} gpu={gpu} />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={handlePrevious} />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => handlePageChange(i + 1)}
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="#" onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
