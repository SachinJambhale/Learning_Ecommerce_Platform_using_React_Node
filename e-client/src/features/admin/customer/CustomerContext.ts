import React from "react";

interface ContextProps {
  operation: string;
}

const CustomerContext = React.createContext<ContextProps>({
  operation: "add",
});

export default CustomerContext;
