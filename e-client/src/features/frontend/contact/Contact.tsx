import * as React from "react";
import Helmet from "react-helmet";

interface IContactProps {}

const Contact: React.FunctionComponent<IContactProps> = (props) => {
  return (
    <>
      <Helmet>
        <title>Contact Page of Estore</title>
      </Helmet>
      <h2>Contact Component</h2>
    </>
  );
};

export default Contact;
