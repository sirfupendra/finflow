import React, { useState } from "react";
import { CheckCircle2, Copy } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function PaymentSuccess() {
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const paymentResponse = location.state || {}; // Get the response passed via state

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(paymentResponse, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="bg-green-50 border-b border-green-200 p-6 text-center">
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-700">Payment Successful</h2>
            <p className="text-green-600 mt-1">
              Your transaction has been processed successfully
            </p>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-sm font-medium text-gray-500">Transaction Status</span>
              <span className="font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                {paymentResponse.staus || "N/A"}
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-sm font-medium text-gray-500">Customer</span>
              <span className="font-semibold">{paymentResponse.customer || "N/A"}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-sm font-medium text-gray-500">Amount Left</span>
              <span className="font-semibold">
                {paymentResponse.Amountleft
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    }).format(paymentResponse.Amountleft)
                  : "N/A"}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3">
              <span className="text-sm font-medium text-gray-500">Message</span>
              <span className="font-semibold">{paymentResponse.message || "N/A"}</span>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                <Copy className="h-4 w-4" />
                {copied ? "Copied!" : "Copy Details"}
              </button>
            </div>

            <div className="text-center text-sm text-gray-500 mt-4">
              Data sent successfully to merchantbank
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}