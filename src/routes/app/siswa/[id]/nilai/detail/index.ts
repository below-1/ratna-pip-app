import type { RequestEvent, RequestHandler } from "@sveltejs/kit";
import type { Nilai } from '$src/types';
import db from '$src/db';

export async function post(event: RequestEvent) {
  const siswaId = event.params.id;
  const _tahun = event.url.searchParams.get('tahun');
  const tahun = _tahun ? parseInt(_tahun) : 2022;
  const _semester = event.url.searchParams.get('semester');
  const semester = _semester ? parseInt(_semester) : 1;
  const payload = await event.request.json();
  const sqlPayload = {
    ...payload,
    tahun_ajaran: tahun,
    semester,
    id_siswa: siswaId
  }
  const sql = db();
  const result = await sql`
    insert into nilai 
      ${sql(sqlPayload)}
      on conflict (id_siswa, tahun_ajaran, semester) 
        DO UPDATE SET ${sql(sqlPayload)}
      returning id_siswa, tahun_ajaran, semester
  `;

  return {
    body: {
      result
    }
  }
}

export async function get(event: RequestEvent) {
  const siswaId = event.params.id;
  const _tahun = event.url.searchParams.get('tahun');
  const tahun = _tahun ? parseInt(_tahun) : 2022;
  const _semester = event.url.searchParams.get('semester');
  const semester = _semester ? parseInt(_semester) : 1;
  const sql = db();
  const result = await sql<Nilai[]>`
    select
      matematika,
      ipa,
      ips,
      bindo,
      bing,
      prakarya,
      penjaskes,
      agama,
      pancasila
    from nilai
      where 
        id_siswa = ${siswaId}
        and tahun_ajaran = ${tahun}
        and semester = ${semester}
  `;
  let item: Nilai = {
    matematika: 0,
    ipa: 0,
    ips: 0,
    bindo: 0,
    bing: 0,
    penjaskes: 0,
    pancasila: 0,
    prakarya: 0,
    agama: 0
  }
  if (result && result.length > 0) {
    item = result[0]
  }
  return{
    body: {
      item
    }
  }
}