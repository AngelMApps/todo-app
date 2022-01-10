<script>
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { notifications } from './notifications.js';

	export let themes = {
		danger: '#E26D69',
		success: '#84C991',
		warning: '#f0ad4e',
		info: '#5bc0de',
		default: 'rgb(122, 158, 150)'
	};
</script>

<div class="notifications">
	{#each $notifications as notification (notification.id)}
		<div
			animate:flip
			class="toast"
			style="background: {themes[notification.type]};"
			transition:fly={{ y: 100 }}
		>
			<div class="content">{notification.message}</div>
			{#if notification.icon}<i class={notification.icon} />{/if}
		</div>
	{/each}
</div>

<style>
	.notifications {
		position: fixed;
		bottom: 30px;
		right: 10px;

		margin: 0 auto;
		padding: 0;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		pointer-events: none;
	}

	.toast {
		flex: 0 0 auto;
		text-align: center;
		margin-bottom: 10px;
		width: 170px;
	}

	.content {
		padding: 10px;
		display: block;
		color: white;
		font-size: 16pt;
		font-weight: 500;
	}
</style>
