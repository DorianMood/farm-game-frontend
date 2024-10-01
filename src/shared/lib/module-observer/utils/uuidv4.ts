export const uuidv4 = () => {
  //return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g,
  // (c: number) => c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
  function callback(c: string): string {
    const num: number = parseInt(c);
    const arr: Uint8Array = crypto.getRandomValues(new Uint8Array(1));
    const p: number = arr[0] & (15 >> (num / 4));

    return (num ^ p).toString(16);
  }

  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, callback);
};
