<script lang="ts">
  import { onMount } from 'svelte';
  import now from '$lib/now';
  import Field from '$lib/Field.svelte';
  import Number from '$lib/Number.svelte';
  import Select from '$lib/Select.svelte';

  const tnow = now();

  export let tahun = tnow.getFullYear();
  export let semester = 1;

  const semesterOptions = [
    { text: 'Semester 1', value: 1 },
    { text: 'Semester 2', value: 2 }
  ];
</script>

<style>
  .Filter {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 8px;
  }
</style>

<div class="Filter">
  <Field label="Tahun Ajaran">
    <Number
      name="tahun_ajaran"
      bind:value={tahun}
      on:change={(event) => {
        console.log(event.target.value)
      }}
      min={2020}
      max={2050}
    />
  </Field>

  <Field label="Semester">
    <Select
      bind:value={semester}
      options={semesterOptions}
      name="Semester"
    ></Select>
  </Field>
</div>