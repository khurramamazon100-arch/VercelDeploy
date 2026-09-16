import React from "react";
import { Alert } from "react-bootstrap";

export const Dialouge = ({ show, text, onClose }) => {

    if (!show) return null;
    
    return (
        <div className="dialog-overlay">
                <button onClick={onClose}>

                    cancel
                </button>
            <div className="dialog-box">
                <textarea>{text}</textarea>
            </div>
        </div>

    );

};


