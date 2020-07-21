<template>
    <div>
        <Message :show.sync="msgShow" :type="showType" :msg="msg"/>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data () {
        return {
            msg: '',
            showType: '',
            msgShow: false,
        }
    },
    beforeRouteEnter(to, from, next) {
        const fromName = from.name
        const logout = to.params.logout
        next( vm => {
            if(vm.$store.state.auth) {
                switch(fromName) {
                    case 'Register': 
                    vm.showMessage('注册成功')
                    break
                    case 'Login':
                    vm.showMessage('登录成功')
                    break

                }
            } else if(logout) {
                vm.showMessage('操作成功')
            }
        })
    },
    methods: {
        showMessage (msg) {
            this.msg = msg,
            this.showType = 'success'
            this.msgShow = true
        }
    }
}
</script>
<style scoped>

</style>