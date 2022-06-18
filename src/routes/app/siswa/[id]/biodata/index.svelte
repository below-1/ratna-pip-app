<script lang="ts">
  import { getContext } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Button from '$lib/Button.svelte';
  import InDate from '$lib/Date.svelte';
  import Field from '$lib/Field.svelte';
  import Input from '$lib/Input.svelte';
  import Select from '$lib/Select.svelte';
  import INumber from '$lib/Number.svelte';
  import { combineErrors, min_length, required, watchError } from '$lib/validation';
  import type { Siswa, Notify } from '$src/types';

  const notify = getContext<Notify>('notify');
  const siswa = getContext<Siswa>('siswa');
  console.log(siswa);
  console.log('siswa');
  let loading = false;
  let nama: string = siswa.nama;
  let nisn: string = siswa.nisn;
  let jenisKelamin = siswa.jenis_kelamin;
  let penghasilan_ortu = siswa.penghasilan_ortu;
  let tanggungan_ortu = siswa.tanggungan_ortu;
  let hafalan_alquran = siswa.hafalan_alquran;
  let tanggalLahir: string | null = siswa.tanggal_lahir;
  let kelas = parseInt(siswa.kelas as any);
  let sub_kelas = parseInt(siswa.sub_kelas as any);
  const jenisKelaminOptions = [
    { text: 'Laki - Laki', value: 'Laki - Laki' },
    { text: 'Perempuan', value: 'Perempuan' }
  ];
  const kelasOptions = [
    { text: 'VII', value: 7 },
    { text: 'VIII', value: 8 },
    { text: 'IX', value: 9 }
  ]

  $: namaError = watchError([
      required('nama harus diisi'),
      min_length(4, 'nama harus lebih dari 4 karakter')
    ])(nama);
  $: nisnError = watchError([
      required('nisn harus diisi'),
      min_length(4, 'nisn harus lebih dari 4 karakter')
    ])(nisn);
  $: jenisKelaminError = watchError([
      required('jenis kelamin harus diisi')
    ])(jenisKelamin);
  $: tanggalLahirError = watchError([
      required('tanggal lahir harus diisi')
    ])(tanggalLahir);
  $: kelas_error = watchError([
      required('kelas harus diisi')
    ])(kelas);
  $: sub_kelas_error = watchError([
      required('sub kelas harus diisi')
    ])(sub_kelas);
  $: someError = combineErrors(
      namaError, 
      jenisKelaminError, 
      nisnError, 
      kelas_error,
      sub_kelas_error,
      tanggalLahirError);

  async function onSubmit() {
    const payload = {
      nama,
      nisn,
      tanggal_lahir: new Date(tanggalLahir!),
      kelas,
      sub_kelas,
      jenis_kelamin: jenisKelamin
    }
    loading = true;
    const url = $page.url;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      notify({
        type: 'positive',
        message: 'berhasil mengubah data siswa',
        timeout: 3000
      })
      goto(`/app/siswa/${siswa.id}/overview`);
    } catch (err) {
      console.log(err);
      notify({
        type: 'negative',
        message: 'gagal mengubah data siswa',
        timeout: 3000
      })
    } finally {
      loading = false;
    }
  }
</script>

<section class="flex flex-col gap-y-6 pt-6">
  <h1 class="text-2xl font-bold px-4">Edit Data Siswa</h1>
  <form 
    method="POST"
    enctype="multipart/form-data"
    class="rounded mx-4 flex flex-col gap-y-3"
    on:submit|preventDefault={onSubmit}
  >
    <Field label="Nama Siswa">
      <Input 
        name="nama"
        bind:value={nama} 
        error={namaError}
      />
    </Field>
    <Field label="Nomor Induk">
      <Input 
        bind:value={nisn} 
        name="nisn"
        error={nisnError}
      />
    </Field>
    <Field label="Jenis Kelamin">
      <Select
        name="jenis_kelamin"
        options={jenisKelaminOptions}
        bind:value={jenisKelamin}
      />
    </Field>
    <Field label="Kelas">
      <Select
        name="kelas"
        options={kelasOptions}
        bind:value={kelas}
      />
    </Field>
    <Field label="Sub Kelas">
      <INumber 
        bind:value={sub_kelas}
        error={sub_kelas_error}
        name="sub_kelas"
      />
    </Field>
    <Field label="Tanggal Lahir">
      <InDate 
        bind:value={tanggalLahir} 
        error={tanggalLahirError} 
        name="tanggal_lahir" />
    </Field>

    <Field label="Penghasilan Orang Tua">
      <INumber 
        bind:value={penghasilan_ortu}
        name="penghasilan_ortu"
      />
    </Field>
    <Field label="Tanggungan Orang Tua">
      <INumber 
        bind:value={tanggungan_ortu}
        name="penghasilan_ortu"
      />
    </Field>
    <Field label="Hafalan AlQuran">
      <INumber 
        bind:value={hafalan_alquran}
        name="hafalan_alquran"
      />
    </Field>
    <Button 
      size="lg" 
      color="primary" 
      disabled={someError}
      {loading}
    >
      simpan
    </Button>
  </form>
</section>
