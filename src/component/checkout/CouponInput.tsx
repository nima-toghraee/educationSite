"use client";
import React, { useState } from "react";
import { useCheckout } from "../../hooks/useCheckout";

interface Props {
  checkout: ReturnType<typeof useCheckout>;
  setError?: React.Dispatch<React.SetStateAction<string | null>>;
}

const CouponInput: React.FC<Props> = ({ checkout, setError }) => {
  const [input, setInput] = useState("");

  const handleApply = () => {
    checkout.setCouponCode(input);
    checkout.handleValidateCoupon();
  };

  return (
    <div className="coupon-input">
      <input
        type="text"
        placeholder="کد تخفیف رو وارد کنید"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleApply}>ثبت</button>
    </div>
  );
};

export default CouponInput;
