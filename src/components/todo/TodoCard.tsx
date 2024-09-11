import { useDeleteTodoMutation, useUpdateTodoMutation } from "@/redux/api/api";
import { removeTodo, toggleComplete } from "@/redux/features/todoSlice";
import { useAppDispatch } from "@/redux/hooks";

type PropsTypes = {
  _id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  priority: string;
};

const TodoCard = ({
  title,
  _id,
  description,
  isCompleted,
  priority,
}: PropsTypes) => {
  const [deleteTodo, { isError, isLoading }] = useDeleteTodoMutation();
  const [updateToggleState, {}] = useUpdateTodoMutation();
  const handleToggle = () => {
    // dispatch(toggleComplete(_id));
    const taskUpdate = {
      title,
      description,
      priority,
      isCompleted: !isCompleted,
    };
    const data = {
      id: _id,
      data: taskUpdate,
    };
    updateToggleState(data);
  };
  return (
    <div className="bg-white rounded-md flex justify-between items-center p-3">
      <input
        onChange={handleToggle}
        type="checkbox"
        name=""
        id="complete"
        defaultChecked={isCompleted}
      />
      <p>{title}</p>
      <p>{description}</p>
      <p>{priority}</p>
      <div>
        {isCompleted ? (
          <p className="bg-green-500 p-2 rounded-md text-white font-semibold">
            Done
          </p>
        ) : (
          <p className="bg-red-400 p-2 rounded-md text-white">Pending</p>
        )}
      </div>
      <div className="space-x-5">
        <button className="bg-[#5C53FE] text-lg text-white font-semibold p-3 rounded-md uppercase">
          edit
        </button>
        <button
          onClick={() => deleteTodo(_id)}
          className="bg-[#DC02c3] text-lg text-white font-semibold p-3 rounded-md uppercase"
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
