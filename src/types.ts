export type NType = number;

export type JenisKelamin = 'Laki - Laki' | 'Perempuan';
export type NilaiKeys = 'matematika' | 'ipa' | 'ips' | 'bing' | 'bindo' | 'penjaskes' | 'prakarya' | 'pancasila' | 'agama';
export type Nilai = Record<NilaiKeys, NType>;
export type NilaiDB = Record<NilaiKeys, string>;

export interface Siswa {
  id: string;
  nama: string;
  nisn: string;
  avatar: string;
  jenis_kelamin: JenisKelamin;
  kelas: number;
  sub_kelas: number;
  tanggal_lahir: string;
}

export type NotificationType = 'positive' | 'negative';
export type NotifyOptions = {
  type: NotificationType,
  message: string,
  timeout: number
}

export type Notify = (options: NotifyOptions) => Promise<void>;
