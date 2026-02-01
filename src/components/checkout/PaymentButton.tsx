"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "../../hooks/useCheckout";

interface Props {
  checkout: ReturnType<typeof useCheckout>;
  userId: number;
  setError?: (msg: string | null) => void;
}

const PaymentButton: React.FC<Props> = ({ checkout, userId, setError }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    setError?.(null);

    try {
      await checkout.handleCheckout(userId);

      // پیام موفقیت پرداخت تستی
      alert("پرداخت تستی با موفقیت انجام شد! دوره به حساب شما اضافه شد 🎉");

      // انتقال به داشبورد بعد از 1 ثانیه
      router.push("/dashboard");
    } catch (err: unknown) {
      console.error(err);

      const message =
        err instanceof Error
          ? err.message
          : "خطا در پردازش پرداخت. لطفاً دوباره تلاش کنید.";

      if (setError) setError(message);
      else alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading || checkout.loading}
      className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300"
    >
      {loading || checkout.loading ? "در حال پردازش..." : "پرداخت"}
    </button>
  );
};

export default PaymentButton;
