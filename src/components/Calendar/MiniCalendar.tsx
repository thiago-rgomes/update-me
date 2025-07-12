import { useState } from "react";

export default function MiniCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const totalDays = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const daysArray = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  return (
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

          return (
            <div
              key={index}
              className={`p-2 rounded ${
                isToday ? "bg-yellow-400 text-black font-bold" : "opacity-80"
              }`}
            >
              {day ?? ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}