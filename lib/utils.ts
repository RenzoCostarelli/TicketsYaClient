import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
