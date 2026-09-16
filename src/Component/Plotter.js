import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

export default function Plotter() {
    
  const [expression, setExpression] = useState("x * 2 + 17");
  const [plotType, setPlotType] = useState("lines");
 
  const generatePlotData = () => {
    const xValues = [];
    const yValues = [];

    for (let x = 0; x <= 10; x++) {
        debugger
      xValues.push(x);

      try {
        // Evaluate the user’s expression safely
        const y = Function("x", `return ${expression}`)(x);
        yValues.push(y);
      } catch {
        yValues.push(null);
      }
    }

    return [
      {
        x: xValues,
        y: yValues,
        mode: plotType === "scatter" ? "markers" : "lines",
        type: "scatter"
      }
    ];
  };

  return (
    <>
    
    <div style={{ maxWidth: 700 }}>
      <h1>Using Plotly.js</h1>

      <p>Enter Equation:</p>
      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setPlotType("scatter")}>Scatter</button>
        <button onClick={() => setPlotType("lines")} style={{ marginLeft: 10 }}>
          Draw Line
        </button>
      </div>

      <Plot
        data={generatePlotData()}
        layout={{
          title: `y = ${expression}`,
          width: 700,
        }}
      />
    </div>
    
    </>
  );
}
