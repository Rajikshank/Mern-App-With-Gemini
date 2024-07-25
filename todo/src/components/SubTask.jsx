//component for displaying subtasks under the main tasks

export default function SubTask({ todo, toggleSubtask }) {
  return (
    <>
      <div className="rounded-md text-left gap-1 flex flex-col p-2   ">
        {/* <div className="bg-slate-500 rounded">button here</div>
        {todo.subtask.map((item) => (
          <div className=" bg-slate-500 rounded pl-2" key={item._id}>
            {item.task}{" "}
          </div>
        ))} */}
        <ul class="space-y-4 text-left text-gray-400 dark:text-white ">
          {todo.subtask.map((item) => (
            <li
              className="flex items-center space-x-3 rtl:space-x-reverse bg-gray-400  rounded p-1 "
              key={item._id}
            >
              <button
                onClick={() => toggleSubtask(todo._id, item._id)}
                className=""
              >
                {" "}
                {!item.completed && (
                  <svg
                    className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                )}
                {item.completed && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#FF0000"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#FF0000"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>

              <span className="text-black">{item.task}</span>
            </li>
          ))}
        </ul>
        ;
      </div>
    </>
  );
}
