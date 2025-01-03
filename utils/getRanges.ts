export const getRanges = (array: number[]): string[] => {
  return array.reduce(((l: number[]) => (r: string[], v: number) => {
      if (l[1] > v) return r;
      r.push(l[1] === v
          ? (r.pop(), l.join('–'))
          : (l = [v, v]).slice(0, 1).toString()
      );
      l[1]++;
      return r;
  })([]), [])
}
