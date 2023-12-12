// eslint-disable-next-line @typescript-eslint/ban-types
export function getFunctionNames(obj: object) {
  const methods: string[] = [];
  while ((obj = Reflect.getPrototypeOf(obj))) {
    const keys = Reflect.ownKeys(obj);
    keys.forEach((k) => methods.push(k.toString()));
  }
  return methods.filter((m) => !!m);
}
