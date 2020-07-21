<template>
    <div class="navbar-right" style="margin-top: 10px;">
        <ul v-if="auth" class="nav navbar-nav github-login">
            <li>
                <a v-dropdown href="#">
                    <span v-if="user">
                        <img v-if="user.avatar" :src="user.avatar" class="avatar-topnav">
                        <span v-if="user.name">{{user.name}}</span>
                    </span>
                    <span v-else>佚名</span>
                    <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                    <li><a href="#" @click="logout"><i class="fa fa-sign-out text-md">退出</i></a></li>
                </ul>
            </li>
        </ul>
        <div v-else class="nav navbar-nav github-btn">
            <router-link to="/login" href="#" class="btn btn-default login-btn">
                <i class="fa fa-user"></i>登录
            </router-link>
            <router-link to="/register" class="btn btn-default login-btn">
                <i class="fa fa-user-plus"></i>注册
            </router-link>
        </div>
    </div>
</template>

<script>
// ES6解构
import {mapState} from 'vuex';

export default {
    name: 'TheEntry',
    computed: {
        ...mapState([
            'auth',
            'user',
        ])
    },
    methods: {
        logout () {
            this.$swal({
                text: '你确定要退出吗',
                confirmButtonText: '退出',
            }).then((resolve) => {
                if(resolve.value) {
                    this.$store.dispatch('logout')
                }
            })
        }
    }
}
</script>

<style scoped>

</style>>