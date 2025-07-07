"use client";
import { useState } from "react";
import CommonCheckbox from "./CommonCheckbox";

type Props = {
  prefectures: string[];
};

export default function PrefectureCheckboxes({ prefectures }: Props) {
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

  const handleChange = (pref: string, value: boolean) => {
    setChecked((prev) => ({ ...prev, [pref]: value }));
  };

  return (
    <>
      {prefectures.map((pref) => (
        <CommonCheckbox
          key={pref}
          id={pref}
          label={pref}
          checked={!!checked[pref]}
          onChange={(e) => handleChange(pref, e.target.checked)}
        />
      ))}
    </>
  );
}
