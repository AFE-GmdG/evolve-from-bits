import { HiddenNeuron, InputNeuron, isHiddenNeuron, isInputNeuron, isOutputNeuron, Neuron, OutputNeuron } from "../types/neuron";

export default class Network {
  readonly neurons: Neuron[];

  public get inputNeurons(): InputNeuron[] {
    return this.neurons.filter<InputNeuron>(isInputNeuron);
  }

  public get hiddenNeurons(): HiddenNeuron[] {
    return this.neurons.filter<HiddenNeuron>(isHiddenNeuron);
  }

  public get outputNeurons(): OutputNeuron[] {
    return this.neurons.filter<OutputNeuron>(isOutputNeuron);
  }

  constructor(neurons: Neuron[]) {
    this.neurons = neurons;
  }

  public calculate(): void {
  }
}
