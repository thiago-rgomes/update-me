type Holiday = {
  date: string;
  name: string;
  type: string;
};

type Props = {
  holidays: Holiday[];
  year: number;
};

export default function HolidayList({ holidays, year }: Props) {
  return (
    <div className="bg-white/5 p-4 rounded-lg shadow-inner max-h-80 w-90 overflow-y-auto custom-scrollbar">
      <h3 className="text-md font-semibold mb-2 text-center">Feriados {year}</h3>
      <ul className="space-y-1 text-sm">
        {holidays.map((h) => (
          <li
            key={h.date}
            className="flex justify-between border-b border-white/10 "
          >
            <span>
              {new Date(h.date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
            <span className="text-right text-white/90">{h.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}