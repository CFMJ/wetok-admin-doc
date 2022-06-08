# 组件

存放自定义组件的文档

<el-button type="primary">点击</el-button>

<script setup>
import { useData } from 'vitepress'

const { page } = useData()
</script>

<pre>{{ page }}</pre>
