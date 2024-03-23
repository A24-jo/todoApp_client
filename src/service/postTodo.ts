import { Axios } from "../api"
import { ResposeApi } from "../types/services"

export async function postTodo(taskName:string): Promise<ResposeApi | null> {
    try {
        
    await Axios.post("tasks",{task:taskName});

        return {
            res: true
        }
    } catch (error) {
        console.log(error)
        return null
    }
}