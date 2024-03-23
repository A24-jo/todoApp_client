import { Axios } from "../api";
import { ResposeApi } from "../types/services";
import { Todo } from "../types/todos";

export async function getAllTodos(): Promise<ResposeApi<Todo[]> | null> {
    try {
        const {data} = await Axios.get("tasks");
        console.log(data)
        return {
            res: true,
            data: data
        }
    } catch (error) {
        console.log(error)
        return null   
    }
}