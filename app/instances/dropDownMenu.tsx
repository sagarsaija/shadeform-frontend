import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/app/ui/sheet";

import DetailsContent from "./detailsContent";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/app/ui/alert-dialog";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/app/ui/button";

import { GPUInstance } from "../types/gpu";

const DropDownMenu = ({
  id,
  onDelete,
  data,
}: {
  id?: number;
  onDelete: ((id: number) => Promise<void>) | undefined;
  data: GPUInstance;
}) => {
  return (
    <Sheet>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <SheetTrigger asChild>
              <DropdownMenuItem>Details</DropdownMenuItem>
            </SheetTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>Delete Instance</DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <DetailsContent data={data} onDelete={onDelete} id={id} />
        <AlertDialogContent>
          <h2>Are you sure?</h2>
          <p>Deleting this instance cannot be undone.</p>
          <AlertDialogAction
            className={"bg-destructive text-destructive-foreground"}
            onClick={() => onDelete && onDelete(id!)}
          >
            Confirm
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </Sheet>
  );
};

export default DropDownMenu;
