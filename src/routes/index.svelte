<script>
	import Navbar from '../components/Navbar.svelte';
	let showForm = false;
	let doTodo = '';
	let listTodo = [];

	function addToList() {
		if (doTodo != '') {
			listTodo = [...listTodo, { do: doTodo, status: false }];
			doTodo = '';
			showForm = !showForm;
			console.log(listTodo);
		}
	}
</script>

<main>
	<Navbar />
	<div class={showForm == true ? 'div-form show_Form' : 'div-form hide_Form'}>
		<textarea bind:value={doTodo} rows="20" type="text" placeholder="Nueva Tarea" multiple />
		<input type="button" on:click={addToList} value="agregar" />
	</div>
	<div class="addButton" on:click={() => (showForm = !showForm)}>
		<i class="fas fa-plus" />
	</div>
</main>

<style>
	main {
		width: 100%;
		height: 100%;
	}
	.addButton {
		background-color: rgb(122, 158, 150);
		color: rgb(255, 255, 255);
		padding: 0px;
		margin: 0px 5px 5px 0px;
		position: absolute;
		right: 0;
		z-index: 1;
		bottom: 0;
		width: 45px;
		height: 45px;
		border-radius: 25px;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: background-color 1s ease-in-out, color 1s ease-in-out;
		cursor: pointer;
	}
	i {
		padding: 0px;
		font-size: 25px;
	}
	.addButton:hover {
		background-color: rgb(220, 245, 239);
		color: rgb(77, 100, 95);
	}
	.div-form {
		background-color: rgba(77, 99, 94, 0.199);
		width: 50%;
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		transition: top 1s;
		z-index: 1;
		height: 60%;
	}
	.show_Form {
		position: absolute;
		top: 100px;
		left: 0;
		right: 0;
		margin: auto;
	}
	.hide_Form {
		position: absolute;
		top: -400px;
		left: 0;
		right: 0;
		margin: auto;
	}
	textarea {
		resize: none;
		border-radius: 15px;
		outline: none;
		padding: 10px;
		width: 90%;
		border: 0;
		background-color: rgb(171, 187, 177);
	}
	button {
		border-radius: 20px;
	}
</style>
