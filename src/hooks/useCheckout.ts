import { useState } from "react";
import * as api from "../lib/apiCheckout";

interface CheckoutData {
  total_amount: number;
  discount_amount: number;
  final_amount: number;
}

interface CouponData {
  discountAmount: number;
  finalAmount: number;
}

export const useCheckout = () => {
  const [courseId, setCourseId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleCheckout = async (userId: number) => {
    if (!courseId) return;
    setLoading(true);
    setMessage("");

    try {
      const data: CheckoutData = await api.checkout(userId, courseId, couponCode);
      setTotalAmount(data.total_amount);
      setDiscountAmount(data.discount_amount);
      setFinalAmount(data.final_amount);
      setMessage("دوره با موفقیت باز شد!");
      return data;
    } catch (err: unknown) {
      console.error(err);
      // تایپ ایمن برای err
      if (err instanceof Error) setMessage(err.message);
      else setMessage("خطا در خرید دوره");
    } finally {
      setLoading(false);
    }
  };

  const handleValidateCoupon = async () => {
    if (!couponCode || !courseId) return;
    try {
      const data: CouponData = await api.validateCoupon(couponCode, courseId);
      setDiscountAmount(data.discountAmount);
      setFinalAmount(data.finalAmount);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return {
    courseId,
    setCourseId,
    token,
    setToken,
    couponCode,
    setCouponCode,
    totalAmount,
    discountAmount,
    finalAmount,
    loading,
    message,
    setMessage,
    setLoading,
    handleCheckout,
    handleValidateCoupon,
  };
};
