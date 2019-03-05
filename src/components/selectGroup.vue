<template>
    <div class="group">
        <select-item 
            v-for="(item,index) in group"
            :key="index">
        </select-item>
    </div>
</template>
<script>
    import selectItem from '@/components/selectItem.vue'
    export default {
		components: {
			selectItem
		},
        data() {
            return {
                group: [
                    {
						name: '移远',
						isSelected: false
					},
					{
						name: '芯讯通',
						isSelected: false
					},
					{
						name: '中移物联',
						isSelected: false
					}
                ]
            }
        }
    }
</script>
