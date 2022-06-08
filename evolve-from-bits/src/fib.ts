export function fib(n: number): number {
  if (n <= 0) {
    return 0;
  }

  let a: number = 0;
  let b: number = 1;

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < n; ++i) {
    const t = a + b;
    a = b;
    b = t;
  }

  return b;
}
