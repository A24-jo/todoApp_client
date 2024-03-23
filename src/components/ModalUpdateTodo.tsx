import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Todo } from "../types/todos";

interface ModalUpdateTodoProps {
  show: boolean;
  selectedTodo: Todo;
  closeModal: () => void;
  handleUpdateTodo: () => Promise<void>;
  setSelectedTodo: Dispatch<SetStateAction<Todo>>;
}

const ModalUpdateTodo = ({
  closeModal,
  handleUpdateTodo,
  selectedTodo,
  show,
  setSelectedTodo,
}: ModalUpdateTodoProps) => {
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedTodo((prev) => ({ ...prev, task: e.target.value }));
  };

  const handleIsCompleteChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedTodo((prev) => ({ ...prev, isCompleted: e.target.checked }));
  };

  return (
    show && (
      <div className="w-screen fixed z-10 h-screen flex items-center justify-center">
        <div
          className="border bg-slate-200 dark:bg-[#f9fafb6d] rounded flex flex-col items-center justify-between p-4 gap-5"
          style={{ backdropFilter: "blur(2px)" }}
        >
          <h2 className="font-bold text-lg dark:text-white">Update Todo</h2>
          <div className="flex flex-col gap-2">
            <input
              className="h-10 px-3 py-2 bg-white dark:bg-slate-700 dark:text-slate-200 dark:border-slate-500 border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-violet-500 focus:ring-violet-500 block  rounded-tl-lg rounded-lg sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none"
              value={selectedTodo.task}
              type="text"
              name="task"
              id={selectedTodo.id}
              onChange={handleNameChange}
            />
            <div className="flex gap-4 items-center ">
              <input
              className="w-4 h-4"
                type="checkbox"
                name="isCompleted"
                checked={selectedTodo.isCompleted}
                onChange={handleIsCompleteChange}
              />
              <p>Complete todo ?.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="h-10 bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-tr-lg rounded-lg font-semibold text-white"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="h-10 bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-tr-lg rounded-lg font-semibold text-white"
              onClick={handleUpdateTodo}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalUpdateTodo;
