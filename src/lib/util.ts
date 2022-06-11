export function isEmpty(obj: any) {
  for (let p in obj) {
    return false;
  }
  return true;
}
