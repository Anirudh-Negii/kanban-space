import { PRIORITIES, STATUSES, STORAGE_KEY } from "../constants";

export function normalizeTask(task, index) {
  if (!task || typeof task !== "object" || typeof task.title !== "string") {
    return null;
  }
  const title = task.title.trim();
  if (!title) return null;

  return {
    id: typeof task.id === "string" && task.id ? task.id : `saved-task-${index}`,
    title,
    description: typeof task.description === "string" ? task.description : "",
    priority: PRIORITIES.includes(task.priority) ? task.priority : "Medium",
    dueDate: typeof task.dueDate === "string" ? task.dueDate : "",
    status: STATUSES.includes(task.status) ? task.status : "Todo",
  };
}

export function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (!savedTasks) return [];

    const parsedTasks = JSON.parse(savedTasks);
    return Array.isArray(parsedTasks)
      ? parsedTasks.map(normalizeTask).filter(Boolean)
      : [];
  } catch {
    return [];
  }
}
