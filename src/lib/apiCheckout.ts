import axios from "axios";

export const validateCoupon = async (code: string, order_id: number) => {
  const res = await axios.post("http://localhost:5000/api/coupons/validate", {
    code,
    order_id,
  });
  return res.data;
};

export const checkout = async (user_id: number, course_id: number, coupon_code?: string) => {
  const res = await axios.post("http://localhost:5000/api/checkout", {
    user_id,
    course_id,
    coupon_code,
  });
  return res.data;
};




export const verifyPayment = async (authority: string) => {
  const res = await axios.post("http://localhost:5000/api/payments/verify", { authority });
  return res.data;
};
 