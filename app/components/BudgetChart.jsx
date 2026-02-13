"use client";

import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";

export default function BudgetChart({ data, total }) {
  const safe = Array.isArray(data) ? data : [];

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={safe}
            dataKey="value"
            nameKey="name"
            innerRadius="70%"
            outerRadius="100%"
          >
            {safe.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.theme || "#999999"} />
            ))}
          </Pie>

          <text
            x="50%"
            y="48%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-grey-900 text-2xl font-bold"
          >
            ${total}
          </text>

          <text
            x="50%"
            y="58%"
            textAnchor="middle"
            className="fill-grey-500 text-xs"
          >
            of ${total}
          </text>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
