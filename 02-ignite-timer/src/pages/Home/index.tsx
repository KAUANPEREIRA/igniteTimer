import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalm, Play } from "phosphor-react";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";
import { CyclesContext } from "../../contexts/CyclesContext";
import { CountDown } from "./CountDown";
import { NewCycleForm } from "./newCycleForm";
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles";

interface FormCycleProps {
  task: string;
  minutesAmount: number;
}

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(1, "O ciclo prescisa ser de no minimo 5 minutos")
    .max(60, "O ciclo prescisa ser de no maximo 60 minutos"),
});

export function Home() {
  const { CreateNewCicle, InterruptNewCycle, activeCycle } =
    useContext(CyclesContext);
  const newCycleForm = useForm<FormCycleProps>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { reset, handleSubmit, watch } = newCycleForm;
  //acompanhar campo task em tempo real
  const taskTimeReal = watch("task");

  function handleCreateNewCycle(data: FormCycleProps) {
    CreateNewCicle(data);
    reset();
  }
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={InterruptNewCycle}>
            <HandPalm />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={!taskTimeReal} type="submit">
            <Play />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
