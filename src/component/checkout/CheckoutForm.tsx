"use client";
import React, { useEffect, useState } from "react";
import { useCheckout } from "../../hooks/useCheckout";
import PaymentSummary from "./PaymentSummary";
import CouponInput from "./CouponInput";
import PaymentButton from "./PaymentButton";
import { useAuth } from "@/hooks/useAuth";

interface CheckoutFormProps {
  courseId: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ courseId }) => {
  const { user, token } = useAuth();
  const checkout = useCheckout();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initCheckout = async () => {
      try {
        if (!user) return;

        checkout.setCourseId(Number(courseId));
        if (token) checkout.setToken(token);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("خطا در بارگذاری اطلاعات پرداخت. لطفاً دوباره تلاش کنید.");
        setLoading(false);
      }
    };
    initCheckout();
  }, [courseId, token, user]);

  if (!user) {
    return (
      <div className="text-center p-10">
        لطفاً ابتدا وارد شوید تا به صفحه خرید دسترسی داشته باشید.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-gray-100 text-center text-gray-500">
        در حال بارگذاری اطلاعات پرداخت...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-red-100 text-red-700 rounded-3xl shadow-xl border border-red-200 text-center">
        {error}
      </div>
    );
  }

  return (
    <div
      className="max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-gray-100 text-right"
      dir="rtl"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        خرید دوره
      </h2>

      <div className="mb-6">
        <CouponInput checkout={checkout} setError={setError} />
      </div>

      <div className="mb-6 bg-gray-50 p-4 rounded-xl shadow-sm">
        <PaymentSummary
          total={checkout.totalAmount || 0}
          discount={checkout.discountAmount || 0}
          final={checkout.finalAmount || 0}
        />
      </div>

      <div className="text-center">
        <PaymentButton
          checkout={checkout}
          userId={Number(user.id)}
          setError={setError}
        />
      </div>
    </div>
  );
};

export default CheckoutForm;
