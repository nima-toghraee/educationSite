"use client";
import React from "react";

interface Props {
  total: number;
  discount: number;
  final: number;
}

const PaymentSummary: React.FC<Props> = ({ total, discount, final }) => {
  const formatPrice = (amount: number) => amount.toLocaleString("fa-IR");

  return (
    <div className="payment-summary space-y-1">
      <p>کل: {formatPrice(total)} تومان</p>
      <p>تخفیف: {formatPrice(discount)} تومان</p>
      <p>قیمت نهایی: {formatPrice(final)} تومان</p>
    </div>
  );
};

export default PaymentSummary;
