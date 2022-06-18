import type { RequestEvent, RequestHandlerOutput } from "@sveltejs/kit";
import type { Siswa } from '$src/types';
import db from "$src/db";

export async function get(event: RequestEvent) {
  const periode: string = event.params.periode
  const [ tr, sr ] = periode.split('-')
  const tahun = parseInt(tr)
  const semester = parseInt(sr)

  const sql = db();

  const items = await sql<Siswa[]>`
    select 
      s.id, 
      s.nama,
      s.nisn,
      s.avatar,
      s.penghasilan_ortu,
      s.tanggungan_ortu,
      s.hafalan_alquran,
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
      group by s.id
      order by rata desc
  `;

  return {
    body: {
      items
    }
  }
}