import { STATUSES } from "../constants";

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <article className="min-w-0 rounded-lg border border-gray-700 bg-[#202020] p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="wrap-break-word font-medium text-gray-100">
          {task.title}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${priorityClass(task.priority)}`}
        >
          {task.priority}
        </span>
      </div>
      {task.description && (
        <p className="mt-2 wrap-break-word text-sm leading-5 text-gray-400">
          {task.description}
        </p>
      )}
      {task.dueDate && (
        <p className="mt-3 text-xs text-gray-500">
          Due{" "}
          {new Date(`${task.dueDate}T00:00:00`).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      )}
      <label className="mt-4 block">
        <span className="sr-only">Status for {task.title}</span>
        <select
          value={task.status}
          onChange={(event) => onStatusChange(task.id, event.target.value)}
          className="w-full cursor-pointer rounded-md border border-gray-700 bg-[#262626] px-2 py-1.5 text-xs text-gray-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          {STATUSES.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </label>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-md bg-green-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </article>
  );
}

function priorityClass(priority) {
  if (priority === "High") {
    return "bg-red-500/15 text-red-300";
  }
  if (priority === "Low") {
    return "bg-gray-700 text-gray-300";
  }
  return "bg-yellow-500/15 text-yellow-300";
}

export default TaskCard;
