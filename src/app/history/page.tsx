"use client";

import Loading from "@/components/Loading";
import { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState<[HistoryObj] | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setHistory(data.stats));
  }, []);

  if (!history) return <Loading />;

  return <>{}</>;
}

export default History;
