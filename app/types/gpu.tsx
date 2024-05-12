export type GPUInstance = {
  cloud: string;
  shade_instance_type: string;
  cloud_instance_type: string;
  vcpus: number;
  memory_in_gb: number;
  num_gpus: number;
  storage_in_gb: number;
  name: string | null | undefined;
  region: string | null | undefined;
  configuration: {
    memory_in_gb: number;
    storage_in_gb: number;
    vcpus: number;
    num_gpus: number;
    gpu_type: string;
    interconnect: string;
    nvlink: boolean;
    os_options: string[];
    vram_per_gpu_in_gb: number;
  };
  hourly_price: number;
  availability: Array<{
    region: string;
    available: boolean;
  }>;
};

export type GPUCardProps = {
  gpu: GPUInstance;
};

export type DataWithId = {
  activeGpuData: GPUInstance;
  id: number;
};
