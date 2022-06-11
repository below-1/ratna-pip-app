export type NType = number;

export type Nilai = {
  matematika: NType,
  ipa: NType,
  ips: NType,
  bing: NType,
  bindo: NType,
  penjaskes: NType,
  prakarya: NType,
  pancasila: NType,
  agama: NType,
}

export interface Siswa {
  id: string;
  nama: string;
  nisn: string;
  avatar: string;
}