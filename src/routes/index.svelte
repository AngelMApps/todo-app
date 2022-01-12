<script>
	import Navbar from '../components/Navbar.svelte';
	import Todos from '../components/Todo.svelte';
	import Profile from '../components/Profile.svelte';
	import { auth, googleProvider } from '../firebase';
	import { authState } from 'rxfire/auth';

	let user;

	const unsubscribe = authState(auth).subscribe((u) => (user = u));

	function login() {
		auth.signInWithPopup(googleProvider);
	}
</script>

<main>
	<Navbar />
	<section>
		{#if user}
			<Profile {...user} />
			<button on:click={() => auth.signOut()}>Logout</button>
			<hr />
			<Todos uid={user.uid} />
		{:else}
			<button on:click={login}> Signin with Google </button>
		{/if}
	</section>
</main>

<style>
	main {
		width: 100%;
		height: 100%;
	}
	button {
		margin-top: 100px;
	}
</style>
