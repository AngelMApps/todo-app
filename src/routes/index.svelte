<script>
	import Navbar from '../components/Navbar.svelte';
	import Todos from '../components/Todo.svelte';
	import { user } from '../user';
	import { auth, googleProvider } from '../firebase';
	import { onMount } from 'svelte';
	import LoaderPage from '../components/loaderPage.svelte';

	onMount(async () => {
		await user.current();
	});

	const loginWithGoogle = async () => {
		try {
			const res = await auth.signInWithRedirect(googleProvider);
			user.setUser(res.user);
		} catch (error) {
			console.error(error);
		}
	};
</script>

<main>
	<section>
		{#if $user === false}
			<LoaderPage />
		{:else if $user === null}
			<Navbar />
			<div>
				<button on:click={loginWithGoogle} class="center-align">
					<i class="fab fa-google" /> Signin with Google
				</button>
			</div>
		{:else}
			<!-- else content here -->
			<Navbar iUser={$user} />
			<Todos uid={$user.uid} />
		{/if}
	</section>
</main>

<style>
	main {
		width: 100%;
		height: 100%;
	}
	div {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	button {
		border: none;
		margin-top: 100px;
		cursor: pointer;
		width: 70%;
		background-color: rgb(123, 214, 169);
		border-radius: 20px;
		color: black;
		height: 40px;
		font-size: 20pt;
	}
	button:hover {
		background-color: rgb(21, 138, 128);
		color: white;
		border-radius: 20px;
	}
	@media only screen and (max-width: 430px) {
		button {
			width: 90%;
			font-size: 20pt;
		}
	}
	@media only screen and (max-width: 336px) {
		button {
			width: 90%;
			font-size: 15pt;
		}
	}
</style>
