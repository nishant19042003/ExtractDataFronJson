import React, {  useEffect, useState } from "react";
import axios from "axios";
import { generateColors,process } from "../Methods/colorGeneratore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { category, catfields, monthslist } from "../categories/categories";

function Categories() {
  const [emails, setEmails] = useState([]);
  const [fields, setFields] = useState(catfields);
  const [months, setMonths] = useState(monthslist);
  
  const handleProcess = async() => {
    console.log("Processing emails...");
    const result = await process(emails,fields,category,months);
    setFields(result.updatedFields);
    setMonths(result.monthslist);
    console.log("Processed fields:", result);
  }
   

  useEffect(() => {
    const fetchEmails = async () => {
      console.log("Fetching emails...");
      const response = await axios.get(
        "http://localhost:3000/email/emails",
        {  withCredentials: true }
      );
      console.log("Fetched emails:", response.data);
      setEmails(response.data);
    };
    fetchEmails();
  }, []);

  // colors for charts
  const COLORS = generateColors(fields.length);

  if(emails.length > 0) return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 p-10">
      <h1 className="text-center text-4xl font-extrabold text-amber-800 mb-12">
        Categories Dashboard
      </h1>
      {/* List + Process Button */}
      <div className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
        <button
          onClick={handleProcess}
          className="mb-6 px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition"
        >
          Process Emails
        </button>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">
            Category Amounts
          </h2>
        </div>

        <ul className="divide-y divide-gray-200">
          {fields.map((field, index) => {
            if (field.amount > 0) {
              return (
                <li
                  key={index}
                  className="flex justify-between py-3 text-lg font-medium"
                >
                  <span className="text-gray-700">{field.name}</span>
              <span
                className="font-semibold"
                style={{ color: COLORS[index % COLORS.length] }}
              >
                ₹{field.amount.toFixed(2)}
              </span>
            </li>
          );
        }
      })}
        </ul>
      </div>
     <div className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
        {/* Bar Chart Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Spending by Month
          </h2>
          <div className="w-full h-80"> {/* control height with Tailwind */}
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={months}>
                <CartesianGrid stroke="#eee" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                  {months.map((entry, index) => (
                    <Cell
                      key={`bar-cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
        {/* Pie Chart Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Category Distribution
          </h2>
          <PieChart width={250} height={250}>
            <Pie
              data={fields}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="amount"
            >
              {fields.map((entry, index) => (
                <Cell
                  key={`pie-cell-${index}`}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>
          </PieChart>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            {fields.map((field, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                <span className="text-gray-700 text-sm font-medium">
                  {field.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
  else {
    return <div className="text-center text-gray-500 justify-center bg-red-500">
      <h2 className="text-2xl font-bold">loading...Emails</h2>
    </div>;
  }
}

export default Categories;
