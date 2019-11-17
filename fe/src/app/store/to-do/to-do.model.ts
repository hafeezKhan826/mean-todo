
export interface ToDoItems {
    items: ToDoItem[];
}

export interface ToDoItem {
    id?: string;
    title: string;
    description: string;
    status: string;
}
