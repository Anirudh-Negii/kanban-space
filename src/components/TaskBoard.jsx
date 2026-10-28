import { STATUSES } from "../constants";
import TaskColumn from "./TaskColumn";

function TaskBoard({ tasks, onEdit, onDelete, onStatusChange }) {
  return (
    <section
      className="grid grid-cols-1 gap-4 md:grid-cols-3"
      aria-label="Task board"
    >
      {STATUSES.map((status) => (
        <TaskColumn
          key={status}
          status={status}
          tasks={tasks.filter((task) => task.status === status)}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </section>
  );
}

export default TaskBoard;
