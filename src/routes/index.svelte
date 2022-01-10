<script>
	import { showForm } from '../stores';
	import Navbar from '../components/Navbar.svelte';
	import { notifications } from '../components/notifications.js';
	import Toast from '../components/Toast.svelte';
	let doTodo = '';
	let listTodo = [{ Do: 'Prueba', status: false }];

	function addToList() {
		if (doTodo != '') {
			listTodo = [...listTodo, { Do: doTodo, status: false }];
			doTodo = '';
		} else {
			notifications.danger('Tarea Vacia', 1700);
		}
	}
	function removeFromList(index) {
		listTodo[index].status = true;

		setTimeout(function () {
			listTodo.splice(index, 1);
			listTodo = listTodo;
		}, 500);
	}
	const onKeyPress = (e) => {
		if (e.charCode === 13) addToList();
	};
</script>

<main>
	<Navbar />

	<div class="div-form">
		<input
			class="input-todo"
			bind:value={doTodo}
			on:keypress={onKeyPress}
			type="text"
			placeholder="Nueva Tarea"
			style="border: solid 1.5px rgb(124, 192, 152); 
				   margin: 0px;border-radius: 15px;
				   padding: 10px;width: 100%;
				   height: 100%;color: #fff;"
		/>
		<button
			on:click={() => addToList()}
			class="btn-floating btn-large waves-effect waves-light"
			type="submit"
			name="action"
		>
			<i class="fas fa-paper-plane" />
		</button>
	</div>

	<div class="Todos-div row">
		{#each listTodo as lT, index}
			<div
				class={lT.status == false
					? 'col s12 m6 l3 animate__animated animate__zoomInUp animate__slows'
					: 'col s12 m6 l3 animate__animated animate__zoomOut animate__slower'}
			>
				<div class="card horizontal">
					<div class="card-stacked">
						<div class="card-content">
							<p class="content-p">{lT.Do}</p>
						</div>
						<div class="card-action center-align">
							<p>
								<i
									class={lT.status == false ? 'far fa-square' : 'far fa-check-square'}
									on:click={() => removeFromList(index)}
								/>
								<span>Hecho</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<Toast />
</main>

<style>
	main {
		width: 100%;
		height: 100%;
	}

	.content-p {
		word-break: break-all;
	}
	.fa-paper-plane {
		padding: 0px;
		margin: 0px;
		font-size: 20px;
	}
	.fa-check-square,
	.fa-square {
		font-size: 30px;
		color: rgb(112, 214, 172);
	}
	.div-form {
		margin-top: 80px;
		padding: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		transition: top 1s;
		z-index: 1;
		height: 60%;
	}
	.input-todo {
		border-radius: 35px;
		padding: 40px;
		margin: 0px;
		width: 100%;
		height: 100%;
		color: #fff;
	}
	.btn-floating {
		margin-left: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgb(124, 192, 152);
		width: 50px;
		height: 45px;
	}
	.Todos-div {
		margin-top: 10px;
	}
</style>
