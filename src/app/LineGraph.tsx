"use client";
import { TrendChartData } from "@/lib/GetStatsData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function LineGraph({
  chartData,
}: {
  chartData?: TrendChartData[];
}) {
  // chartDataの中から都道府県名のキー一覧を動的に抽出
  const prefectureNames =
    chartData && chartData.length > 0
      ? Object.keys(chartData[0]).filter((key) => key !== "year")
      : [];

  // 都道府県名の数に応じて色を生成
  const colorPalette = Array.from(
    { length: prefectureNames.length },
    (_, i) => `hsl(${i * (360 / prefectureNames.length)},60%,50%)`
  );
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 10, left: 5, bottom: 0 }}
      >
        <XAxis dataKey="year" unit="年"></XAxis>
        <YAxis
          tickFormatter={(value) => value.toLocaleString()}
          unit="人"
          width="auto"
        ></YAxis>
        <Tooltip
          labelFormatter={(label) => `${label}年`}
          formatter={(value: number) => `${value.toLocaleString()}人`}
        />
        <Legend />

        {prefectureNames.map((name, idx) => (
          <Line
            key={name}
            type="monotone"
            dataKey={name}
            stroke={colorPalette[idx % colorPalette.length]}
            name={name}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
