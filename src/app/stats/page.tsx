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

import type UserStats from "@/types/UserStats";

function Stats() {
  const stats: UserStats = {
    wholeHistory: {
      goodAnswers: 100,
      badAnswers: 20,
      mostAccurateEmotions: ["contempt", "happiness"],
      leastAccurateEmotions: ["disgust", "sadness"],
    },
    lastTenGames: {
      goodAnswers: 10,
      badAnswers: 2,
      mostAccurateEmotions: ["contempt", "happiness"],
      leastAccurateEmotions: ["disgust", "sadness"],
    },
  };

  return (
    <div className="flex gap-12">
      <Table>
        <TableCaption>Ostatnie 10 gier</TableCaption>
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
              )}
              %
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Dobre odpowiedzi:</TableCell>
            <TableCell className="">{stats.lastTenGames.goodAnswers}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Złe odpowiedzi:</TableCell>
            <TableCell className="">{stats.lastTenGames.badAnswers}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              Największa skuteczność:
            </TableCell>
            <TableCell className="">
              {stats.lastTenGames.mostAccurateEmotions.map(
                (emotion) => `${emotionToText(emotion)} `
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              Najmniejsza skuteczność:
            </TableCell>
            <TableCell className="">
              {stats.lastTenGames.leastAccurateEmotions.map(
                (emotion) => `${emotionToText(emotion)} `
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableCaption>Cała historia</TableCaption>
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
                (stats.wholeHistory.goodAnswers * 100) /
                  (stats.wholeHistory.goodAnswers +
                    stats.wholeHistory.badAnswers)
              )}
              %
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Dobre odpowiedzi:</TableCell>
            <TableCell className="">{stats.wholeHistory.goodAnswers}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Złe odpowiedzi:</TableCell>
            <TableCell className="">{stats.wholeHistory.badAnswers}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              Największa skuteczność:
            </TableCell>
            <TableCell className="">
              {stats.wholeHistory.mostAccurateEmotions.map(
                (emotion) => `${emotionToText(emotion)} `
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              Najmniejsza skuteczność:
            </TableCell>
            <TableCell className="">
              {stats.wholeHistory.leastAccurateEmotions.map(
                (emotion) => `${emotionToText(emotion)} `
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default Stats;
