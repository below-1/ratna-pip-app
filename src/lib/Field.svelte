<script lang="ts">
  export let label: string;
</script>

<fieldset class="Field flex flex-col gap-y-1">
  <label class="text-gray-600 text-sm">{label}</label>
  <slot></slot>
</fieldset>