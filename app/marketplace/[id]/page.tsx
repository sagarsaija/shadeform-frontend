"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchInstanceTypes,
  createInstance,
} from "@/app/services/shadeformAPI";
import { GPUInstance } from "@/app/types/gpu";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/app/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/app/ui/card";
import { Input } from "@/app/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/app/ui/use-toast";

const VerificationPage: React.FC = () => {
  const [gpuData, setGpuData] = useState<GPUInstance | null>(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [instanceName, setInstanceName] = useState("");
  const [error, setError] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [launched, setLaunched] = useState<"no" | "launching" | "launched">(
    "no"
  );
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const storedGpuData = sessionStorage.getItem("gpuData");
    if (storedGpuData) {
      setGpuData(JSON.parse(storedGpuData));
    } else {
      console.log("No GPU data found in session storage.");
    }
  }, []);

  useEffect(() => {
    if (gpuData && !hasFetched) {
      const fetchGpuInstances = async () => {
        const selectedInstance: GPUInstance[] = await fetchInstanceTypes(
          gpuData
        );
        setGpuData(selectedInstance[0]);
        setInstanceName(selectedInstance[0].shade_instance_type);
        setHasFetched(true);
      };

      fetchGpuInstances();
    }
  }, [gpuData, hasFetched, selectedRegion]);

  if (!gpuData) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLaunched("launching");
    e.preventDefault();

    if (!instanceName) {
      setError("Instance name cannot be empty");
      return;
    }

    if (!selectedRegion) {
      setError("Region must be selected");
      return;
    }
    let updatedSelectedRegion = selectedRegion;
    if (updatedSelectedRegion === "any") {
      const nonAnyRegion = gpuData.availability.find(
        (availability) => availability.region !== "any"
      );
      updatedSelectedRegion = nonAnyRegion
        ? nonAnyRegion.region
        : gpuData.availability[0].region;
    }

    const updatedGpuData = {
      ...gpuData,
      name: instanceName,
      region: updatedSelectedRegion,
    };

    await createInstance(updatedGpuData);

    // Simulate a delay for launching the instance
    setTimeout(() => {
      setLaunched("launched");
      toast({
        title: `Instance ${instanceName} launched successfully`,
        description:
          "You can now view your instance in the Running Instances page.",
      });
      router.push("/instances");
    }, 2000);
  };

  return (
    <div className="p-8 flex flex-col items-center mr-12">
      <h1 className="text-2xl font-bold my-6">Review GPU Details</h1>
      <Card className="w-[350px]">
        <CardHeader>
          <span className="flex justify-between w-full items-center">
            <Label className="mr-2">Name: </Label>
            <Input
              type="text"
              defaultValue={gpuData.cloud_instance_type}
              className={error ? "input-error" : ""}
              placeholder={error || ""}
              onChange={(e) => {
                if (e.target.value === "") {
                  setError("Instance name cannot be empty");
                } else {
                  setError("");
                  setInstanceName(e.target.value);
                }
              }}
            />
          </span>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col justify-between p-6 items-center w-full rounded-lg border bg-gray-50/80 dark:bg-blue-950">
            <span className="flex justify-between w-full">
              <Label>Instance Type:</Label>
              <Label htmlFor="instanceType">
                {gpuData.shade_instance_type}
              </Label>
            </span>
            <span className="flex justify-between w-full items-center mt-2">
              <Label>Region:</Label>
              <div className="w-32">
                <Select onValueChange={(value) => setSelectedRegion(value)}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {gpuData.availability.map((availability, index) => (
                      <SelectItem key={index} value={availability.region}>
                        {availability.region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </span>
            <br />
            <span className="flex justify-between w-full">
              <Label>Cloud:</Label>
              <Label htmlFor="cloud">{gpuData.cloud}</Label>
            </span>
            <span className="flex justify-between w-full">
              <Label>vCPUs:</Label>
              <Label htmlFor="vcpus">{gpuData.vcpus}</Label>
            </span>
            <span className="flex justify-between w-full">
              Memory:
              <Label htmlFor="memoryInGb">{gpuData.memory_in_gb} GB</Label>
            </span>
            <span className="flex justify-between w-full">
              <Label>GPUs:</Label>
              <Label htmlFor="gpus">
                {gpuData.num_gpus} x {gpuData.shade_instance_type}
              </Label>
            </span>
            <span className="flex justify-between w-full">
              <Label>Storage:</Label>
              <Label htmlFor="storage">{gpuData.storage_in_gb}</Label>
            </span>
            <br />
            <span className="flex justify-between w-full">
              <Label>Hourly Price:</Label>
              <Label htmlFor="storage">{`$${(
                gpuData.hourly_price / 100
              ).toFixed(2)}/hr`}</Label>
            </span>
            <br />
          </form>
        </CardContent>
        <CardFooter className="flex justify-center items-stretch">
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            disabled={
              !selectedRegion ||
              launched === "launching" ||
              launched === "launched"
            }
          >
            {launched === "no" && "Launch"}
            {launched === "launching" && (
              <>
                {"Launching... "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </>
            )}
            {launched === "launched" && "Launched"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerificationPage;
