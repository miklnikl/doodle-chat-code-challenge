import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import type { Message } from "../features/messages/types";

const jsonResponse = (body: unknown, status = 200) =>
  ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    headers: new Headers(),
  }) as unknown as Response;

const initialMessage: Message = {
  _id: "1",
  message: "Hey team!",
  author: "Luka",
  createdAt: "2026-06-25T10:00:00.000Z",
};

const renderApp = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
};

const fetchMock = vi.fn();

describe("App flow", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("loads messages and sends a new one as the current user", async () => {
    const store: Message[] = [initialMessage];

    fetchMock.mockImplementation(async (_url: string, init?: RequestInit) => {
      if (init?.method === "POST") {
        const payload = JSON.parse(String(init.body));
        const created: Message = {
          _id: "2",
          createdAt: "2026-06-25T11:00:00.000Z",
          ...payload,
        };
        store.push(created);
        return jsonResponse(created);
      }

      return jsonResponse(store);
    });

    renderApp();

    expect(await screen.findByText("Hey team!")).toBeInTheDocument();

    const user = userEvent.setup();
    const textarea = screen.getByPlaceholderText("Message");
    await user.type(textarea, "Hello there");
    await user.click(screen.getByRole("button", { name: "Send" }));

    await waitFor(() => {
      const postCall = fetchMock.mock.calls.find(
        ([, init]) => init?.method === "POST",
      );
      expect(postCall).toBeDefined();
      expect(JSON.parse(String(postCall![1].body))).toEqual({
        message: "Hello there",
        author: "You",
      });
    });

    expect(await screen.findByText("Hello there")).toBeInTheDocument();
    expect(textarea).toHaveValue("");
  });
});
