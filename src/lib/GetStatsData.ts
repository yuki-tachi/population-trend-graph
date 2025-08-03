export type Prefecture = {
  code: string;
  name: string;
};

export type TrendChartData = {
  year: number;
  [prefCode: string]:number;
};

// e-Stat APIレスポンスの該当部分型
interface ClassObj {
  '@id': string;
  CLASS: Array<{
    '@code': string;
    '@name': string;
  }>;
}

async function GetStatsData() {
const resource = "http://api.e-stat.go.jp/rest/3.0/app/json/getStatsData?appId=87e00ed9cf1fc7290a80ef098e47a93d2a128eb5&lang=J&statsDataId=0003411597"
  const res = await fetch(resource, { cache: "force-cache" });
  if (!res.ok) {
    throw new Error(`Failed to fetch stats data:${res.status}`);
  }
  return res.json();
}

interface ValueRecord {
  '$': string;
  '@area': string;
  '@tab': string;
  '@time': string;
  '@unit': string;
}

export async function GetTrendChartData(): Promise<{trend: TrendChartData[], prefectures: Prefecture[]}  > {
  const data = await GetStatsData();
  // 都道府県リスト取得
  const classObjs: ClassObj[] = data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ;
  const areaObj = classObjs.find((obj) => obj['@id'] === 'area');
  if (!areaObj) throw new Error('都道府県情報が見つかりません');
  const prefectureMap = new Map(areaObj.CLASS.map(c => [c['@code'], c['@name']]));
  const prefectures = areaObj.CLASS.map((c) => ({
    code: c['@code'],
    name: c['@name']
  }));

  // 人口データ取得
  const records: ValueRecord[] = data.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE;
  // TrendChartData型に変換
  const yearMap = new Map<number, TrendChartData>();
  
  records
  .filter(rec => rec["@tab"] === "10040")
  .forEach(rec => {
      const year = Number(rec['@time'].slice(0, 4));
      const code = rec['@area']; // 都道府県コード
      const prefectureName = prefectureMap.get(code) ?? '';
      let population = Number(rec['$']);
      if (isNaN(population)) population = 0;
      if (!yearMap.has(year)) {
        yearMap.set(year, { year });
      }
      yearMap.get(year)![prefectureName] = population;
    });

    const ret = Array.from(yearMap.values()).sort((a, b) => a.year - b.year);

  return {trend:ret, prefectures};
}
