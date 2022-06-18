import type { RequestEvent } from "@sveltejs/kit";
import db from '$src/db';

export async function get(event: RequestEvent) {
  let status: number;
  let headers: any = {};
  let body: any;
  const username = event.params.username;
  if (event.url.searchParams.has('redirect')) {
    status = 303;
    headers['Location'] = event.url.searchParams.get('redirect')!;
  } else {
    status = 200;
    body = {
      message: 'OK'
    };
  }
  const sql = db();
  await sql`delete from "user" where "username" = ${username}`;
  return {
    status,
    headers,
    body
  }
}