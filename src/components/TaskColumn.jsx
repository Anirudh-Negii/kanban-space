import TaskCard from "./TaskCard";

function TaskColumn({ status, tasks, onEdit, onDelete, onStatusChange }) {
  return (
    <section
      className="min-w-0 rounded-lg bg-[#262626] p-4"
      aria-labelledby={`${status}-heading`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 id={`${status}-heading`} className="font-semibold">
          {status}
        </h2>
        <span className="rounded-full bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-300">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))
        ) : (
          <p className="rounded-md border border-dashed border-gray-700 px-3 py-8 text-center text-sm text-gray-500">
            No tasks here
          </p>
        )}
      </div>
    </section>
  );
}

export default TaskColumn;
