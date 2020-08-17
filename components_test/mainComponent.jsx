import React from "react";
import ComponentUsedMixed from "mixed/componentUsed";
import ComponentUsed from './componentImported'

class Main extends React.Component {
  render() {
    return <> <ComponentUsed>Hello World</ComponentUsed><ComponentUsedMixed /> </>;
  }
}

export default Main;
