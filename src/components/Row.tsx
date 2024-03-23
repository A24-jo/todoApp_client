import { Todo } from "../types/todos";
import editIcon from '../assets/edit-2-32.png';

interface TodoProps {
    todo: Todo;
    handleShowModalUpdateTodo: (todo: Todo) => void;
    handleDeleteTodo: (id:string) => void;
}

export const Row = ({todo: {id, task, isCompleted},handleShowModalUpdateTodo, handleDeleteTodo}: TodoProps) => {
    return (
        <div className="shadow rounded-lg p-3 mt-4 bg-gray-50 dark:bg-slate-700 flex justify-between">
            <div className="flex items-center">
                <input
                    className="w-4 h-4"
                    id={'task-name-'+id}
                    type="checkbox"
                    checked={Boolean(isCompleted)}
                    // onChange={() => handleCheckTodo(id)}
                    readOnly
                /> 
                <label className="ml-2 font-medium text-slate-800 dark:text-gray-50 text-sm" htmlFor={'task-name-'+id}>{ task }</label>
            </div>
            <div className="flex gap-2">
                <button className="bg-violet-500 h-8 w-8 p-0 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-2 py-1 text-sm leading-5 rounded-full font-semibold text-white" 
                    aria-label="Delete a todo" onClick={() => handleShowModalUpdateTodo({id,task,isCompleted})}>
                    <img className="object-contain" src={editIcon} alt="edit" />
                </button>
                <button className="bg-violet-500 h-8 w-8 p-0 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-2 py-1 text-sm leading-5 rounded-full font-semibold text-white" 
                    aria-label="Delete a todo" onClick={() => handleDeleteTodo(id)}>
                    X
                </button>
            </div>
        </div>
    )
}