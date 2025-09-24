import React from "react";

export default function InvoicePage({ data }) {
  if (!data) {
    return <div style={{ textAlign: "center", marginTop: "2rem" }}>No invoice data available</div>;
  }

  return (
    <div className="space-y-6">
         
          <div className="flex justify-center">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
              onClick={handleFetchEmails}
              disabled={loading}
            >
              {loading ? "Fetching..." : "Fetch Emails"}
            </button>
          </div>

          {/* Display Emails */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {emails.length === 0 && !loading && (
              <p className="text-center text-gray-600 col-span-full">
                No invoices fetched yet.
              </p>
            )}

            {emails.map((email, idx) => (
              <div
                key={idx}
                className="bg-white shadow-lg rounded-2xl p-5 border border-gray-200 hover:shadow-xl transition"
              >
                <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                  {email.company || "Unknown Company"}
                </h2>
                <p className="text-gray-600">
                  <span className="font-medium">Order ID:</span>{" "}
                  {email.orderId || "N/A"}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Order Date:</span>{" "}
                  {email.orderDate || "N/A"}
                </p>

                {/* Items */}
                <div className="mt-3">
                  <h3 className="text-lg font-medium text-gray-800">Items:</h3>
                  {email.items.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-700">
                      {email.items.map((item, i) => (
                        <li key={i}>
                          {item.name} — ₹{item.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">No items found</p>
                  )}
                </div>

                {/* Total */}
                <div className="mt-4 border-t pt-2">
                  <p className="text-lg font-semibold text-green-700">
                    Total: ₹{email.totalAmount?.toFixed(2) || "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
  );
}
