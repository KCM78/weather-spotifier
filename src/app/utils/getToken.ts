export interface TokenObject {
    access_token: string;
    refresh_token: string;
}

export function getToken(): TokenObject {
  const params = {};
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  let e = r.exec(q);
  while (e) {
    params[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
  }
  return <TokenObject>params;
}
