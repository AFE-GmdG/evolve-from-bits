#include <emscripten.h>

#include "./neuron.h"

extern "C" {

  double calculateNetwork()
  {
    Neuron neuron;
    std::vector<double> inputs = {1.0, 2.0, 3.0, 2.4, 5.4};
    neuron.compute(inputs);
    return neuron.getOutput();
  }

}
