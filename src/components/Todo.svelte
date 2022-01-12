<script>
	import { db } from '../firebase';
	import { notifications } from './notifications.js';
	import Toast from './Toast.svelte';
	// User ID passed from parent
	export let uid;

	// Form Text
	let text = '';
	let tasks = [];
	// Query requires an index, see screenshot below
	db.collection('todos')
		.where('uid', '==', uid)
		.orderBy('created')
		.onSnapshot((querySnapshot) => {
			let docs = [];
			querySnapshot.forEach((doc) => {
				docs.push({ ...doc.data(), id: doc.id });
			});
			tasks = [...docs];
		});

	const add = async () => {
		if (text != '') {
			try {
				await db.collection('todos').doc().set({ uid, text, complete: false, created: Date.now() });
			} catch (error) {
				console.error(error);
			}
		} else {
			notifications.danger('Tarea Vacia', 1700);
		}
		text = '';
	};

	async function removeItem(id) {
		db.collection('todos').doc(id).update({ complete: true });
		setTimeout(async function () {
			await db.collection('todos').doc(id).delete();
		}, 500);
	}

	const onKeyPress = (e) => {
		if (e.charCode === 13) addToList();
	};
</script>

<main>
	<div class="div-form">
		<input
			class="input-todo"
			bind:value={text}
			on:keypress={onKeyPress}
			type="text"
			placeholder="Nueva Tarea"
			style="border: solid 1.5px rgb(124, 192, 152); 
				   margin: 0px;border-radius: 15px;
				   padding: 10px;width: 100%;
				   height: 100%;color: #fff;"
		/>
		<button
			on:click={add}
			class="btn-floating btn-large waves-effect waves-light"
			type="submit"
			name="action"
		>
			<i class="fas fa-paper-plane" />
		</button>
	</div>

	<div class="Todos-div row">
		{#each tasks as todo}
			<div
				class={todo.complete == false
					? 'col s12 m6 l3 animate__animated animate__zoomInUp animate__slows'
					: 'col s12 m6 l3 animate__animated animate__zoomOut animate__slower'}
			>
				<div class="card horizontal">
					<div class="card-stacked">
						<div class="card-content">
							<p class="content-p">{todo.text} - {todo.id}</p>
						</div>
						<div class="card-action center-align">
							<p>
								<i
									class={todo.complete == false ? 'far fa-square' : 'far fa-check-square'}
									on:click={() => removeItem(todo.id)}
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
