"use client";

import React from "react";
import Sidebar from "./sidebar";
import { useChat } from "./chat-provider";

export default function SidebarGlobal() {
    const { isAnalyzed, handleNewChat, selectedProduct, setSelectedProduct, history, handleSelectHistory } = useChat();

    return (
        <Sidebar
            isAnalyzed={isAnalyzed}
            onNewChat={handleNewChat}
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
            history={history}
            onSelectHistory={handleSelectHistory}
        />
    );
}
