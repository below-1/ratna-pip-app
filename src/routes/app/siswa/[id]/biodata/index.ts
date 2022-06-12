import type { RequestEvent, RequestHandler } from "@sveltejs/kit";
import type { Siswa } from '$src/types';
import db from '$src/db';

export async function get(event: RequestEvent) {
  const id = event.params.id;
  const sql = db();
  const [ siswa ] = await sql<[Siswa?]>`
    select * from siswa where id = ${id}
  `;
  return {
    body: {
      siswa
    }
  }
}

export async function post(event: RequestEvent) {
  const id = event.params.id;
  const payload = await event.request.json();
  const sql = db();
  const result = await sql`
    update siswa
      set ${sql(payload)}
      returning id
  `;
  let body: any = result && result.length 
    ? { id: result[0].id_siswa }
    : {};
  return {
    body
  }
}