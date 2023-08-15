import { useContext } from "react";
import { useFormContext } from "react-hook-form";

import { CyclesContext } from "../../../contexts/CyclesContext";
import { FormContainer, MinutesAmountInput, TaskInput } from "./style";

export const NewCycleForm = () => {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em </label>
      <TaskInput
        id="task"
        disabled={!!activeCycle}
        list="task-suggestions"
        placeholder="De um nome para seu projeto"
        {...register("task")}
      />
      <datalist id="task-suggestions">
        <option value="projeto 1" />
        <option value="projeto 2" />
        <option value="projeto 3" />
      </datalist>

      <label htmlFor="minutesAmount">Vou trabalhar em </label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        disabled={!!activeCycle}
        placeholder="00"
        step={5}
        min={5}
        max={60}
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <span>Minutos</span>
    </FormContainer>
  );
};
