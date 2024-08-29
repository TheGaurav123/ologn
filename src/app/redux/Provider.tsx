"use client";
import { Provider as ReduxProvider } from "react-redux";
import { Store } from "./Store";

export function Provider({ children }: { children: React.ReactNode }) {
    return <ReduxProvider store={Store}>{children}</ReduxProvider>;
}
