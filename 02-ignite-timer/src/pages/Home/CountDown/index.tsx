import { differenceInSeconds } from "date-fns";
import { useContext, useEffect } from "react";

import { CyclesContext } from "../../../contexts/CyclesContext";
import { CountDownContainer, Separator } from "./style";

export const CountDown = () => {
  const {
    amountSecondsPassed,
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    setsecondsPassed,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle?.minutesAmount * 60 : 0;

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const seccondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle?.startDate)
        );

        if (seccondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();
          setsecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setsecondsPassed(seccondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes} : ${seconds}`;
    }
  }, [seconds, minutes, activeCycle]);
  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  );
};
