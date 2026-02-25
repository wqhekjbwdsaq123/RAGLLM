"use client";

import React from "react";
import { ChatProvider } from "./chat-provider";
import SidebarGlobal from "./sidebar-global";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ChatProvider>
            <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
                {/* Global Sidebar */}
                <SidebarGlobal />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                    {children}
                </div>
            </div>
        </ChatProvider>
    );
}
