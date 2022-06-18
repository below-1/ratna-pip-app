import type { RequestEvent, RequestHandlerOutput } from "@sveltejs/kit";
import type { BackendError } from '$lib/error';
import { 
  defaultError,
  VALIDATION_ERR
} from '$lib/error';
import * as v from "@badrap/valita";
import db from "$src/db";
import { DateSchema } from "$src/validation";

export const CreateSiswaInputSchema = v.object({
  nisn: v.string(),
  kelas: v.number().assert(x => x >= 7 && x <= 9, "Kelas invalid"),
  sub_kelas: v.number().assert(x => x >= 1 && x <= 50, "Kelas invalid"),
  nama: v.string(),
  penghasilan_ortu: v.number(),
  tanggungan_ortu: v.number(),
  hafalan_alquran: v.number(),
  jenis_kelamin: v.union(v.literal('Laki - Laki'), v.literal('Perempuan')),
  tanggal_lahir: DateSchema
});

export async function post(event: RequestEvent): Promise<RequestHandlerOutput> {
  const raw = await event.request.json()
  let response: RequestHandlerOutput = {};
  const sql = db();
  try {
    let payload = CreateSiswaInputSchema.parse(raw);
    const userPayload = {
      username: payload.nisn,
      password: payload.nisn,
      role: 'siswa'
    }
    const siswaId = await sql.begin(async tsx => {
      const [ { username } ] = await tsx`
        insert into "user" 
        ${sql(userPayload)}
        returning "username"
      `;
      console.log('here');
      const [ { id } ] = await tsx`
        insert into "siswa" 
        ${sql({ ...payload, username })}
        returning id
      `;
      return id;
    });
    console.log('here');
    response.status = 200;
    response.body = {
      id: siswaId
    };
  } catch (err: any) {
    console.log(err);
    let error: BackendError = defaultError();
    if (err instanceof v.ValitaError) {
      response.status = 404;
      error.code = VALIDATION_ERR
      error.message = 'Periksa kembali form anda'
    } else {
      response.status = 500;
      response.body = {
        error
      } as any;
    }
  }
  return response;
}