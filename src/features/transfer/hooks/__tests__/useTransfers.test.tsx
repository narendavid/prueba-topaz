import { act, renderHook, waitFor } from "@testing-library/react-native";
import * as transferService from "../../services/transfer.service";
import { useTransfers } from "../useTransfers";

jest.mock("../../services/transfer.service", () => ({
  getTransfers: jest.fn(),
}));

const mockTransfers = [
  { value: 100, date: "2026-03-20" },
  { value: 200, date: "2026-03-21" },
  { value: 300, date: "2026-03-22" },
];

describe("useTransfers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch transfers on mount", async () => {
    (transferService.getTransfers as jest.Mock).mockResolvedValue({
      transfers: mockTransfers,
    });

    const { result } = renderHook(() => useTransfers());

    await waitFor(() => {
      expect(result.current.transfers.length).toBe(3);
    });

    expect(transferService.getTransfers).toHaveBeenCalled();
  });

  it("should handle loading state correctly", async () => {
    (transferService.getTransfers as jest.Mock).mockResolvedValue({
      transfers: mockTransfers,
    });

    const { result } = renderHook(() => useTransfers());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it("should filter by min value", async () => {
    (transferService.getTransfers as jest.Mock).mockResolvedValue({
      transfers: mockTransfers,
    });

    const { result } = renderHook(() => useTransfers());

    await waitFor(() => {
      expect(result.current.transfers.length).toBe(3);
    });

    act(() => {
      result.current.setFilters({
        min: "200",
        max: "",
        date: "",
      });
    });

    expect(result.current.transfers).toEqual([
      { value: 200, date: "2026-03-21" },
      { value: 300, date: "2026-03-22" },
    ]);
  });

  it("should filter by max value", async () => {
    (transferService.getTransfers as jest.Mock).mockResolvedValue({
      transfers: mockTransfers,
    });

    const { result } = renderHook(() => useTransfers());

    await waitFor(() => {
      expect(result.current.transfers.length).toBe(3);
    });

    act(() => {
      result.current.setFilters({
        min: "",
        max: "200",
        date: "",
      });
    });

    expect(result.current.transfers).toEqual([
      { value: 100, date: "2026-03-20" },
      { value: 200, date: "2026-03-21" },
    ]);
  });

  it("should filter by date", async () => {
    (transferService.getTransfers as jest.Mock).mockResolvedValue({
      transfers: mockTransfers,
    });

    const { result } = renderHook(() => useTransfers());

    await waitFor(() => {
      expect(result.current.transfers.length).toBe(3);
    });

    act(() => {
      result.current.setFilters({
        min: "",
        max: "",
        date: "2026-03-21",
      });
    });

    expect(result.current.transfers).toEqual([
      { value: 200, date: "2026-03-21" },
    ]);
  });
});
