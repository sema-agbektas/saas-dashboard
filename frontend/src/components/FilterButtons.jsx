export default function FilterButtons({ rangeDays, setRangeDays }) {
  const options = [7, 30, 90];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((days) => {
        const active = rangeDays === days;

        return (
          <button
            key={days}
            onClick={() => setRangeDays(days)}
            disabled={active}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition
              ${
                active
                  ? "bg-slate-900 text-white shadow"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }
              disabled:cursor-default`}
          >
            Last {days} Days
          </button>
        );
      })}
    </div>
  );
}