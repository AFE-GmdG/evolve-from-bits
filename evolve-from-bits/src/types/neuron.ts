export enum NeuronType {
  Input,
  Hidden,
  Output,
}

export type WeightAndNeuronIndex = {
  weight: number;
  neuronIndex: number;
};

export type InputNeuron = {
  name: string;
  type: NeuronType.Input;
  value: () => number;
};

export type HiddenNeuron = {
  type: NeuronType.Hidden;
  afIndex: number;
  bias: number;
  inputNeurons: WeightAndNeuronIndex[];
};

export type OutputNeuron = {
  name: string;
  type: NeuronType.Output;
  afIndex: number;
  bias: number;
  inputNeurons: WeightAndNeuronIndex[];
};

export type Neuron = InputNeuron | HiddenNeuron | OutputNeuron;

export function isInputNeuron(neuron: Neuron): neuron is InputNeuron {
  return neuron.type === NeuronType.Input;
}

export function isHiddenNeuron(neuron: Neuron): neuron is HiddenNeuron {
  return neuron.type === NeuronType.Hidden;
}

export function isOutputNeuron(neuron: Neuron): neuron is OutputNeuron {
  return neuron.type === NeuronType.Output;
}
