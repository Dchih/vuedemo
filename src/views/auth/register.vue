<template>
    <div class="row">
        <div class="col-md-4 col-md-offset-4 floating-box">
            <Message :msg="msg" :type="msgType" :show="showMsg" @updateShow="val => showMsg=val"/>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">请注册</h3>
                </div>
                <div class="panel-body" data-validator-form>
                    <div class="from-group">
                        <label class="control-label">用户名</label>
                        <input v-model="name" v-validator:input.required="{regex: /^[a-zA-Z]+\w*\s?\W*$/, error:'用户名要求以字母开头的单词字符'}" type="text" class="form-control" placeholder="请填写用户名">
                    </div>
                    <div class="from-group">
                        <label class="control-label">密码</label>
                        <input v-model="password" id="password" v-validator.required="{ regex: /^\w{6,16}$/, error: '密码要求 6 ~ 16 个单词字符'}" type="password" class="form-control" placeholder="请填写密码">
                    </div>
                    <div class="from-group">
                        <label class="control-label">确认密码</label>
                        <input v-model="cpassword" type="password" v-validator.required="{target: '#password'}" class="form-control" placeholder="请确认密码">
                    </div><div class="from-group">
                        <label class="control-label">验证码</label>
                        <input v-model="captcha" type="text" v-validator.required="{title: '图片验证码'}" class="form-control" placeholder="请填写验证码">
                    </div>
                    <div class="thumbnail" title="点击图片重新获取验证码" @click="getCaptcha">
                        <div class="captcha vcenter" v-html="captchaTpl"></div>
                    </div>
                    <button type="submit" class="btn btn-lg btn-success btn-block" @click="register">
                        <i class="fa fa-btn fa-sign-in"></i>注册
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import validate from "@/directives/validator.js";
import createCaptcha from '@/utils/captcha.js';
import ls from '@/utils/localStorage.js';

export default {
    name: 'Register',
    data() {
        return {
            captchaTpl: '',
            name: '',   // 用户名
            password: '',   // 密码
            cpassword: '',  // 确认密码
            captcha: '',    // 验证码
            msg: '',
            showMsg: false,
            msgType: '',
        }
    },
    created() {
        this.getCaptcha()
    },
    methods: {
        getCaptcha() {
            const {tpl, captcha} = createCaptcha();     // tpl 为验证码模板， captcha 为验证码数字
            this.localCapthca = captcha;
            this.captchaTpl = tpl;
        },
        register(e) {
            setTimeout(() => {
                const target = e.target.type === 'submit' ? e.target : e.target.parentElement;
                if(target.canSubmit) {
                    this.submit();
                }
            })
        },
        /**
         * 提交注册信息
         * 检查验证码
         * 通过即保存 name, password 到 localStorage
         */
        submit() {
            if(this.captcha.toUpperCase() !== this.localCapthca) {
                this.showMessage('验证码不正确');
                this.getCaptcha();
            } else {
                // 用户输入的信息
                const user = {
                    name: this.name,
                    password: this.password,
                    avatar: `https://api.adorable.io/avatars/200/${this.name}.png`
                }
                // 从localStorage 获取 user 信息))))修改为从store获取
                const localUser = this.$store.state.user;
                
                if(localUser) {
                    if(localUser.name === user.name) {
                        this.showMessage('用户已存在');
                    } else {
                        this.login(user);
                    }
                } else {
                    this.login(user);
                }
            }
        },
        login(item) {
            // ls.setItem('user', item);    修改为调用store.action
            this.$store.dispatch('login', item);
            this.showMessage('注册成功', 'success');
        },
        showMessage(msg, type='warning') {
            this.msg = msg;
            this.msgType = type;
            this.showMsg = false;

            this.$nextTick(() => {
                this.showMsg = true;
            })
        },
    }
}
</script>

<style scoped>
.thumbnail { width: 170px; margin-top: 10px; cursor: pointer;}
.thumbnail .captcha { height: 46px; background: #E1E6E8;}
.captcha {font-size: 24px; font-weight: bold; user-select: none;}
</style>