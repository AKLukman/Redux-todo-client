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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddTodoMutation } from "@/redux/api/api";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { addTodo } from "@/redux/features/todoSlice";
// import { useAppDispatch } from "@/redux/hooks";
import { FormEvent, useState } from "react";
const AddTodoDialog = () => {
  const [task, setTask] = useState("");
  const [description, setDesc] = useState("");
  // const dispatch = useAppDispatch();
  const [addTodo, { isLoading, isSuccess }] = useAddTodoMutation();
  const [priority, setPriority] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // const id = Math.random().toString(36).substring(2, 7);
    const taskDetails = {
      title: task,
      description,
      isCompleted: false,
      priority,
    };
    // dispatch(addTodo(taskDetails));
    addTodo(taskDetails);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-primary-gradient text-lg text-white font-semibold p-3 rounded-md uppercase">
          Add Todo
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>
              Add your task that you want to finish!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task" className="text-right">
                Task
              </Label>
              <Input
                id="task"
                onBlur={(e) => setTask(e.target.value)}
                placeholder="task title"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                onBlur={(e) => setDesc(e.target.value)}
                id="description"
                placeholder="task description"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Priority
              </Label>
              <Select onValueChange={(value) => setPriority(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoDialog;
