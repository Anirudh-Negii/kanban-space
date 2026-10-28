function Header({ onAddTask }) {
  return (
    <header className="border-b border-gray-700 bg-[#1c1c1c]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold tracking-tight text-white">
            Kanban<span className="text-blue-400">Space</span>
          </span>
        </div>
        <button
          type="button"
          onClick={onAddTask}
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#1c1c1c] cursor-pointer"
        >
          <span aria-hidden="true" className="mr-1 text-base">
            +
          </span>
          Add Task
        </button>
      </div>
    </header>
  );
}

export default Header;
