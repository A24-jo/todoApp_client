import { Axios } from "../api";
import { ResposeApi } from "../types/services";

export async function deleteTodo(id: number): Promise<ResposeApi | null> {
  try {
    await Axios.delete(`tasks/${id}`);
    return {
      res: true,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
