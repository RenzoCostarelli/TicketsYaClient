"use client";

import { useEffect, useState } from "react";

interface DateTimeSelection {
  id: number;
  date: string; // Usamos string para el valor del input datetime-local
}
export default function DatesPicker() {
  const [dateTimeSelections, setDateTimeSelections] = useState<
    DateTimeSelection[]
  >([
    { id: 0, date: new Date().toISOString().slice(0, 16) }, // Inicializa con la fecha y hora actual
  ]);
  const [counter, setCounter] = useState(1);

  const handleAddDateTime = () => {
    const newSelection = {
      id: counter,
      date: new Date().toISOString().slice(0, 16),
    };
    setDateTimeSelections([...dateTimeSelections, newSelection]);
    setCounter(counter + 1);
  };

  const handleRemoveDateTime = (id: number) => {
    setDateTimeSelections(
      dateTimeSelections.filter((selection) => selection.id !== id)
    );
  };

  const handleDateChange = (date: string, id: number) => {
    const updatedSelections = dateTimeSelections.map((selection) => {
      if (selection.id === id) {
        return { ...selection, date: date };
      }
      return selection;
    });
    setDateTimeSelections(updatedSelections);
  };

  useEffect(() => {
    console.log("datetime", dateTimeSelections);
  }, [dateTimeSelections]);

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
            onChange={(e) => handleDateChange(e.target.value, selection.id)}
            style={{ marginRight: "10px" }}
          />
          {index === dateTimeSelections.length - 1 ? (
            <button onClick={handleAddDateTime} style={{ marginRight: "5px" }}>
              +
            </button>
          ) : (
            <button onClick={() => handleRemoveDateTime(selection.id)}>
              -
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
