import { Axios } from "../api"
import { ResposeApi } from "../types/services"
import { Todo } from "../types/todos"

export async function updateTodo(data: Todo): Promise<ResposeApi | null> {
    try {

        await Axios.put(`tasks/${data.id}`,data);
        return {
            res: true
        }
    } catch (error) {
        console.log(error)
        return null
    }
}