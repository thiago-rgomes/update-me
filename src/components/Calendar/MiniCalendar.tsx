import { useEffect, useState } from "react";
import HolidayList from "./HolidayList";
import { fetchHolidays } from "../../services/holidayAPI";
import type { Holiday } from "../../services/holidayAPI";

export default function MiniCalendar() {
  const today = new Date();
  const [currentMonth, _setCurrentMonth] = useState(today.getMonth());
  const [currentYear, _setCurrentYear] = useState(today.getFullYear());
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const totalDays = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const daysArray = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  useEffect(() => {
    fetchHolidays(currentYear).then(setHolidays);
  }, [currentYear]);

  const isHoliday = (day: number) => {
    const formatted = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    return holidays.find((h) => h.date === formatted);
  };

  return (
    <main className="flex gap-8">
      <div className="w-full max-w-[400px] p-4 rounded-xl bg-white/10 backdrop-blur-md text-white mx-auto">
        <div className="text-center mb-4 font-semibold">
          {new Date(currentYear, currentMonth).toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric",
          })}
        </div>

        <div className="grid grid-cols-7 text-center text-sm font-medium mb-2">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {daysArray.map((day, index) => {
            const isToday =
              day === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear();

            const holiday = isHoliday(day!);

            return (
              <div
                key={index}
                className={`p-2 rounded transition-all ${
                  isToday
                    ? "bg-yellow-400 text-black font-bold"
                    : holiday
                    ? "bg-red-500/80 font-bold text-white"
                    : "opacity-80"
                }`}
                title={holiday?.name || ""}
              >
                {day ?? ""}
              </div>
            );
          })}
        </div>
      </div>
      <HolidayList holidays={holidays} year={currentYear} />
    </main>
  );
}