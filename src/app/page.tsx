import React from "react";
import ClientPrefectureTrend from "@/components/ClientPrefectureTrend";
import { GetTrendChartData } from "@/lib/GetStatsData";

export default async function Home() {
  const { trend, prefectures } = await GetTrendChartData();

  console.dir(trend);
  console.dir(prefectures);

  return (
    <>
      <ClientPrefectureTrend prefectures={prefectures} trend={trend} />
    </>
  );
}
