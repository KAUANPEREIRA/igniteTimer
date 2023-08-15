import differenceInSeconds from "date-fns/differenceInSeconds";
import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  addNewCycleAction,
  interruptNewCycleAction,
  markCurrenteCycleAsFinishedAction,
} from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
  amountSecondsPassed: number;
  setsecondsPassed: (n: number) => void;
  CreateNewCicle: (data: CreateCycleData) => void;
  InterruptNewCycle: () => void;
}

interface CyclesContextProviderPros {
  children: ReactNode;
}
export const CyclesContext = createContext({} as CycleContextType);

export function CyclesContextProvider({ children }: CyclesContextProviderPros) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJson = localStorage.getItem(
        "@iginiteTime:cycles-state"
      );

      if (storedStateAsJson) {
        return JSON.parse(storedStateAsJson);
      }

      return {
        cycles: [],
        activeCycleId: null,
      };
    }
  );

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle?.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle?.startDate));
    }
    return 0;
  });

  function setsecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrenteCycleAsFinishedAction());
  }

  function CreateNewCicle(data: CreateCycleData) {
    let id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));

    setAmountSecondsPassed(0);
  }

  function InterruptNewCycle() {
    dispatch(interruptNewCycleAction());
  }

  useEffect(() => {
    const stateJson = JSON.stringify(cyclesState);
    localStorage.setItem("@iginiteTime:cycles-state", stateJson);
  }, [cyclesState]);
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setsecondsPassed,
        CreateNewCicle,
        InterruptNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
