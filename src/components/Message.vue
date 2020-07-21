<template>
    <div v-show="show" :class="`alert alert-${type} alert-dismissible`">
        <button @click="close" type="button" class="close"><span>x</span></button>
        {{msg}}
    </div>
</template>

<script>
export default {
    name: 'message',
    props: {
        msg: {
            type: String,
            default () {
                return '';
            }
        },
        type: {
            type: String,
            default () {
                return 'success';
            }
        },
        show: {
            type: Boolean,
            default: false,
        }
    },
    created() {
    },
    watch: {
        show(value) {
            if(value) {
                this.$nextTick(() => {
                    this.$el.scrollIntoView(true);
                })
            }
        }
    },
    methods: {
        close() {
            this.$emit('updateShow', false);
        }
    }
}
</script>

<style scoped>

</style>