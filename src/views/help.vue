<template>
    <div class="work">
        <fieldset>
            <legend>帮助</legend>
        </fieldset>
        <el-row :gutter="20">
            <el-col :span="12" class="marginBot20">
                <el-card shadow="hover">
                    <h4><a href="">操作手册（留管办、港澳台办）</a></h4>
                </el-card>
            </el-col>
            <el-col :span="12" class="marginBot20">
                <el-card shadow="hover">
                    <h4><a href="">操作手册（系统管理员）</a></h4>
                </el-card>
            </el-col>
            <el-col :span="12" class="marginBot20">
                <el-card shadow="hover">
                    <h4><a href="">操作手册（学生）</a></h4>
                </el-card>
            </el-col>
            <el-col :span="12" class="marginBot20">
                <el-card shadow="hover">
                    <h4><a href="">操作手册（院系管理员、立项单位）</a></h4>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  export default {
    name: 'help'
  }
</script>

<style scoped>
    .marginBot20 {
        margin-bottom: 20px;
    }
</style>