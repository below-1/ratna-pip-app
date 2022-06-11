<script lang="ts">
  interface Option {
    value: number | string;
    text: string;
  }

  export let value: number | string;
  export let options: Option[] = [];
  export let name: string;
</script>

<select 
  class="Select px-4 py-2 outline-none bg-gray-100 border-b-2 border-blue-300 focus:bg-gray-50 focus:border-blue-400 w-full flex-grow"
  bind:value={value}
  {name}
>
  {#each options as option}
    <option value={option.value}>{option.text}</option>
  {/each}
</select>
