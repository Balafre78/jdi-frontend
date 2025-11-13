import api from './index'
import type { Todolist, Task, CreateTodolistRequest, CreateTaskRequest } from '../types/api'

export async function getTodolists(): Promise<Todolist[]> {
  const res = await api.get<Todolist[]>('/todolist');
  return res.data;
}

export async function createTodolist(data: CreateTodolistRequest): Promise<Todolist> {
    const res = await api.post<Todolist>('/todolist', data);
    return res.data;
}

export async function deleteTodolist(todoId: string): Promise<{ message: string }> {
    const res = await api.delete<{ message: string }>(`/todolist/${todoId}`);
    return res.data;
}


export async function getTasks(todoId: string): Promise<Task[]> {
  const res = await api.get<Task[]>(`/todolist/${todoId}/task`);
  return res.data;
}

export async function createTask(todoId: string, data: CreateTaskRequest): Promise<Task> {
  const res = await api.post<Task>(`/todolist/${todoId}/task`, data);
  return res.data;
}
