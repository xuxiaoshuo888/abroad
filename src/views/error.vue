<template>
    <div class="error">
        <i class="el-icon-error"></i>
        <p>出错了呢<br/><span>请仔细检查填写字段，不要在金额、名额等数字字段输入字符</span></p>
    </div>
</template>

<script>
  export default {
    name: "error"
  }
</script>

<style lang="scss">
    .error{
        text-align: center;
        padding: 45px 0 0 0;
        i{
            display: inline-block;
            font-size: 300px;
            color: #393D49;
        }
        p{
            width: 500px;
            font-size: 16px;
            margin: 30px auto;
            padding-top: 20px;
            border-top: 5px solid #393D49;
            span{
                font-size: 14px;
            }
        }
    }
</style>