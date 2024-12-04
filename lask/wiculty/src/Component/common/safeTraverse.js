export default function safeTraverse (obj, paths = []) {
  let val = obj;
  let idx = 0;

  while (idx < paths.length) {
    if (!val) {
      return null;
    }
    val = val[paths[idx]];
    idx++; //eslint-disable-line
  }
  return val === 0 ? '0' : val;
}
