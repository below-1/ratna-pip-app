<script lang="ts">
  import Field from '$lib/Field.svelte';
  import Input from '$lib/Input.svelte';
  import Password from '$lib/Password.svelte';
  import Button from '$lib/Button.svelte';
  import {
    watchError,
    combineErrors,
    required
  } from '$lib/validation';
  import type { BackendError } from '$lib/error';

  export let error: BackendError | null = null;
  let username = '';
  let password = '';

  $: usernameError = watchError([required('username harus diisi')])(username);
  $: passwordError = watchError([required('password harus diisi')])(password);
  $: someError = combineErrors(usernameError, passwordError);
</script>

<div class="flex-grow flex flex-col items-center justify-center">

  <h1 class="text-3xl mb-6 font-bold">PIP -- Login</h1>
  <form 
    class="w-4/5 mx-auto border rounded shadow-lg p-4 flex flex-col gap-y-4"
    method="POST"
    enctype="multipart/form-data"
  >

    <h1 class="text-xl font-bold">Login ke dalam sistem</h1>

    {#if error}
      <p>{error.message}</p>
    {/if}

    <Field label="Username">
      <Input 
        name="username"
        bind:value={username} 
        error={usernameError}
      />
    </Field>

    <Field label="Password">
      <Password
        name="password"
        bind:value={password}
        error={passwordError}
      />
    </Field>

    <Button 
      color="primary"
      disabled={someError}
    >
      login
    </Button>

  </form>

</div>