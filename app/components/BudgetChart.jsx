"use client";

import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";

export default function BudgetChart({ data }) {
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
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
