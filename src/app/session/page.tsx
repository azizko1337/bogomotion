"use client";

import { useState } from "react";

import Question from "@/components/Question";
import Loading from "@/components/Loading";

import type Resource from "@/types/Resource";

function Session() {
  const [currentResource, setCurrentResource] = useState<Resource | null>(null);

  const resources: Resource[] = [
    {
      resourceId: 1,
      type: "image",
      age: "child",
      imageCategory: "happy",
      resourceEmotions: [],
    },
  ];

  if (currentResource === null) {
    return <Loading />;
  }

  return (
    <div>
      <Question resource={resources[0]} />
    </div>
  );
}

export default Session;
