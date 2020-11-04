import styled from "styled-components";

export default styled.nav`
  width: 100vw;
  height: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  background: #bb0;
  margin-bottom: 25px;
`;

export const UserAvatar = styled.span`
  display: flex;
  background: darkgreen;
  align-items: center;
  color: white;
  border-radius: 50%;
  justify-self: center;
  text-align: center;
  width: 45px;
`;
export const AddIcon = styled.div`
  //icon
  background: blue;
`;
export const LinkItems = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const InputItems = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
  font-size: 2rem;
`;
