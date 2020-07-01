<template>
    <div class="navbar navbar-default topnav">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" @click="toggleNav">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <a href="/" class="navbar-brand">
                <div class="fix-display">
                    <img :src="logo.src" :alt="logo.title">
                    <span class="title">{{logo.title}}</span>
                </div>
                </a>
            </div>
            <div id="top-navbar-collapse" :class="['collapse', 'navbar-collapse', { in: showCollapsedNav }]">
                <ul class="nav navbar-nav">
                    <li v-for="(item, index) in navList" :key="index" :class="{active: index === activeNavIndex}">
                        <a href="#" @click="changeNvIndex(index)">{{item}}</a>
                    </li>
                </ul>

                <div class="navbar-right">
                    <Entry/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Entry from '@/components/layouts/Entry.vue'
export default {
    name: 'TheHeader',
    components: {
        Entry,
    },
    data() {
        return {
            logo: {
                src: `${this.uploadsUrl}communities/hIZjRRdF8oVYZy69XJnT.png!/both/44x44`,
                title: 'LearnKu Vuejs'
            },
            navList: ['社区', '头条', '问答', '教程'],
            activeNavIndex: 0,
            showCollapsedNav: false,
        }
    },
    beforeCreate() {
        this.uploadsUrl = 'https://cdn.learnku.com/uploads/'
    },
    methods: {
        changeNvIndex(index) {
            this.activeNavIndex = index
        },
        toggleNav() {
            this.showCollapsedNav = !this.showCollapsedNav;
        }
    }
}
</script>

<style scoped>
.fix-display {
    display: flex;
    flex-direction: row;
}
.title {
    display: block;
    color: black;
}
.navbar-default .navbar-nav > .active > a { background: rgba(0,0,0,.03);}
</style>