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
        </PersonalInof>
        <OtherInfo>
          <Info>
            <h3>Personal Information</h3>
            <p>
              <b>Name</b> : {info.name}
            </p>
            <p>
              <b>Email</b> : {info.email}
            </p>
            <p>
              <b>Phone</b> : {info.phone}
            </p>
            <p>
              <b>Address</b> :{info.address.street},{info.address.city},
              {info.address.zipcode}{" "}
            </p>
            <p>
              <b>Company</b>:{info.company.name}{" "}
            </p>
          </Info>
        </OtherInfo>
      </UserInfo>
    </UserWrapper>
  );
}
