import { render, RenderOptions } from "@testing-library/react";
import { RootStoreProvider } from "../context/stores.context";

export function TestProviderMock({ children }: { children: React.ReactNode }) {
  return <RootStoreProvider>{children}</RootStoreProvider>;
}

export function customRender(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: TestProviderMock, ...options });
}
