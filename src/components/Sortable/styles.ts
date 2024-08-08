import styled from "styled-components";

export const ContainerItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border: 1px solid #ccc;
  margin-bottom: 4px;
  background-color: #f9f9f9;

  & svg {
    cursor: pointer;
    color: #444;
  }
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 8px;
`;
