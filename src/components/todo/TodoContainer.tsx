// import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import AddTodoDialog from "./AddTodoDialog";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";
import { useGetTodosQuery } from "@/redux/api/api";

const TodoContainer = () => {
  // const { todos } = useAppSelector((state) => state.todos);

  const [priority, setPriority] = useState("");
  const { data: todos, isLoading, isError } = useGetTodosQuery(priority);
  if (isLoading) {
    return <p>...Loading</p>;
  }
  console.log(todos.data);

  return (
    <div>
      <div className="space-x-3 mb-5">
        <AddTodoDialog></AddTodoDialog>

        <TodoFilter priority={priority} setPriority={setPriority}></TodoFilter>
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl p-5 space-y-3">
        {todos?.data?.length === 0 && (
          <div className="bg-white p-3 rounded-md">
            <p className="text-center text-2xl">There is no task pending</p>
          </div>
        )}

        {todos?.data?.map((item) => (
          <TodoCard {...item} key={item._id}></TodoCard>
        ))}
      </div>
    </div>
  );
};

export default TodoContainer;
