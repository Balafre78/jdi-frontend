import { defineStore } from 'pinia'
import {
  getTodolists,
  createTodolist,
  deleteTodolist,
  updateTodolist,
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from '@/api/todolist'
import type {
  Todolist,
  Task,
  CreateTodolistRequest,
  UpdateTodolistRequest,
  CreateTaskRequest,
  UpdateTaskRequest
} from '@/types'

interface TodolistStore {
  lists: Todolist[]
  tasksByList: Record<string, Task[]>
}

export const useTodolistStore = defineStore('todolist', {
  state: (): TodolistStore => ({
    lists: [],
    tasksByList: {},
  }),
  actions: {
    async fetchLists(): Promise<void> {
      this.lists = await getTodolists()
    },
    async fetchTasks(listId: string): Promise<void> {
      this.tasksByList = {
        ...this.tasksByList,
        [listId]: await getTasks(listId)
      }
    },
    async createList(payload: CreateTodolistRequest): Promise<void> {
      await createTodolist(payload)
      await this.fetchLists()
    },
    async updateList(listId: string, payload: UpdateTodolistRequest): Promise<void> {
      await updateTodolist(listId, payload)
      await this.fetchLists()
    },
    async removeList(listId: string): Promise<void> {
      await deleteTodolist(listId)
      const { [listId]: _, ...rest } = this.tasksByList
      this.tasksByList = rest
      await this.fetchLists()
    },
    async addTask(listId: string, payload: CreateTaskRequest): Promise<void> {
      await createTask(listId, payload)
      await this.fetchTasks(listId)
    },
    async editTask(listId: string, taskId: string, payload: UpdateTaskRequest): Promise<void> {
      await updateTask(listId, taskId, payload)
      await this.fetchTasks(listId)
    },
    async removeTask(listId: string, taskId: string): Promise<void> {
      await deleteTask(listId, taskId)
      await this.fetchTasks(listId)
    }
  }
})

