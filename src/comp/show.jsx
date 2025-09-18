import React from "react";

export default function InvoicePage({ data }) {
  if (!data) {
    return <div style={{ textAlign: "center", marginTop: "2rem" }}>No invoice data available</div>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h2>{data.company} Order Invoice</h2>
      <p><strong>Order ID:</strong> {data.orderId}</p>
      <p><strong>Date:</strong> {data.orderDate}</p>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px" }}>
        <thead>
          <tr style={{ background: "#f4f4f4" }}>
            <th style={thStyle}>Item</th>
            <th style={thStyle}>Qty</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index}>
              <td style={tdStyle}>{item.name}</td>
              <td style={tdStyle}>{item.quantity}</td>
              <td style={tdStyle}>₹{item.price}</td>
              <td style={tdStyle}>₹{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ textAlign: "right", marginTop: "20px" }}>
        Grand Total: ₹{data.totalAmount}
      </h3>
    </div>
  );
}

const thStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "left"
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "center"
};
