const { default: styled } = require("styled-components");

export const UserInfo = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 350px) auto;
  grid-gap: 50px;
  padding: 15px;
  background: white;
  border-radius: 20px;
`;

export default styled.div`
  background: #eee;
  padding: 30px;
`;

export const PersonalInof = styled.div`
  display: grid;
  gird-template-rows: repeat(auto-fit, minmax(300px, 500px));
`;
export const OtherInfo = styled.div`
  display: grid;
  gird-template-rows: repeat(2, 1fr);
`;

export const Info = styled.div`
  color: #222;
  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
  }
`;

export const Avatar = styled.div`
  & > img {
    border-radius: 10%;
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;
