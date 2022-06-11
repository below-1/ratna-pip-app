import db from '../../db';

export async function get(event) {
  const sql = db()
  const superUser = {
    username: 'superuser',
    password: 'superuser',
    role: 'superuser'
  }
  const result = await sql.begin(async sql => {
    const [ { username } ] = await sql`
      insert into "user" ${sql(superUser)}
        returning "username"
    `;
    return username;
  })
  return {
    status: 200,
    body: {
      message: 'OK',
      result
    }
  }
}