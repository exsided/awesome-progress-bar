<template>
	<label class="ui-checkbox">
		<input
			:checked="modelValue"
			type="checkbox"
			class="ui-checkbox__input"
			@change="onChange"
		>
		<div class="ui-checkbox__body">
			<span class="ui-checkbox__box" />
			<span class="ui-checkbox__text">
				<slot />
			</span>
		</div>
	</label>
</template>

<script setup>
const props = defineProps({
	modelValue: Boolean,
});

const emit = defineEmits(['update:model-value']);

const onChange = () => emit('update:model-value', !props.modelValue);
</script>

<style lang="scss">
	.ui-checkbox
	{
		position: relative;
		display: block;
		width: fit-content;
	}
	.ui-checkbox__input
	{
		position: absolute;
		width: 0;
		height: 0;
		top: 0;
		left: 0;
		z-index: -10;
		visibility: hidden;
		opacity: 0;

		&:enabled
		{
			// включен, но не выбран
			&:not(:checked)
			{
				& ~ .ui-checkbox__body:hover .ui-checkbox__box
				{
					background-position: center center;
					background-repeat: no-repeat;
				}
			}
			// включен и выбран
			&:checked
			{
				& ~ .ui-checkbox__body .ui-checkbox__box
				{
					background-color: $c-accent;
					background-image: url(/svg/checked.svg);
				}
			}
		}
	}
	.ui-checkbox__body
	{
		display: flex;
		align-items: center;
		cursor: pointer;
		width: fit-content;
	}
	.ui-checkbox__box
	{
		border: 1px solid $c-accent;
		background-position: center center;
		background-repeat: no-repeat;
		min-width: 18px;
		width: 18px;
		height: 18px;
		border-radius: 4px;
		margin-right: 10px;

		@include transition();
	}
</style>
