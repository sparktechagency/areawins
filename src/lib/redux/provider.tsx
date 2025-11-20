"use client";

/**
 * Redux Provider Component
 * Wraps the app with Redux store provider
 */

import { Provider } from "react-redux";
import { store } from "./store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
