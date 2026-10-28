import { PRIORITIES } from "../constants";

function TaskForm({ formData, titleError, isEditing, onChange, onSubmit, onClose }) {
  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-form-title"
    >
      <form
        onSubmit={onSubmit}
        className="w-full max-w-lg rounded-xl border border-gray-700 bg-[#262626] p-5 shadow-xl sm:p-6"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 id="task-form-title" className="text-xl font-semibold">
            {isEditing ? "Edit Task" : "Add Task"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close form"
            className="cursor-pointer rounded-md px-2 text-2xl leading-none text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="task-title"
              className="mb-1.5 block text-sm font-medium text-gray-300"
            >
              Title <span className="text-red-800">*</span>
            </label>
            <input
              id="task-title"
              name="title"
              value={formData.title}
              onChange={onChange}
              autoFocus
              className="w-full cursor-pointer rounded-md border border-gray-700 bg-[#1c1c1c] px-3 py-2 text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {titleError && (
              <p className="mt-1.5 text-sm text-red-400" role="alert">
                {titleError}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="task-description"
              className="mb-1.5 block text-sm font-medium text-gray-300"
            >
              Description
            </label>
            <textarea
              id="task-description"
              name="description"
              value={formData.description}
              onChange={onChange}
              rows="3"
              className="w-full resize-y rounded-md border border-gray-700 bg-[#1c1c1c] px-3 py-2 text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="task-priority"
                className="mb-1.5 block text-sm font-medium text-gray-300"
              >
                Priority
              </label>
              <select
                id="task-priority"
                name="priority"
                value={formData.priority}
                onChange={onChange}
                className="w-full cursor-pointer rounded-md border border-gray-700 bg-[#1c1c1c] px-3 py-2 text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                {PRIORITIES.map((priority) => (
                  <option key={priority}>{priority}</option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="task-due-date"
                className="mb-1.5 block text-sm font-medium text-gray-300"
              >
                Due date
              </label>
              <input
                id="task-due-date"
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={onChange}
                className="w-full cursor-pointer rounded-md border border-gray-700 bg-[#1c1c1c] px-3 py-2 text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {isEditing ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
