import type { RequestEvent, RequestHandlerOutput } from "@sveltejs/kit";
import type { Siswa } from '$src/types';
import db from "$src/db";

export async function get(event: RequestEvent): Promise<RequestHandlerOutput> {
  const sql = db();

  let keyword = event.url.searchParams.get('keyword');
  keyword = keyword ? keyword : '';
  let limitRaw = event.url.searchParams.get('limit');
  let limit = limitRaw ? parseInt(limitRaw) : 10;
  let after = event.url.searchParams.get('after');
  
  const items = await sql<Siswa[]>`
    select * from siswa
      where 
        nama ilike ${'%' + keyword + '%'}
        ${after 
          ? sql`and id > ${after}`
          : sql``
        }
      order by id
      limit ${limit}
  `;
  const withAvatar = items.map(item => {
    const avatar = `https://avatars.dicebear.com/api/human/${item.id}.svg`
    return {
      ...item,
      avatar
    }
  });
  return {
    body: {
      items: withAvatar
    }
  }
}