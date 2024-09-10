"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { createBoard, checkBoardNameExists } from "@/lib/action";
import { useDialog } from "@/context/dialogContext";

async function isBoardNameUnique(name: string): Promise<boolean> {
  const exists = await checkBoardNameExists(name); // Make sure this returns a boolean
  return !exists; // Return true if the name is unique
}

const ColumnSchema = z.object({
  column_name: z
    .string()
    .min(2, { message: "Column name must be at least 1 character" })
    .max(50, { message: "Column name must not exceed 50 characters" }),
});

const FormSchema = z.object({
  board_name: z
    .string()
    .min(2, { message: "Board name must be at least 2 characters" })
    .max(50)
    .refine(async (value) => await isBoardNameUnique(value), {
      message: "Board name already exists.",
    }),
  columns: z.array(ColumnSchema),
});

export function AddNewBoardForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      board_name: "",
      columns: [{ column_name: "" }],
    },
  });

  const { handleSubmit, control } = form;

  const { fields, append, remove } = useFieldArray({
    name: "columns",
    control,
  });

  const { closeDialog } = useDialog();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
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
        <div className="space-y-2">
          <FormLabel className="text-white">Board Columns</FormLabel>
          {fields.map((field, idx) => (
            <FormField
              control={control}
              key={field.id}
              name={`columns.${idx}.column_name`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormControl>
                      <Input
                        placeholder="Enter Your Board Name Here"
                        className="bg-transparent placeholder:text-base text-base text-white border-[1px] border-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#726fdb] hover:border-[#726fdb]"
                        {...field}
                      />
                    </FormControl>
                    {idx > 0 && (
                      <span onClick={() => remove(idx)}>
                        <svg
                          className="w-6 h-6 text-gray-500 hover:text-red-500 transition-all duration-150 ease-in cursor-pointer"
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path>
                        </svg>
                      </span>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <div className=" space-y-4">
          <Button
            type="button"
            onClick={() => append({ column_name: "" })}
            className="w-full rounded-full text-[#635FC7] hover:text-white bg-white hover:bg-[#adace1] transition-all ease-in duration-150"
          >
            + Add Column
          </Button>
          <Button
            type="submit"
            className="w-full rounded-full bg-[#635FC7] hover:bg-[#726fdb] transition-all ease-in duration-150"
          >
            Create New Board
          </Button>
        </div>
      </form>
    </Form>
  );
}

