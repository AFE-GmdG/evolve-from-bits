/* eslint-disable no-underscore-dangle */

import React from "react";

import Module from "../evolve";

export type EvolveLibContextType = {
  calculateNetwork: () => number;
};

const EvolveLibContext = React.createContext<EvolveLibContextType>({
  calculateNetwork: () => 0,
});

export const EvolveLibContextProvider: React.FC = ({
  children,
}) => {
  const didCancel = React.useRef(false);
  React.useEffect(() => () => { didCancel.current = true; }, []);

  const [calculateNetwork, setCalculateNetwork] = React.useState<() => number>(() => () => 0);

  React.useEffect(
    () => {
      const getModule = async () => {
        const module = await Module();
        if (!didCancel.current) {
          setCalculateNetwork(() => module._calculateNetwork);
        }
      };

      getModule();
    },
    [],
  );

  return (
    <EvolveLibContext.Provider
      value={{
        calculateNetwork,
      }}
    >
      {children}
    </EvolveLibContext.Provider>
  );
};

export default EvolveLibContext;
