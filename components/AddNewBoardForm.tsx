"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createBoard } from "@/lib/action";
import { useDialog } from "@/context/dialogContext";

const FormSchema = z.object({
  board_name: z
    .string()
    .min(2, { message: "Board name must be at least 2 characters" })
    .max(50),
});

export function AddNewBoardForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      board_name: "",
    },
  });

  const { handleSubmit, control } = form;

  const { closeDialog } = useDialog();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof FormSchema>) {
    createBoard(values);
    closeDialog();
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="board_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Board Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Your Board Name Here"
                  className="bg-transparent placeholder:text-base text-base text-white border-[1px] border-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#726fdb] hover:border-[#726fdb]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full rounded-full bg-[#635FC7] hover:bg-[#726fdb] transition-all ease-in duration-150"
        >
          Create New Board
        </Button>
      </form>
    </Form>
  );
}
