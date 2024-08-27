"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteFacture } from "@/lib/actions";

export const DeleteModal = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);


  const handleDeleteModal = async () => {
    setIsDeleting(true);
        try {
        await deleteFacture(id);
        setOpen(false); // Close the modal after successful delete
        } catch (error) { 
        console.log(error);
        } finally {
        setIsDeleting(false);
        }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className={`capitalize text-red-500`}>
          delete
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">Are You Sure</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handleDeleteModal}
            variant="destructive"
            className="bg-red-500 text-white"
          >
             {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
