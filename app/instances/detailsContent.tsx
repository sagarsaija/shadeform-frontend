import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/ui/sheet";

import { Label } from "@/app/ui/label";
import { Button } from "@/app/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { GPUInstance } from "../types/gpu";

const DetailsContent = ({
  data,
  onDelete,
  id,
}: {
  data: GPUInstance;
  onDelete: ((id: number) => Promise<void>) | undefined;
  id: number | undefined;
}) => {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Instance Overview</SheetTitle>
        <SheetDescription>
          View instance details and delete instance here.
        </SheetDescription>
      </SheetHeader>
      <Separator className="my-3" />
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <div id="name" className="col-span-3 text-sm">
            {data.name}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="type" className="text-right">
            Type
          </Label>
          <div id="cloud_instance_type" className="col-span-3 text-sm">
            {data.cloud_instance_type}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="gpus" className="text-right">
            GPUs
          </Label>
          <div id="num_gpus" className="col-span-3 text-sm">
            {data.num_gpus}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="region" className="text-right">
            Region
          </Label>
          <div id="region" className="col-span-3 text-sm">
            {data.region}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">
            Price
          </Label>
          <div id="hourly_price" className="col-span-3 text-sm">
            {`$${(data.hourly_price / 100).toFixed(2)}/hr`}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="memory" className="text-right">
            Memory
          </Label>
          <div id="memory_in_gb" className="col-span-3 text-sm">
            {`${data.memory_in_gb} GB`}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="storage" className="text-right">
            Storage
          </Label>
          <div id="storage_in_gb" className="col-span-3 text-sm">
            {`${data.storage_in_gb} GB`}
          </div>
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button
            onClick={() => onDelete && onDelete(id!)}
            className={"bg-destructive text-destructive-foreground"}
            type="submit"
          >
            Delete Instance
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
};

export default DetailsContent;
