import React from "react";
import UserWrapper, {
  Avatar,
  Info,
  OtherInfo,
  PersonalInof,
  UserInfo,
} from "./user.style";
export default function User({ info }) {
  return (
    <UserWrapper>
      <UserInfo>
        <PersonalInof>
          <Avatar>
            <img src={`https://i.pravatar.cc/100?u=${info.id}`} alt="" />
          </Avatar>
          <Info>
            <h3>Personal Information</h3>
            <p>Name : {info.name}</p>
            <p>Email : {info.email}</p>
            <p>Phone : {info.phone}</p>
          </Info>
        </PersonalInof>
        <OtherInfo>
          <Info>
            <h3>Address</h3>
            <p>City : {info.address.city}</p>
            <p>Street : {info.address.street}</p>
            <p>Zipcode: {info.address.zipcode}</p>
          </Info>
          <Info>
            <h3>Company</h3>
            <p>Name : {info.company.name}</p>
            <p>CatchPharas : {info.company.catchPhrase}</p>
            <p>BS : {info.company.bs}</p>
          </Info>
        </OtherInfo>
      </UserInfo>
    </UserWrapper>
  );
}
