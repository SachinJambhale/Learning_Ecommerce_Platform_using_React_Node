import * as React from "react";
import Helmet from "react-helmet";
interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <>
      <Helmet>
        <title>Home page of Topper skills Estore</title>
      </Helmet>
      <h2>Home Component</h2>
    </>
  );
};

export default Home;
