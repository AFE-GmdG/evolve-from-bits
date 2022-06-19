/* eslint-disable no-bitwise */

export type ActivationFunction = {
  name: string;
  func: (x: number) => number;
};

const identityAF: ActivationFunction = {
  name: "Identity",
  func: (x: number) => x,
};

const binaryStepAF: ActivationFunction = {
  name: "Binary Step",
  func: (x: number) => (x > 0 ? 1 : 0),
};

const sigmoidAF: ActivationFunction = {
  name: "Sigmoid",
  func: (x: number) => 1 / (1 + Math.exp(-x)),
};

const tanhAF: ActivationFunction = {
  name: "Hyperbolic Tangent",
  func: (x: number) => Math.tanh(x),
};

const smoothStepAF: ActivationFunction = {
  name: "Smooth Step",
  func: (x: number) => x * x * (3 - 2 * x),
};

const gaussianAF: ActivationFunction = {
  name: "Gaussian",
  func: (x: number) => Math.exp(-x * x),
};

const sineAF: ActivationFunction = {
  name: "Sine",
  func: (x: number) => Math.sin(x),
};

const softplusAF: ActivationFunction = {
  name: "Softplus",
  func: (x: number) => Math.log(1 + Math.exp(x)),
};

const activationFunctions: ActivationFunction[] = [
  identityAF,
  binaryStepAF,
  sigmoidAF,
  tanhAF,
  smoothStepAF,
  gaussianAF,
  sineAF,
  softplusAF,
];

export const getActivationFunction = (index: number): ActivationFunction => {
  const realIndex = (index | 0) % activationFunctions.length;
  return activationFunctions[realIndex];
};
