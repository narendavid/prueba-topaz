import { useEffect, useState } from "react";
import { getTransfers } from "../services/transfer.service";
import { Transfer } from "../types/transfer";

export const useTransfers = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [filtered, setFiltered] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    min: "",
    max: "",
    date: "",
  });

  const fetchTransfers = async () => {
    try {
      setLoading(true);
      const data = await getTransfers();
      setTransfers(data.transfers);
      setFiltered(data.transfers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...transfers];

    if (filters.min) {
      result = result.filter((t) => t.value >= Number(filters.min));
    }

    if (filters.max) {
      result = result.filter((t) => t.value <= Number(filters.max));
    }

    if (filters.date) {
      result = result.filter((t) => t.date.toString().startsWith(filters.date));
    }

    setFiltered(result);
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  return {
    transfers: filtered,
    loading,
    filters,
    setFilters,
  };
};
