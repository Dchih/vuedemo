<template>
  <div class="blog-container">
    <div class="blog-pages">
      <div class="col-md-12 panel">
        <div class="panel-body">
          <h2 class="text-center">{{articleId ? '编辑文章': '创作文章'}}</h2>
          <hr>
          <div data-validator-form>
            <div class="form-group">
              <input v-model.trim="title" v-validator.required="{ title: '标题' }" type="text" class="form-control" placeholder="请填写标题" @input="saveTitle">
            </div>
            <div class="form-group">
                <textarea id="editor"></textarea>
            </div>
            <br>
            <div class="form-group">
              <button class="btn btn-primary" type="submit" @click="post">发 布</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SimpleMDE from 'simplemde';
import highlight from 'highlight.js';
import ls from '@/utils/localStorage';

window.hljs = highlight

export default {
    name: 'Create',
    mounted() {
        const simplemde = new SimpleMDE({
            element: document.querySelector('#editor'),
            placeholder: '请使用 MarkDowm 格式书写 ;-)，代码片段黏贴时请注意使用高亮语法。',
            spellChecker: false,
            autoDownloadFontAwesome: false,
            autosave: {
                enable: true,
                uniqueId: 'vuejs'
            },
            renderingConfig: {
                codeSyntaxHighlighting: true,
            }
        })
        simplemde.codemirror.on('change', () => {
            this.content = simplemde.value()
        })

        this.simplemde = simplemde
        this.fillContent()
    },
    data () {
        return {
            title: '',
            content: '',
            articleId: undefined,
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.setArticleId(vm.$route.params.articleId)
        })
    },
    beforeRouteLeave (to, from, next) {
        this.clearData()
        next()
    },
    watch:{
        '$route'(to) {
            this.clearData()
            this.setArticleId(to.params.articleId)
        }
    },
    methods: {
        saveTitle() {
            ls.setItem('article_title', this.title)
        },
        fillContent(articleId) {
            const simplemde = this.simplemde
            const smde_title = ls.getItem('article_title')
            if(articleId !== undefined) {
                const article = this.$store.getters.getArticlesById(articleId)
                if(article) {
                    const {title, content} = article
                    this.title = smde_title || title
                    this.content = simplemde.value() || content
          simplemde.value(this.content)
                }
            } else {
                this.title = smde_title
                this.content = simplemde.value()
            }
        },
        post() {
            const title = this.title
            const content = this.content
            if(title.trim() && content.trim()) {
                const article = {
                    title,
                    content,
                }
                this.$store.dispatch('post', {article})
                this.clearData()
            }
        },
        clearData () {
            this.title = ''
            ls.removeItem('article_title')
            this.simplemde.value('')
            this.simplemde.clearAutosavedValue()
        },
        setArticleId (articleId) {
            const localArticleId = ls.getItem('articleId')
            if(articleId !== undefined && !(articleId === localArticleId)) {
                this.clearData()
            }
            this.articleId = articleId
            this.fillContent(articleId)
            ls.setItem('articleId', articleId)
        }
    }
}
</script>

<style scoped>
.blog-container { max-width: 980px; margin: 0 auto; margin-top: 20px;}
textarea { height: 200px; }
</style>
