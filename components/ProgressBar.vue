<template>
	<div class="progress-bar">
		<div
			class="progress-bar__overlay"
			:style="{ 'background-position-x': `-${totalPercent}%` }"
		/>
		<ProgressBarSegment
			v-for="stage, i in stagesWithPercents"
			:key="stage.id"
			:is-played="stage.isPlayed"
			:percent="stage.percent"
			:threshold-points="stage.thresholdPoints"
			:is-active-stage="currentStageIndex === i"
			:total-scores="totalScores"
			:is-first="i === 0"
			:is-last="i === stagesWithPercents.length - 1"
		/>
	</div>
</template>

<script setup>
import ProgressBarSegment from '~/components/ProgressBarSegment.vue';

const props = defineProps({
	stages:
	{
		type: Array,
		default: () => [],
	},
});

const totalScores = computed(() =>
{
	return props.stages.reduce((total, stage) => total += stage.totalScores, 0);
});

const totalPercent = computed(() =>
{
	const percentageOfAllStages = 100 * stagesWithPercents.value.length;
	const percentsSum           = stagesWithPercents.value.reduce((sum, stage) => sum += stage.percent, 0);

	// percentageOfAllStages - 100%
	// percentsSum -           x%
	// (percentsSum * 100) / (100 * stagesWithPercents.length)
	return Math.min(((percentsSum * 100) / percentageOfAllStages), 100);
});

const currentStageIndex = computed(() =>
{
	for (const stageIndex in props.stages)
	{
		const index     = Number(stageIndex);
		const stage     = props.stages[index];
		const nextStage = props.stages[index + 1];

		if (totalScores.value <= stage.thresholdPoints || !nextStage)
			return index;
	}
});

const stagesWithPercents = computed(() =>
{
	return props.stages.map((stage, i) =>
	{
		const prevStage = props.stages[i - 1];
		const nextStage = props.stages[i + 1];

		let percent;

		// если нет следующей стадии
		if (!nextStage)
		{
			percent = ((totalScores.value - prevStage.thresholdPoints) * 100) / (stage.thresholdPoints - prevStage.thresholdPoints);

			if (percent < 0)
				percent = 0;
		}
		// если есть предыдущий элемент, и если общее количесто очков меньше чем попрог у предыдущей стадии
		// то процент заоплнения в последующих стадиях должен быть равен нулю
		else if (prevStage && totalScores.value <= prevStage.thresholdPoints)
			percent = 0;
		// если общее количестов очков больше порога, то процент заоплнения в стадии должен быть 100%
		else if (totalScores.value >= stage.thresholdPoints)
			percent = 100;
		// если есть предыдущее значение, то через пропорцию высчитываем процент заполнения
		// и так же отнимаем от общего количество очков порог предыдущей стадии
		// чтобы правильно высчитать пропорцию
		else if (prevStage)
			percent = ((totalScores.value - prevStage.thresholdPoints) * 100) / (stage.thresholdPoints - prevStage.thresholdPoints);
		// высчтиывание процента заполнения для первой стадии
		else
			percent = (totalScores.value * 100) / stage.thresholdPoints;

		return {
			id: stage.id,
			totalScores: stage.totalScores,
			isPlayed: stage.isPlayed,
			thresholdPoints: stage.thresholdPoints,
			percent,
		};
	});
});
</script>

<style lang="scss">
	.progress-bar
	{
		position: relative;
		display: flex;
		width: 100%;

		.progress-bar-segment
		{
			flex: 1;

			&:first-of-type
			{
				border-radius: 30px 0;
			}
		}
	}
	.progress-bar__overlay
	{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 40px;
		background-color: $c-gray;
		background-position-x: 0%;
		background: linear-gradient(270deg, $c-accent, $c-accent 50%, rgba(239, 239, 239, 0.6) 50%, rgba(239, 239, 239, 0.6) 100%);
		background-size: 199.999% 100%;
		border-radius: 30px;

		@include transition();
	}
</style>
