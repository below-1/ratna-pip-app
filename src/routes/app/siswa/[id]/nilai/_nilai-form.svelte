<script lang="ts">
  import type { NType } from '$src/types';
  import Field from '$lib/Field.svelte';
  import Number from '$lib/Number.svelte';

  export let matematika: NType;
  export let ipa: NType;
  export let ips: NType;
  export let bindo: NType = 0;
  export let bing: NType = 0;
  export let penjaskes: NType = 0;
  export let prakarya: NType = 0;
  export let agama: NType = 0;
</script>

<div class="flex flex-col gap-y-4">
  <Field label="Matematika">
    <Number
      name="matematika"
      bind:value={matematika}
    />
  </Field>

  <Field label="IPA">
    <Number
      name="ipa"
      bind:value={ipa}
    />
  </Field>

  <Field label="IPS">
    <Number
      name="ips"
      bind:value={ips}
    />
  </Field>

  <Field label="Bahasa Indonesia">
    <Number
      name="bindo"
      bind:value={bindo}
    />
  </Field>

  <Field label="Bahasa Inggris">
    <Number
      name="bing"
      bind:value={bing}
    />
  </Field>

  <Field label="Penjaskes">
    <Number
      name="penjaskes"
      bind:value={penjaskes}
    />
  </Field>

  <Field label="Prakarya">
    <Number
      name="prakarya"
      bind:value={prakarya}
    />
  </Field>

  <Field label="Agama">
    <Number
      name="agama"
      bind:value={agama}
    />
  </Field>
</div>