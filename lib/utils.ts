import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const groupDatesByMonth = (dates: { id: number; date: string }[]) => {
  const months: { [key: string]: number[] } = {};
  dates.forEach((d) => {
    const date = new Date(d.date);
    const month = date.toLocaleString("es-ES", { month: "long" });
    if (!months[month]) {
      months[month] = [];
    }
    months[month].push(date.getDate());
  });
  return months;
};

export const formatDatesByMonth = (months: { [key: string]: number[] }) => {
  return Object.entries(months)
    .map(([month, days]) => {
      if (days.length === 1) {
        return `${days[0]} de ${month}`;
      } else {
        return `${days.join(", ").replace(/, (?=[^,]*$)/, " y ")} de ${month}`;
      }
    })
    .join(", ");
};

export const datesFormater = (dates: string) => {
  const parsedDates = JSON.parse(dates);
  const groupedMonths = groupDatesByMonth(parsedDates);
  const groupedDates = formatDatesByMonth(groupedMonths);
  return groupedDates;
};


export const deleteImage = async (url: string) => {
  return await fetch("/api/uploadthing", {
    method: "DELETE",
    body: JSON.stringify(url),
  });
};