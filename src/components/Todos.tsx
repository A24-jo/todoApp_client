import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import { Row } from "./Row";
import { AddTodo } from "./AddTodo";
import { Todo } from "../types/todos";
import useDarkMode from "../hook/useDarkMode";
import { TaskApi } from "../service";
import { ResposeApi } from "../types/services";
import ModalUpdateTodo from "./ModalUpdateTodo";

export const Todos = () => {
  const emptyTodo: Todo = {
    id: "",
    isCompleted: false,
    task: "",
  };
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>("");
  const [showModalUpdateTodo, setShowModalUpdateTodo] =
    useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>(emptyTodo);


  const handleSubmitTodo = async (e: FormEvent) => {
    e.preventDefault();

    if (!task.trim()) return;
    //! add todos
    const res = await TaskApi.postTodo(task);
    if (!res || !res.res) {
      console.log("algun error");
      //! mostrar un toast o algo cuando falla
    }
    setTask("");
    TaskApi.getAllTodos().then(setAllTodoState);
  };

  const handleChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setTask(value);
  };

  const handleShowModalUpdateTodo = (todo: Todo) => {
    setShowModalUpdateTodo(true);
    setSelectedTodo(todo);
  };

  const closeModal = () => {
    setShowModalUpdateTodo(false);
    setSelectedTodo(emptyTodo);
  };

  const handleUpdateTodo = async () => {
    //! update todos
     const res = await TaskApi.updateTodo(selectedTodo)
     if (!res || !res.res) {
         console.log("algun error")
    //!     mostrar un toast o algo
     }
     TaskApi.getAllTodos().then(setAllTodoState);
     closeModal();
  };

  const handleDeleteTodo = async (id: string) => {
    //! delete todos
    await TaskApi.deleteTodo(Number(id));
    TaskApi.getAllTodos().then(setAllTodoState);
  };

  const [darkMode, setDarkMode] = useDarkMode();
  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
  };

  const setAllTodoState = (data: ResposeApi<Todo[]> | null) => {
    if (!data || !data.res) {
      // hubo algun error
      return;
    }
    setTodos(data.data!);
  };

  useEffect(() => {
    //! get all todos
    TaskApi.getAllTodos().then(setAllTodoState);
  }, []);

  return (
    <section className="h-screen flex items-center flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full p-3 bg-white dark:bg-slate-800 shadow overflow-hidden sm:rounded-lg space-y-8">
        <div className="flex justify-between">
          <h1 className="font-bold text-lg dark:text-white">Todo App</h1>
          <DarkModeSwitch
            style={{ width: "20px", height: "20px" }}
            checked={darkMode}
            onChange={toggleDarkMode}
            size={120}
          />
        </div>
        <AddTodo
          handleSubmitTodo={handleSubmitTodo}
          handleChange={handleChange}
          task={task}
        />
        <div className="h-80 overflow-x-hidden overflow-y-auto todo-list">
          {todos
            .map((todo) => (
              <Row
                key={todo.id}
                todo={todo}
                handleDeleteTodo={handleDeleteTodo}
                handleShowModalUpdateTodo={handleShowModalUpdateTodo}
              />
            ))
            .reverse()}
        </div>
      </div>
      <ModalUpdateTodo
        closeModal={closeModal}
        show={showModalUpdateTodo}
        selectedTodo={selectedTodo}
        setSelectedTodo={setSelectedTodo}
        handleUpdateTodo={handleUpdateTodo}
      />
    </section>
  );
};
