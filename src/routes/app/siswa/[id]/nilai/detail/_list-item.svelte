<script lang="ts">
  export let value: string;
  export let name: string;
</script>

<li class="flex items-center justify-between font-bold py-2 px-3 border rounded mb-2 hover:bg-gray-50">
  <p class="uppercase">{name}</p>
  <p>{value}</p>
</li>
