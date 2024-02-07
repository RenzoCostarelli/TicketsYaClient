"use client";

import { useEffect, useState } from "react";

interface DateTimeSelection {
  id: number;
  date: string; // Usamos string para el valor del input datetime-local
}

interface DateTimePickerProps {
  dateTimeSelections: DateTimeSelection[];
  onAddDateTime: () => void;
  onRemoveDateTime: (id: number) => void;
  onDateChange: (date: string, id: number) => void;
}

export default function DatesPicker({
  dateTimeSelections,
  onAddDateTime,
  onRemoveDateTime,
  onDateChange,
}: DateTimePickerProps) {
  return (
    <div>
      {dateTimeSelections.map((selection, index) => (
        <div
          key={selection.id}
          style={{
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type="datetime-local"
            value={selection.date}
            onChange={(e) => onDateChange(e.target.value, selection.id)}
            style={{ marginRight: "10px" }}
          />
          {index === dateTimeSelections.length - 1 ? (
            <button onClick={onAddDateTime} style={{ marginRight: "5px" }}>
              +
            </button>
          ) : (
            <button onClick={() => onRemoveDateTime(selection.id)}>-</button>
          )}
        </div>
      ))}
    </div>
  );
}
