
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const Navbar = ({ menu = [] }) => {
    const [openMenu, setOpenMenu] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleMenu = (id) => {
        setOpenMenu((prev) => (prev === id ? null : id));
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    // Safety
    const menuList = Array.isArray(menu) ? menu : [];

    const parentMenus = menuList.filter(
        (item) => item.parentId === null
    );

    return (
        <>
            {/* Mobile Navbar */}
            <div className="d-md-none bg-light border-bottom p-2">
                <button
                    className="btn btn-outline-dark"
                    type="button"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    ☰ Menu
                </button>
            </div>

            {/* Overlay for Mobile */}
            {sidebarOpen && (
                <div
                    className="sidebar-overlay d-md-none"
                    onClick={closeSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <nav
                className={`bg-light border-end sidebar p-3 ${sidebarOpen ? "sidebar-open" : ""
                    }`}
            >
                <ul className="nav flex-column">

                    {parentMenus.map((parent) => {

                        const childMenus = menuList.filter(
                            (child) => child.parentId === parent.id
                        );

                        return (
                            <li
                                className="nav-item"
                                key={parent.id}
                            >

                                {/* Parent Menu */}
                                <div
                                    className="nav-link sidebar-parent"
                                    onClick={() => toggleMenu(parent.id)}
                                >
                                    <span>{parent.name}</span>

                                    {childMenus.length > 0 && (
                                        <span className="ms-auto">
                                            {openMenu === parent.id
                                                ? "▾"
                                                : "▸"}
                                        </span>
                                    )}
                                </div>

                                {/* Child Menu */}
                                {openMenu === parent.id &&
                                    childMenus.length > 0 && (
                                        <ul className="nav flex-column ms-2">

                                            {childMenus.map((child) => (
                                                <li
                                                    className="nav-item"
                                                    key={child.id}
                                                >
                                                    <NavLink
                                                        to={child.link}
                                                        className={({ isActive }) =>
                                                            `nav-link child-link ${isActive
                                                                ? "active"
                                                                : ""
                                                            }`
                                                        }
                                                        onClick={closeSidebar}
                                                    >
                                                        {child.name}
                                                    </NavLink>
                                                </li>
                                            ))}

                                        </ul>
                                    )}

                            </li>
                        );
                    })}

                </ul>
            </nav>

            {/* CSS */}
            <style>{`
                .sidebar {
                    width: 250px;
                    min-height: 100vh;
                    transition: transform 0.3s ease;
                    z-index: 1050;
                }

                .sidebar-parent {
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    border-radius: 6px;
                    margin-bottom: 2px;
                }

                .sidebar-parent:hover {
                    background-color: #e9ecef;
                }

                .child-link {
                    border-radius: 6px;
                    padding-left: 20px;
                }

                .child-link:hover {
                    background-color: #e9ecef;
                }

                .child-link.active {
                    background-color: #0d6efd;
                    color: white !important;
                }

                /* Mobile */
                @media (max-width: 767.98px) {

                    .sidebar {
                        position: fixed;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        width: 280px;
                        max-width: 85vw;
                        min-height: 100vh;
                        overflow-y: auto;
                        transform: translateX(-100%);
                        box-shadow: 3px 0 10px rgba(0, 0, 0, 0.15);
                    }

                    .sidebar.sidebar-open {
                        transform: translateX(0);
                    }

                    .sidebar-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.4);
                        z-index: 1040;
                    }
                }
            `}</style>
        </>
    );
};

