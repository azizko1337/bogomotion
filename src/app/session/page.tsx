"use client";

import { useState } from "react";

import Question from "@/components/Question";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import calcRecognizedEmotions from "@/lib/calcRecognizedEmotions";
import calcFalseRecognizedEmotions from "@/lib/calcFalseRecognizedEmotions";
import { emotionToText } from "@/lib/utils";

import type Resource from "@/types/Resource";
import type FrontendResult from "@/types/FrontendResult";
import type Emotion from "@/types/Emotion";
import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import calcNonRecognizedEmotions from "@/lib/calcNonRecognizedEmotions";

import SessionSummary from "@/components/SessionSummary";

function Session() {
  const [results, setResults] = useState<FrontendResult[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [currentResource, setCurrentResource] = useState<number>(0);
  const [answer, setAnswer] = useState<Emotion[]>([]);
  const [showResult, setShowResult] = useState<boolean>(true);
  const [isEnded, setIsEnded] = useState<boolean>(false);

  const [currentResultStart, setCurrentResultStart] = useState<Date>(
    new Date()
  );

  useEffect(() => {
    fetch("/api/resources")
      .then((res) => res.json())
      .then((data) => {
        setResources(data.resources);
      });
  }, []);

  if (resources.length === 0) {
    return <Loading />;
  }

  async function nextQuestion() {
    if (showResult) {
      // calc result
      const correctAnswer = resources[currentResource].resourceEmotions.split(
        " "
      ) as Emotion[];

      const result: FrontendResult = { startedAt: currentResultStart };
      result.endedAt = new Date();
      result.resourceId = resources[currentResource].resourceId;
      result.recognizedEmotions = calcRecognizedEmotions(answer, correctAnswer);
      result.falseRecognizedEmotions = calcFalseRecognizedEmotions(
        answer,
        correctAnswer
      );
      result.nonRecognizedEmotions = calcNonRecognizedEmotions(
        answer,
        correctAnswer
      );

      console.log(result);

      setResults([...results, result]);
    } else {
      if (currentResource + 1 === resources.length) {
        setIsEnded(true);
        const res = await fetch("/api/session", {
          method: "POST",
          body: JSON.stringify({ results }),
        });
        const data = await res.json();
      }
      // new question
      setCurrentResource(currentResource + 1);
      setCurrentResultStart(new Date());
    }
    setShowResult(!showResult);
  }

  if (isEnded) {
    return <SessionSummary results={results} />;
  }

  return (
    <>
      <div className="w-full flex justify-start items-center gap-12 font-bold">
        <Question
          setAnswer={setAnswer}
          currentResource={currentResource}
          resourcesCount={resources.length}
          nextQuestion={nextQuestion}
          resource={resources[currentResource]}
          showResult={showResult}
        />
        <Table
          className={cn(
            "w-full max-w-5/12 backdrop-blur-sm bg-white bg-opacity-70"
          )}
        >
          {!showResult && results[results.length - 1].recognizedEmotions && (
            <>
              <TableCaption>WYNIK</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className={cn("font-black")}>Typ</TableHead>
                  <TableHead className={cn("font-black")}>Emocje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Poprawnie rozpoznane:</TableCell>

                  <TableCell>
                    <ul className="list-disc">
                      {results[results.length - 1].recognizedEmotions.map(
                        (emotion) => (
                          <li key={emotion}>
                            {emotionToText(emotion as Emotion)}
                          </li>
                        )
                      ) ?? []}
                    </ul>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fałszywie rozpoznane:</TableCell>

                  <TableCell>
                    <ul className="list-disc">
                      {results[results.length - 1].falseRecognizedEmotions.map(
                        (emotion) => (
                          <li key={emotion}>
                            {emotionToText(emotion as Emotion)}
                          </li>
                        )
                      )}
                    </ul>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Nierozponane:</TableCell>
                  <TableCell>
                    <ul className="list-disc">
                      {results[results.length - 1].nonRecognizedEmotions.map(
                        (emotion) => (
                          <li key={emotion}>
                            {emotionToText(emotion as Emotion)}
                          </li>
                        )
                      )}
                    </ul>
                  </TableCell>
                </TableRow>
              </TableBody>
            </>
          )}
        </Table>
      </div>
    </>
  );
}

export default Session;
