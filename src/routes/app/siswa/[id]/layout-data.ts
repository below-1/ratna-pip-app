import db from "$src/db";
import type { RequestEvent, RequestHandlerOutput } from "@sveltejs/kit";

export async function get(event: RequestEvent) {
  const id = event.params.id;
  const sql = db();
  const result = await sql`
    select * from siswa
      where id = ${id}
  `;
  if (!result.length) {
    throw new Error('stop');
  }
  return {
    body: {
      item: result[0]
    }
  }
}