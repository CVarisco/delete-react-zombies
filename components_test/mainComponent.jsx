import React from "react";
import ComponentUsed from "./ComponentUsed";
import ComponentImported from "./mixed/ComponentImported";

class Main extends React.Component {
  render() {
    return <ComponentUsed>Hello World<ComponentImported /></ComponentUsed>;
  }
}

export default Main;
