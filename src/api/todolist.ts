import api from '@/api'
import type {
  Todolist,
  Task,
  CreateTodolistRequest,
  CreateTaskRequest,
  UpdateTaskRequest,
  UpdateTaskResponse,
  UpdateTodolistResponse,
  UpdateTodolistRequest,
} from '@/types'

export async function getTodolists(): Promise<Todolist[]> {
  const res = await api.get<Todolist[]>('/todolist');
  return res.data;
}

export async function createTodolist(data: CreateTodolistRequest): Promise<UpdateTodolistResponse> {
    const res = await api.post<UpdateTodolistResponse>('/todolist', data);
    return res.data;
}

export async function deleteTodolist(todoId: string): Promise<UpdateTodolistResponse> {
    const res = await api.delete<UpdateTodolistResponse>(`/todolist/${todoId}`);
    return res.data;
}

export async function updateTodolist(todoId: string, data: UpdateTodolistRequest): Promise<UpdateTodolistResponse> {
    const res = await api.put<UpdateTodolistResponse>(`/todolist/${todoId}`, data);
    return res.data;
}

export async function getTasks(todoId: string): Promise<Task[]> {
  const res = await api.get<Task[]>(`/todolist/${todoId}/task`);
  return res.data;
}

export async function createTask(todoId: string, data: CreateTaskRequest): Promise<UpdateTaskResponse> {
  const res = await api.post<UpdateTaskResponse>(`/todolist/${todoId}/task`, data);
  return res.data;
}

export async function updateTask(todoId: string, data: UpdateTaskRequest): Promise<UpdateTaskResponse> {
  const res = await api.put<UpdateTaskResponse>(`/todolist/task/${todoId}`, data);
  return res.data;
}

export async function deleteTask(todoId: string): Promise<UpdateTaskResponse> {
  const res = await api.delete<UpdateTaskResponse>(`/todolist/task/${todoId}`);
  return res.data;
}
