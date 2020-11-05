import styled from "styled-components";

export const GridWrapper = styled.div`
  &.container {
    display: grid;
    margin: 0 auto;
    width: 90%;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-template-rows: repeat(2, minmax(300px, 1fr));
    grid-auto-rows: minmax(300px, 1fr);
    grid-gap: 20px;
  }
`;

export const GridItem = styled.div`
  &.item {
    border-radius: 20px;
    background: #333;
    border-radius: 15px;
    display: grid;
    grid-template-rows: 1fr 2fr 4fr 1fr;
    grid-row-gap: 1.1px;
    &:hover {
      & > div.top > * {
        &:nth-child(2) {
          display: block;
        }
      }
    }

    & > div {
      color: white;
      text-align: center;
      letter-spacing: 1px;
      font-family: sans-serif;
      padding: 5px 10px;
      &.top,
      &.bottom {
        display: grid;
        grid-gap: 5px;
      }
    }
  }
`;

export const GridHeader = styled.div`
  text-align: center;
  margin: 5px 0;
  border-bottom: 0.5px solid #999;
  & > * {
    justify-self: center;
    font-size: 22px;
    cursor: pointer;
    &:nth-child(2) {
      display: none;
    }
  }
  border-radius: 10px 10px 0 0;
  grid-template-columns: 50px 50px;
  justify-content: space-between;
`;

export const GridText = styled.div``;

export const GridBody = styled.div`
  position: relative;
  /* box-sizing:border-box; */
  & img {
    position: absolute;
    border-radius: 5%;
    padding: 0 2.5%;
    left: 0;
    top: 0;
    width: 95%;
    height: 100%;
  }
`;

export const GridFooter = styled.div`
  border-radius: 0 0 10px 10px;
  grid-template-columns: 1fr auto 1fr;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  & > span > svg {
    /* color:black; */
    font-size: 20px;
    margin-right: 10px;
  }
  & .separator {
    align-self: stretch;
    background: white;
    width: 1px;
  }
`;
