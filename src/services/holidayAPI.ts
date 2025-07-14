export type Holiday = {
  date: string;
  name: string;
  type: string;
};

export async function fetchHolidays(year: number): Promise<Holiday[]> {
  try {
    const res = await fetch(`https://brasilapi.com.br/api/feriados/v1/${year}`);
    if (!res.ok) throw new Error("Erro na resposta da API");
    const data: Holiday[] = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar feriados:", error);
    return [];
  }
}