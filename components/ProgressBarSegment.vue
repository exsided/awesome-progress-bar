<template>
	<div
		class="progress-bar-segment"
		:class="{
			'progress-bar-segment--active': isActiveStage,
			'progress-bar-segment--highlight': highlight,
			'progress-bar-segment--bordered': !isLast,
		}"
	>
		<CupSvg
			v-if="isLast"
			class="progress-bar-segment__cup"
			:class="{ 'progress-bar-segment__cup--highlight': highlight }"
		/>
		<StarSvg
			v-else
			class="progress-bar-segment__star"
		/>
		<Transition name="fade">
			<span v-if="isActiveStage" class="progress-bar-segment-text progress-bar-segment__value">
				{{ totalScores }} / {{ thresholdPoints }}
			</span>
			<span v-else class="progress-bar-segment-text progress-bar-segment__value">
				{{ thresholdPoints }}
			</span>
		</Transition>
		<div
			v-if="isFirst"
			class="progress-bar-segment-text progress-bar-segment__start"
		>
			0
		</div>
	</div>
</template>

<script setup>
import StarSvg from '~/assets/svg/star.svg?skipsvgo';
import CupSvg from '~/assets/svg/cup.svg?skipsvgo';

const props = defineProps({
	isPlayed:
	{
		type: Boolean,
		default: false,
	},
	percent:
	{
		type: Number,
		default: 0,
	},
	thresholdPoints:
	{
		type: Number,
		default: 0,
	},
	isActiveStage:
	{
		type: Boolean,
		default: false,
	},
	totalScores:
	{
		type: Number,
		default: 0,
	},
	isFirst:
	{
		type: Boolean,
		default: false,
	},
	isLast:
	{
		type: Boolean,
		default: false,
	},
});

const highlight = computed(() => props.isPlayed && props.totalScores >= props.thresholdPoints);
</script>

<style lang="scss">
	.progress-bar-segment
	{
		position: relative;
		height: 40px;

		&--active
		{
			.progress-bar-segment__star, .progress-bar-segment__cup
			{
				transform: translate(50%) scale(1.2);
			}
		}

		&--highlight
		{
			.progress-bar-segment__star path { fill: $c-accent; }
		}

		&--bordered
		{
			border-right: 1px solid #00000020;
		}
	}
	.progress-bar-segment__star
	{
		position: absolute;
		right: 0;
		top: -28px;
		width: 18px;
		transform: translate(50%);

		@include transition();

		path
		{
			fill: $c-white;

			@include transition();
		}
	}
	.progress-bar-segment__cup
	{
		position: absolute;
		right: 0;
		top: -28px;
		width: 46px;
		transform: translate(50%);

		@include transition();
	}
	.progress-bar-segment__value
	{
		position: absolute;
		right: 0;
		bottom: -23px;
		transform: translate(50%);
	}
	.progress-bar-segment-text
	{
		font-size: 14px;
		font-style: normal;
		line-height: normal;
		letter-spacing: -0.14px;
		color: $c-light-black;
	}
	.progress-bar-segment__start
	{
		position: absolute;
		left: 0;
		bottom: -23px;
		transform: translate(50%);
	}
</style>
