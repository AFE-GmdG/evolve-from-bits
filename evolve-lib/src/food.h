#include "./point.h"

class Food
{
  public:
    Food(int id);
    ~Food() = default;

  public:
    int getId() const;
    float getValue() const;
    Point getLocation() const;
    float getFood(float amount);

  private:
    int id;
    Point location;
    float value;
};
