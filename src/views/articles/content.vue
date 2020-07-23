<template>
  <div class="blog-container" style="margin-top:20px">
    <div class="blog-pages">
      <div class="col-md-9 left-col pull-right">
        <div class="panel article-body content-body">
          <h1 class="text-center">{{ title }}</h1>
          <div class="article-meta text-center">
            <i class="fa fa-clock-o"></i>
          </div>
          <div class="entry-content">
            <div class="content-body entry-content panel-body ">
              <div class="markdown-body" v-html="content"></div>
                <div v-if="auth && uid === 1" class="panel-footer operate">
                  <div class="actions">
                    <a @click="deleteArticle" class="admin" href="javascript:;"><i class="fa fa-trash-o"></i></a>
                    <a @click="editArticle" class="admin" href="javascript:;"><i class="fa fa-pencil-square-o"></i></a>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import hljs from 'highlight.js'
import emoji from 'node-emoji'
import {mapState} from 'vuex'

export default {
    name: 'Content',
    data() {
        return {
            title: '',
            content: '',
            date: '',
            uid: 1,
        }
    },
    computed: {
      ...mapState([
        'auth',
        'user',
      ])
    },
    created() {
        const articleId = this.$route.params.articleId
        const article = this.$store.getters.getArticlesById(articleId)
        if(article) {
            let {uid, title, content, date} = article
            this.title = title
            this.date = date
            this.uid = uid
            this.content = SimpleMDE.prototype.markdown(emoji.emojify(content, name => name))
            this.$nextTick(() => {
                this.$el.querySelector('pre code').forEach((item) => {
                    hljs.highlightBlock(el)
                })
            })
        }
        this.articleId = articleId
    },
    methods: {
      editArticle () {
        this.router.push({name: 'articleEdit', params: {articleId: this.articleId}})
      },
      deleteArticle () {
         this.$swal({
          text: '你确定要删除此内容吗?',
          confirmButtonText: '删除'
        }).then((res) => {
          if (res.value) {
            this.$store.dispatch('post', { articleId: this.articleId })
          }
        })
      }
    },
}
</script>