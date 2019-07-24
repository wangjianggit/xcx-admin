<template>
  <div class="app-container">
    订单管理
  </div>
</template>

<script>
// import { getList } from '@/api/table'

export default {
  // 过滤器
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
  },
  methods: {

  }
}
</script>
