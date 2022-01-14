<script>
	import { auth, googleProvider } from '../firebase';
	export let displayName;
	export let photoURL;
	export let uid;
</script>

<section>
	<h3>Hola {displayName}!</h3>
	<img src={photoURL} width="100" alt="user avatar" />
	<p>Tu userID es {uid}</p>
	<button on:click={() => auth.signOut()}>
		Logout <i class="fas fa-sign-out-alt"></i>
	</button>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		padding-bottom: 15px;
	}
	button{
		border: none;
		cursor: pointer;
		width: 100%;
		background-color: rgb(123, 214, 169);
		border-radius: 20px;
		color: black;
		height: 35px;
	}
	button,i{
		font-size: 20pt;
	}
	button:hover{
		background-color: rgb(21, 138, 128);
		color: white;
		border-radius: 20px;
	}
</style>
