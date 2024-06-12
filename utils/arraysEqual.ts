export const objectsEqual = (o1: any, o2: any) =>
  Object.keys(o1).length === Object.keys(o2).length
  && Object.keys(o1).every(p => o1[p] === o2[p])

export const arraysEqual = (a1: any, a2: any) =>
  a1.length === a2.length && a1.every((o: any, idx: any) => objectsEqual(o, a2[idx]))
