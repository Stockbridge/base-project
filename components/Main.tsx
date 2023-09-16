import React from "react";

export interface MainProps {
  children: React.ReactNode;
}

export const Main = ({ children }: MainProps): JSX.Element => {
  return <main>{children}</main>;
};
