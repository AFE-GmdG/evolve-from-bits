#include "./neuron.h"

Neuron::Neuron()
  : m_output(0.0)
{
}

void Neuron::compute(const std::vector<double> &inputs)
{
  m_output = 0.0;
  for (auto &input : inputs)
  {
    m_output += input;
  }
}

double Neuron::getOutput() const
{
  return m_output;
}
