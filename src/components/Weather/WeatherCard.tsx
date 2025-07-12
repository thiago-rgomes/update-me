type WeatherCardProps = {
  date: string;
  icon: string;
  temp: number;
  description: string;
  isToday?: boolean;
};

export default function WeatherCard({date, icon, temp, description, isToday = false}: WeatherCardProps) {
  return (
    <div
      className={`relative p-4 rounded-2xl shadow text-center text-white w-24 transition-all duration-200 ${
        isToday
          ? 'bg-white/20 backdrop-blur border-amber-300 border-2 shadow-lg'
          : 'bg-white/20 backdrop-blur'
      }`}
    >
      {isToday && (
        <div className="absolute top-0 left-0 h-5 w-8 bg-yellow-300 text-black text-[10px] font-bold px-1 py-[2px] rounded-2xl">
          Hoje
        </div>
      )}
      <p className="text-sm">{date}</p>
      <img src={`https:${icon}`} alt="icon" className="mx-auto" />
      <p className="text-xl font-semibold">{temp.toFixed(1)}°C</p>
      <p className="text-xs capitalize">{description}</p>
    </div>
  );
}