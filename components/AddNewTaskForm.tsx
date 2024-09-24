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
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDialog } from "@/context/dialogContext";
import { addNewTask, editTask } from "@/lib/action";
import { useEffect, useRef, useState } from "react";

export default function AddNewTaskForm({ columns }: { columns: Column[] }) {
  const { state, setIsLoading, closeNewTaskDialog } = useDialog();
  const [subTasksError, setSubTasksError] = useState<string>("");

  const editValues = {
    title: state.task ? state.task.title : "",
    description: state.task ? state.task.description : "",
    subtasks: state.task
      ? state.task.subTasks.map((sub) => ({
          subtask_name: sub.subtask,
          _id: sub._id,
          is_complete: sub.is_complete,
        }))
      : [{ subtask_name: "" }],
    status: state.task ? state.task.column_name : "",
  };

  const SubTaskSchema = z.object({
    subtask_name: z.string().min(3, {
      message: "subtask must be atleast 3 letter characters",
    }),
    _id: z.string(),
    is_complete: z.boolean(),
  });

  const FormSchema = z.object({
    title: z
      .string()
      .min(3, {
        message: "Task title name must be atleast 3 letter characters",
      })
      .max(50, { message: "Task title name must not exceed 50 characters" }),
    description: z.string(),
    subtasks: z.array(SubTaskSchema).refine(
      (subtasks) => {
        const subtaskNames = subtasks.map((subtask) =>
          subtask.subtask_name.toLowerCase()
        );
        const uniqueNames = new Set(subtaskNames);
        const result = subtaskNames.length === uniqueNames.size;
        if (!result) {
          setSubTasksError("Duplicate subtask titles are not allowed");
        } else {
          setSubTasksError("");
        }
        return result; // Ensure all names are unique
      },
      {
        message: "Subtask names must be unique.",
      }
    ),
    status: z.string({ required_error: "Please select a board." }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: !state.isEditingTask
      ? {
          title: "",
          description: "",
          subtasks: [{ subtask_name: "", _id: "", is_complete: false }],
          status: columns[0].column_name,
        }
      : editValues,
  });

  const { handleSubmit, control, formState } = form;
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "subtasks",
    control,
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const column = columns.find(
      (column) => column.column_name === values.status
    );
    if (!column) {
      throw new Error("Column not found");
    }

    const updatedColumnVal = { column_id: column?._id, ...values };

    if (!state.isEditingTask) {
      try {
        setIsLoading(true);
        await addNewTask(updatedColumnVal);
        closeNewTaskDialog();
      } catch (error) {
        setIsLoading(false);
        console.log("Failed to create Task", error);
      }
    } else {
      if (state.task) {
        try {
          setIsLoading(true);
          console.log("Working!!!!!!");
          await editTask(updatedColumnVal, state.task);
          closeNewTaskDialog();
        } catch (error) {
          setIsLoading(false);
          console.log("Failed to edit Task", error);
        }
      }
    }
  };

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
      titleRef.current.setSelectionRange(
        titleRef.current.value.length,
        titleRef.current.value.length
      );
    }
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter task title here"
                  className="bg-transparent placeholder:text-base text-base text-white border-[1px] border-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#726fdb] hover:border-[#726fdb]"
                  {...field}
                  ref={titleRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter task description here"
                  className="bg-transparent placeholder:text-base text-base text-white border-[1px] border-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#726fdb] hover:border-[#726fdb] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <div className="space-y-2">
            {fields.length > 0 && (
              <FormLabel className="text-white">Subtasks</FormLabel>
            )}
            {fields.map((field, idx) => (
              <FormField
                control={control}
                key={field.id}
                name={`subtasks.${idx}.subtask_name`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormControl>
                        <Input
                          placeholder="Enter your subtask name here"
                          className="bg-transparent placeholder:text-base text-base text-white border-[1px] border-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#726fdb] hover:border-[#726fdb]"
                          {...field}
                        />
                      </FormControl>

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
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <p className="text-sm text-red-500">{subTasksError}</p>
          <Button
            type="button"
            onClick={() =>
              append({ subtask_name: "", _id: "", is_complete: false })
            }
            className="w-full rounded-full text-[#635FC7] hover:text-white bg-white hover:bg-[#adace1] transition-all ease-in duration-150"
          >
            + Add Subtask
          </Button>
        </div>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-transparent text-white border-[1px] border-gray-600 focus:ring-0 focus:ring-offset-0 focus:border-[#726fdb] hover:border-[#726fdb]">
                    <SelectValue placeholder="Select a Board" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-[#2B2C37] border-[#2B2C37]">
                  {columns.map((column, idx) => {
                    return (
                      <SelectItem
                        value={column.column_name}
                        key={idx}
                        className="text-white hover:bg-[#635FC7] focus:bg-[#635FC7] focus:text-white"
                      >
                        {column.column_name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full rounded-full bg-[#635FC7] hover:bg-[#726fdb] transition-all ease-in duration-150"
        >
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
