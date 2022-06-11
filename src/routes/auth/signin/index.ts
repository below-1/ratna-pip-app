import type { RequestEvent, RequestHandlerOutput } from "@sveltejs/kit";
import * as v from "@badrap/valita";

const SigninSchema = v.object({
  username: v.string(),
  password: v.string()
});

export async function post(event: RequestEvent): Promise<RequestHandlerOutput> {
  const raw = await event.request.formData()
  const rawObject = {
    username: raw.get('username'),
    password: raw.get('password')
  }
  console.log(rawObject);
  console.log('rawObject');
  let response: RequestHandlerOutput = {
    headers: {},
    body: {}
  };
  try {
    const payload = SigninSchema.parse(rawObject);
    response.status = 303;
    response.headers = {
      location: '/app/dashboard'
    };
  } catch (err) {
    console.log(err);
    response.status = 404;
    response.body = {
      error: {
        code: 'VALIDATION_ERR',
        message: 'Periksa kembali form anda'
      }
    };
  }
  return response;
}