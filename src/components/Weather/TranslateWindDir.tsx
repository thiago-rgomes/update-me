export default function translateWindDir(dir: string): string {
  const map: Record<string, string> = {
    N: 'Norte',
    NNE: 'Norte-Nordeste',
    NE: 'Nordeste',
    ENE: 'Leste-Nordeste',
    E: 'Leste',
    ESE: 'Leste-Sudeste',
    SE: 'Sudeste',
    SSE: 'Sul-Sudeste',
    S: 'Sul',
    SSW: 'Sul-Sudoeste',
    SW: 'Sudoeste',
    WSW: 'Oeste-Sudoeste',
    W: 'Oeste',
    WNW: 'Oeste-Noroeste',
    NW: 'Noroeste',
    NNW: 'Norte-Noroeste',
  };

  return map[dir] || dir;
}