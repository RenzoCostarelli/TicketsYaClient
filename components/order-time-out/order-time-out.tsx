"use client";
import { updateOrder } from "@/lib/actions";
import { Order } from "@/types/order";
import { useCallback, useEffect, useState } from "react";

export default function OrderTimeOut({ order }: { order: Order }) {
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const orderCreatedDate = order.createdAt;
  const orderId = order.id;

  const calculateTimeLeft = useCallback(() => {
    const fifteenMinutes = 4 * 60 * 1000;
    const deadline = new Date(orderCreatedDate.getTime() + fifteenMinutes);
    const now = new Date();
    const timeLeft = deadline.getTime() - now.getTime();

    if (
      Math.max(Math.floor(timeLeft / 1000), 0) <= 0 &&
      order.status !== "EXPIRED"
    ) {
      updateOrder(
        {
          status: "EXPIRED",
        },
        orderId as string
      );
    }
    return Math.max(Math.floor(timeLeft / 1000), 0);
  }, [orderCreatedDate, orderId, order.status]); // Añade aquí todas las dependencias externas de la función

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]); // Ahora `calculateTimeLeft` es estable entre renderizados

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return <span>{formattedTime}</span>;
}
