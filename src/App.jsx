import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import TaskBoard from "./components/TaskBoard";
import TaskForm from "./components/TaskForm";
import Toolbar from "./components/Toolbar";
import { EMPTY_FORM, STORAGE_KEY } from "./constants";
import { loadTasks } from "./utils/tasks";

function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [titleError, setTitleError] = useState("");
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(normalizedSearch);
      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;
      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;
      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [tasks, search, priorityFilter, statusFilter]);

  const openAddForm = () => {
    setEditingTask(null);
    setFormData(EMPTY_FORM);
    setTitleError("");
    setIsFormOpen(true);
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
    });
    setTitleError("");
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
    setFormData(EMPTY_FORM);
    setTitleError("");
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (name === "title" && value.trim()) setTitleError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = formData.title.trim();

    if (!title) {
      setTitleError("Please enter a task title.");
      return;
    }

    if (editingTask) {
      setTasks((current) =>
        current.map((task) =>
          task.id === editingTask.id ? { ...task, ...formData, title } : task,
        ),
      );
    } else {
      setTasks((current) => [
        ...current,
        { ...formData, title, status: "Todo", id: crypto.randomUUID() },
      ]);
    }
    closeForm();
  };

  const deleteTask = (taskId) => {
    if (window.confirm("Delete this task? This action cannot be undone.")) {
      setTasks((current) => current.filter((task) => task.id !== taskId));
    }
  };

  const updateStatus = (taskId, status) => {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, status } : task)),
    );
  };

  return (
    <main className="min-h-screen bg-[#1c1c1c] text-white">
      <Header onAddTask={openAddForm} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-7">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Your Tasks
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            A simple space to organize tasks and track your daily progress.
          </p>
        </section>

        <Toolbar
          search={search}
          priorityFilter={priorityFilter}
          statusFilter={statusFilter}
          onSearchChange={setSearch}
          onPriorityChange={setPriorityFilter}
          onStatusChange={setStatusFilter}
        />

        {filteredTasks.length === 0 && tasks.length > 0 && (
          <p className="mb-4 rounded-lg border border-gray-700 bg-[#262626] px-4 py-3 text-center text-sm text-gray-400">
            No tasks found. Try adjusting your search or filters.
          </p>
        )}

        <TaskBoard
          tasks={filteredTasks}
          onEdit={openEditForm}
          onDelete={deleteTask}
          onStatusChange={updateStatus}
        />
      </div>

      {isFormOpen && (
        <TaskForm
          formData={formData}
          titleError={titleError}
          isEditing={Boolean(editingTask)}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          onClose={closeForm}
        />
      )}
    </main>
  );
};

export default App;
