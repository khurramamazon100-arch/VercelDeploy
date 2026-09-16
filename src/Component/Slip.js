import React from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const Slip = () => {
  const nList = JSON.parse(localStorage.getItem("nList")) || [];
  const { pathname } = useLocation();
  const isSlipPage = pathname.includes("Slip");

  if (!isSlipPage) return null;

  const now = new Date();

  return (
    <>
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 text-center">
            <h2>Pre Payment Slip</h2>
            <h3>164</h3>

            <div className="row my-2">
              <div className="col-6 text-start">Invoice No:</div>
              <div className="col-6 text-end">2541212</div>
            </div>

            <div className="row">
              <div className="col-6 text-start">Restaurant:</div>
              <div className="col-6 text-end">KababJees</div>
            </div>

            <div className="row">
              <div className="col-6 text-start">Cashier/Cash:</div>
              <div className="col-6 text-end">DineIn</div>
            </div>

            <div className="row">
              <div className="col-6 text-start">Date:</div>
              <div className="col-6 text-end">{now.toLocaleDateString()}</div>
            </div>

            <div className="row mb-3">
              <div className="col-6 text-start">Time:</div>
              <div className="col-6 text-end">{now.toLocaleTimeString()}</div>
            </div>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>

                {nList && nList.length > 0 ? (
                  <>
                    {nList.map((entry, index) => (
                      <tr key={index}>
                        <td>{entry._Item}</td>
                        <td>{entry.Qty}</td>
                        <td>{entry.Price}</td>
                        <td>{entry.Total}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={3} className="text-end fw-bold">
                        Sub Total
                      </td>
                      <td className="fw-bold">
                        {
                          nList.reduce(
                            (sum, item) => sum + item.Qty * item.Price,
                            0
                          )
                        }
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No items
                    </td>
                  </tr>

                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
