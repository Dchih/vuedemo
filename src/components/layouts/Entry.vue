<template>
    <div class="navbar-right" style="margin-top: 10px;">
        <div class="nav navbar-nav github-btn">
            <a href="#" class="btn btn-default login-btn">
                <i class="fa fa-user"></i>登录
            </a>
            <router-link to="/register" class="btn btn-default login-btn">
                <i class="fa fa-user-plus"></i>注册
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheEntry',
}
</script>

<style scoped>

</style>>