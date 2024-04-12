"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { emotionToText } from "@/lib/utils";
import { useState, useEffect } from "react";

import Loading from "@/components/Loading";

import type UserStats from "@/types/UserStats";

function Stats() {
  const [stats, setStats] = useState<UserStats | null>(null);
  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data.stats));
  }, []);

  if (!stats) return <Loading />;

  return (
    <div>
      <h2 className="text-center mb-8 font-bold text-3xl">STATYSTYKI</h2>
      <div className="p-3 backdrop-blur-sm flex gap-12 font-bold bg-white bg-opacity-30 rounded-2xl">
        <Table>
          <TableCaption>Ostatnie 10 sesji</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Statystyka</TableHead>
              <TableHead className="">Wartość</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Skuteczność:</TableCell>
              <TableCell className="">
                {Math.round(
                  (stats.lastTenGames.goodAnswers * 100) /
                    (stats.lastTenGames.goodAnswers +
                      stats.lastTenGames.badAnswers)
                ) || "∝"}
                %
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Dobre odpowiedzi:</TableCell>
              <TableCell className="">
                {stats.lastTenGames.goodAnswers}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Złe odpowiedzi:</TableCell>
              <TableCell className="">
                {stats.lastTenGames.badAnswers}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Największa skuteczność:
              </TableCell>
              <TableCell className="">
                {emotionToText(stats.lastTenGames.mostAccurateEmotion)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Najmniejsza skuteczność:
              </TableCell>
              <TableCell className="">
                {emotionToText(stats.lastTenGames.leastAccurateEmotion)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Stats;
