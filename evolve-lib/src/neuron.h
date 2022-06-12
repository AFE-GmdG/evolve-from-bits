#include <vector>

class Neuron
{
  public:
    Neuron();
    virtual ~Neuron() = default;

  public:
    virtual void compute(const std::vector<double> &inputs);
    virtual double getOutput() const;

  private:
    double m_output;
};
