import styled from "styled-components";

//sintaxe utilizando styled components com cor criado no thema da aplicação.

export const LayoutContainer = styled.div`
  max-width: 74rem;
  height: calc(100vh);
  margin: 5rem auto;
  padding: 2.5rem;

  background: ${(props) => props.theme["gray-800"]};
  display: flex;
  flex-direction: column;
`;
