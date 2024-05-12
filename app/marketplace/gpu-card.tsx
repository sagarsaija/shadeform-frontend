"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { GPUCardProps, GPUInstance } from "../types/gpu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";

import { Button } from "../ui/button";
import nvidiaLogo from "../assets/nvidiaLogo.png";

const GpuCard: React.FC<GPUCardProps> = ({ gpu }) => {
  const [storedGpuData, setStoredGpuData] = useState<GPUInstance | null>(null);

  useEffect(() => {
    const gpuData = sessionStorage.getItem("gpuData");
    if (gpuData) {
      setStoredGpuData(JSON.parse(gpuData));
    }
  }, []);

  const handleExploreClick = () => {
    sessionStorage.setItem("gpuData", JSON.stringify(gpu));
  };

  const id = gpu.shade_instance_type;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{id}</CardTitle>
        <div className="flex justify-between space-x-2">
          <CardDescription>{gpu.cloud_instance_type}</CardDescription>
          <img
            className="lg:block hidden max-w-[100px] max-h-[26px]"
            src={nvidiaLogo.src}
            alt="Nvidia logo"
          />
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">
                ${(gpu.hourly_price / 100).toFixed(2)}/hr
              </Label>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Provider: {gpu.cloud}</Label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/marketplace/${id}`} passHref>
          <Button
            className="hover:bg-green-500"
            type="submit"
            onClick={handleExploreClick}
          >
            Explore
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default GpuCard;
