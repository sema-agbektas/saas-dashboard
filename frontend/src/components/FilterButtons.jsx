export default function FilterButtons({ rangeDays, setRangeDays }) {
  const options = [7, 30, 90];

  return (
    <div className="inline-flex items-center rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
      {options.map((days) => {
        const active = rangeDays === days;

        return (
          <button
            key={days}
            onClick={() => setRangeDays(days)}
            disabled={active}
            className={`relative rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200
              ${
                active
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }
            `}
          >
            {days}D
          </button>
        );
      })}
    </div>
  );
}