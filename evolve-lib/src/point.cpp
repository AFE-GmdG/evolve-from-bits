#include <emscripten.h>
#include <emscripten/bind.h>

#include "./point.h"

// Bindings:
EMSCRIPTEN_BINDINGS() {
  emscripten::class_<Point>("Point")
    .property("x", &Point::x)
    .property("y", &Point::y);
}
