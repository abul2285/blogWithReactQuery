import styled from "styled-components";

export const FormWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  display: grid;
  place-items: center;
  z-index: 100;
  background: #ccc;
`;
export const StyledForm = styled.form`
  padding: 50px;
  display: grid;
  grid-gap: 15px;
  background: #ddd;
  border-radius: 10px;
`;
export const StyledInput = styled.input`
  padding: 12px;
  border: none;
  background: white;
  outline: none;
  min-width: 300px;
  max-width: 500px;
`;
export const Submit = styled.button`
  padding: 12px;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid #999;
    cursor: pointer;
  }
`;
