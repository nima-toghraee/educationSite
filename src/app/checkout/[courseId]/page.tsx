import React from "react";
import CheckoutForm from "@/components/checkout/CheckoutForm";

interface PageProps {
  // 1. Change params to a Promise
  params: Promise<{
    courseId: string;
  }>;
}

// 2. Make the component async
export default async function CheckoutPage({ params }: PageProps) {
  // 3. Await the params before accessing properties
  const { courseId } = await params;

  return (
    <div className="p-6 max-w-md mx-auto">
      {/* CheckoutForm itself is a client component */}
      <CheckoutForm courseId={courseId} />
    </div>
  );
}
