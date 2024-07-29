<script setup>
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

const router = useRouter()

const apiStore = useStore()

onMounted(() => {
	if (!confirm('Confirm logout?')) {
		router.go(-1)
	} else {
		apiStore.dispatch('logoutUser')
	}
})
</script>

