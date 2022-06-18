import type { RequestEvent, RequestHandlerOutput } from "@sveltejs/kit";
import type { Siswa } from '$src/types';
import db from "$src/db";

export async function get(event: RequestEvent) {
  let keyword = event.url.searchParams.get('keyword');
  keyword = keyword ? keyword : '';
  let limitRaw = event.url.searchParams.get('limit');
  let limit = limitRaw ? parseInt(limitRaw) : 10;
  let nochange = event.url.searchParams.get('nochange');
  nochange = nochange ? true : false;
  let after = event.url.searchParams.get('after');
  const _tahun = event.url.searchParams.get('tahun');
  const _semester = event.url.searchParams.get('semester');
  const tahun = _tahun ? parseInt(_tahun) : 2020;
  const semester = _semester ? parseInt(_semester) : 1;
  const sql = db();

  const items = await sql<Siswa[]>`
    select 
      s.id, 
      s.nama,
      s.nisn,
      s.avatar,
      avg(unnest(array[
        n.matematika,
        n.ipa,
        n.ips,
        n.bindo,
        n.bing,
        n.penjaskes,
        n.prakarya,
        n.pancasila,
        n.agama
      ])) as rata
        
      from siswa s
      join nilai n on s.id = n.id_siswa and tahun_ajaran = ${tahun} and semester = ${semester}
      where 
        s.nama ilike ${'%' + keyword + '%'}
      group by s.id
      order by rata desc
      limit ${limit}
  `;
  return {
    body: {
      items,
      keyword,
      tahun,
      semester,
      nochange
    }
  }
}