import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryContainter, HistoryList, Status } from "./style";

export function History() {
  const { cycles } = useContext(CyclesContext);
  return (
    <HistoryContainter>
      <h1>Meu historico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle?.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle?.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle?.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle?.finishDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}
                    {cycle?.interruptDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}

                    {!cycle?.interruptDate && !cycle?.finishDate && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainter>
  );
}
