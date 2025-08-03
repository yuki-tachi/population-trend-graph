"use client";
import { useState } from "react";
import PrefectureCheckboxes from "@/components/PrefectureCheckboxes";
import LineGraph from "@/components/LineGraph";
import { Prefecture, TrendChartData } from "@/lib/GetStatsData";

type Props = {
  prefectures: Prefecture[];
  trend: TrendChartData[];
};

export default function ClientPrefectureTrend({ prefectures, trend }: Props) {
  const [checkedNames, setCheckedNames] = useState<string[]>([]);

  // チェックボックスの変更時に選択コード配列を更新
  //   const handleChange = (codes: string[]) => setCheckedCodes(codes);
  const handleChange = (names: string[]) => {
    setCheckedNames(names);
  };

  // checkedNamesに存在する都道府県名だけでtrendデータを整形
  const filteredTrend = trend.map((item) => {
    const filtered: { year: number } & { [name: string]: number } = {
      year: item.year,
    };
    // checkedNamesに含まれる都道府県名のデータだけを抽出
    checkedNames.forEach((name) => {
      if (item[name] !== undefined) {
        filtered[name] = item[name];
      }
    });

    return filtered;
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[minmax(220px,1fr)_3fr] gap-1">
        <div className="bg-white rounded-lg shadow-sm p-3 m-3">
          <h3>
            <b>都道府県</b>
          </h3>
          <PrefectureCheckboxes
            prefectures={prefectures}
            checkedNames={checkedNames}
            onChange={handleChange}
          />
          <div className="flex justify-center">
            <button
              className="px-2 py-1 bg-blue-200 rounded hover:bg-blue-300"
              onClick={() => setCheckedNames([])}
              type="button"
            >
              クリア
            </button>
          </div>
        </div>

        <div
          className="flex-1 bg-white rounded-lg shadow-sm p-3 m-3"
          style={{ height: 600 }}
        >
          <LineGraph chartData={filteredTrend} />
        </div>
      </div>
    </>
  );
}
