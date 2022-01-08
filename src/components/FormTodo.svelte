<script>
	// your script goes here
	let newTodo = '';
	let listTodo = [];

	function addToList() {
		if (newTodo != '') {
			listTodo = [...listTodo, { text: newTodo, status: false }];
			newTodo = '';
			console.log(listTodo);
		}
	}
	const onKeyPress = (e) => {
		if (e.charCode === 13) addToList();
	};
</script>

<!-- markup (zero or more items) goes here -->
<div>
	<input bind:value={newTodo} type="text" on:keypress={onKeyPress} placeholder="new todo item.." />
	<button on:click={addToList}>Add</button>
</div>

<style>
	/* your styles go here */
	input {
		border-radius: 35px;
		outline: none;
		border: 0;
		background-color: rgb(171, 187, 177);
	}
</style>
