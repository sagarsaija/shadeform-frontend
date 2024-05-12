import axios from "axios";
import { GPUInstance } from "@/app/types/gpu";

export const fetchInstanceTypes = async (gpuDetails?: GPUInstance) => {
  const response = await axios.get("http://localhost:3001/instances/types", {
    params: gpuDetails,
  });
  return response.data.instance_types;
};

export const createInstance = async (instanceDetails: GPUInstance) => {
  const response = await axios.post(
    "http://localhost:3001/instances/create",
    instanceDetails
  );
  return response.data;
};

export const viewInstances = async () => {
  const response = await axios.get("http://localhost:3001/instances");
  return response.data;
};

export const deleteInstance = async (instanceId: number) => {
  const response = await axios.delete(
    `http://localhost:3001/instances/delete/${instanceId}`
  );
  return response.data;
};
