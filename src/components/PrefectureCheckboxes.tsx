"use client";
import CommonCheckbox from "@/components/CommonCheckbox";
import { Prefecture } from "@/lib/GetStatsData";

type Props = {
  prefectures: Prefecture[];
  checkedNames: string[];
  onChange: (codes: string[]) => void;
};

export default function PrefectureCheckboxes({
  prefectures,
  checkedNames,
  onChange,
}: Props) {
  const handleCheckboxChange = (name: string, checked: boolean) => {
    const newNames = checked
      ? [...checkedNames, name]
      : checkedNames.filter((n) => n !== name);
    console.log("Updated checked names:", newNames);

    onChange(newNames);
  };

  return (
    <>
      {prefectures.map((pref) => (
        <CommonCheckbox
          key={pref.name}
          id={pref.name}
          label={pref.name}
          checked={checkedNames.includes(pref.name)}
          onChange={(e) => handleCheckboxChange(pref.name, e.target.checked)}
        />
      ))}
    </>
  );
}
