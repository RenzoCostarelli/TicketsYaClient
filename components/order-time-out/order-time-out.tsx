"use client";
import { updateOrder } from "@/lib/actions";
import { Order } from "@/types/order";
import { useCallback, useEffect, useState } from "react";

export default function OrderTimeOut({ order }: { order: Order }) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isClientSide, setIsClientSide] = useState<boolean>(false);
  const orderId = order.id;

  const calculateTimeLeft = useCallback(() => {
    const fifteenMinutes = 15 * 60 * 1000;
    const deadline = new Date(order.createdAt).getTime() + fifteenMinutes;
    const now = new Date().getTime();
    const timeLeft = deadline - now;

    if (timeLeft <= 0) {
      if (order.status === "PENDING") {
        updateOrder({ status: "EXPIRED" }, orderId as string);
      }
      return 0;
    }
    return Math.max(Math.floor(timeLeft / 1000), 0);
  }, [order.createdAt, order.status, orderId]);

  useEffect(() => {
    setIsClientSide(true);
    setTimeLeft(calculateTimeLeft());
  }, [calculateTimeLeft]);

  useEffect(() => {
    if (!isClientSide) return;

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isClientSide, calculateTimeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  // RARO ESTO
  if (!isClientSide) {
    return <span>Cargando...</span>;
  }

  return (
    <div className="flex max-2-md mx-auto justify-center">
      <h5>
        Tu orden expira en:<span className="font-bold"> {formattedTime}</span>
      </h5>
    </div>
  );
}
