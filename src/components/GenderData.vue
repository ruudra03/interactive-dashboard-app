<template>
	<div class="gender-data">
		<canvas id="gender-data-chart"></canvas>
	</div>
</template>

<script>
import ChartJS from 'chart.js/auto'
import genderData from '../data/genderData'

export default {
	data() {
		return {
			genderData: genderData.doughnutChartData
		}
	},
	mounted() {
		const ctx = document.getElementById('gender-data-chart')
		new ChartJS(ctx, this.genderData)
	}
}
</script>