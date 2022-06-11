import { isEmpty } from './util';

type Rule<X> = (x: X) => string | null;

export const required: (msg: string) => Rule<any> = (msg: string | null) => {
  return (v: any) => {
    if (v === null || v === undefined || v === '') {
      return msg;
    }
    return null;
  }
}

export function min_length(n: number, msg: string) {
  return (v: string | null) => {
    if (!v) return null;
    if (v.length < n) {
      return msg;
    }
    return null;
  }
}

export function max_length(n: number, msg: string) {
  return (v: string | null) => {
    if (!v) return null;
    if (v.length > n) {
      return msg
    }
    return null;
  }
}

export function watchError(rules: Rule<any>[]) {
  return (value: any) => {
    for (let r of rules) {
      const vr = r(value)
      if (vr) {
        return vr;
      }
    }
    return null;
  }
}

export function combineErrors(...vals: Array<string | null>) {
  return vals.find(v => !!v);
}
