export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getObjectWithoutUndefinedFields<T>(obj: T) {
  const temp: Partial<typeof obj> = {};

  Object.keys(obj).forEach((k) => {
    const val = obj[k];
    if (val || typeof val === 'boolean') {
      temp[k] = val;
    }
  });

  return temp;
}
