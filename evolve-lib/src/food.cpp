#include <emscripten.h>
#include <emscripten/bind.h>

#include "./food.h"

Food::Food(int id)
  : id(id)
{
  location.x = emscripten_random() * 950.0f + 25.0f;
  location.y = emscripten_random() * 950.0f + 25.0f;
  value = emscripten_random() * 250.0f + 50.0f;
}

int Food::getId() const
{
  return id;
}

float Food::getValue() const
{
  return value;
}

Point Food::getLocation() const
{
  return location;
}

float Food::getFood(float amount)
{
  if (amount > value)
  {
    float tmp = value;
    location.x = emscripten_random() * 950.0f + 25.0f;
    location.y = emscripten_random() * 950.0f + 25.0f;
    value = emscripten_random() * 250.0f + 50.0f;
    return tmp;
  }

  value -= amount;
  return amount;
}

// Bindings:
EMSCRIPTEN_BINDINGS() {
  emscripten::class_<Food>("Food")
    .constructor<int>()
    .property("id", &Food::getId)
    .property("value", &Food::getValue)
    .property("location", &Food::getLocation)
    .function("getFood", &Food::getFood);
}
