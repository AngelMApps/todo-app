<script>
	import Profile from './Profile.svelte';
	export let iUser = null;
	let name = '';
	let iURL = '';
	let uID = '';
	let showDetail = false;
	if (iUser != null) {
		name = iUser.displayName;
		iURL = iUser.photoURL;
		uID = iUser.uid;
	}
</script>

<nav>
	<strong href="/">TodoApp</strong>
	{#if iUser != null}
		{#if showDetail}
			<i class="fas fa-times" on:click={() => (showDetail = !showDetail)} />
		{:else}
			<img src={iUser.photoURL} alt="user" on:click={() => (showDetail = !showDetail)} />
		{/if}
	{:else}
		<i class="fas fa-user-circle" />
	{/if}
	<div class={!showDetail ? 'profile-div__hide' : 'profile-div__show'}>
		<Profile displayName={name} photoURL={iURL} uid={uID} />
	</div>
</nav>

<style>
	nav {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		margin: 0px;
		padding: 0px 10px;
		line-height: 50px;
		width: 100%;
		background-color: rgb(122, 158, 150);
		height: 55px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		z-index: 2;
	}
	strong {
		font-size: 30pt;
		color: #fff;
		padding: 0px;
		margin: 0px;
		text-align: center;
	}
	i {
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 40px;
	}
	.fa-times:hover{
		color: rgb(66, 109, 95);
	}
	img {
		border-radius: 27px;
		height: 100%;
		height: 47px;
		cursor: pointer;
	}
	img:hover {
		filter: brightness(0.5);
	}
	div {
		position: absolute;
		top: 55px;
		padding: 0px;
		background-color: rgb(85, 112, 106);
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 1;
	}
	.profile-div__hide {
		left: -1420px;
		transition: left 0.3s;
	}
	.profile-div__show {
		left: 0;
		transition: left 0.3s;
	}
</style>
