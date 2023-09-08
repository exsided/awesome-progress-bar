<template>
	<div class="ui-counter">
		<button class="ui-counter__btn" @click="decrement">
			<MinusSvg />
		</button>
		<input
			type="number"
			:value="modelValue"
			:min="min"
			:max="max"
			name="no-autocomplite-counter"
			autocomplete="off"
			class="ui-counter__input"
			@input="inputHandler($event.target.value)"
		>
		<button class="ui-counter__btn" @click="increment">
			<PlusSvg />
		</button>
	</div>
</template>

<script setup>
import MinusSvg from '~/assets/svg/minus.svg?skipsvgo';
import PlusSvg from '~/assets/svg/plus.svg?skipsvgo';

const emit = defineEmits(['update:model-value']);

const props = defineProps({
	modelValue:
	{
		type: Number,
		default: 0,
	},
	max:
	{
		type: [Number, Boolean],
		default: false,
	},
	min:
	{
		type: [Number, Boolean],
		default: false,
	},
});

const increment = () =>
{
	const newVal = props.modelValue + 1;

	if (props.max !== false && newVal > props.max)
		return;

	emitUpdate(newVal);
};
const decrement = () =>
{
	const newVal = props.modelValue - 1;

	if (props.min !== false && newVal < props.min)
		return;

	emitUpdate(newVal);
};

const inputHandler = val => emitUpdate(Number(val));

const emitUpdate = val => emit('update:model-value', val);
</script>

<style lang="scss">
	.ui-counter
	{
		display: flex;
		align-items: center;
		gap: 16px;
	}
	.ui-counter__btn
	{
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		background-color: #F4F5F7;
		padding: 11px;
		max-height: 36px;
		cursor: pointer;
		border: 1px solid #F4F5F7;
		@include transition();

		svg, path
		{
			@include transition();
		}

		&:hover
		{
			svg { transform: scale(1.1); }
			path { stroke: $c-black; }
		}
	}
	.ui-counter__input
	{
		text-align: center;
		border: unset;
		background-color: unset;
		outline: unset;

		&::-webkit-inner-spin-button { visibility: hidden; }
	}
</style>
