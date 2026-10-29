"use client";

import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Destination } from "@/types/destination";
import { Trash2, X } from "lucide-react";

export function DeleteDialog({
  destinationData,
}: {
  destinationData: Destination;
}) {
  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:8000/destinations/${destinationData._id}`,
      {
        method: "DELETE",
      },
    );
    const resData = await res.json();
    redirect("/destinations")
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className="rounded-none" variant="destructive">
            <Trash2 className="size-4" /> Delete
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleDelete}>
          <DialogHeader>
            <DialogTitle>Delete Destination</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this destination? This action
              cannot be undone. This will permanently delete the destination and
              remove your data from our servers.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-6 flex flex-row justify-end gap-2">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="inline-flex items-center gap-1.5 rounded-none bg-brand px-4 py-2.5 text-sm font-medium text-white shadow-none transition-colors hover:bg-brand/90 focus:outline-none"
                >
                  <X className="size-4" />
                  Cancel
                </Button>
              }
            />

            <Button
              type="submit"
              variant="outline"
              className="inline-flex items-center gap-1.5 rounded-none border border-red-300 bg-white px-4 py-2.5 text-sm font-medium text-red-500 shadow-none transition-colors hover:border-red-400 hover:bg-red-50 hover:text-red-600 focus:outline-none disabled:opacity-50"
            >
              <Trash2 className="size-4" aria-hidden />
              Delete Permanently
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
