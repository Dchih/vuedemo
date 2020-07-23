import router from '../router'

// 需求: 一个用户能发布多篇文章，文章有唯一序号标识
export const post = ({commit, state}, {article, articleId}) => {
    let articles = state.articles
    console.log('state 由 ls.getItem 返回查询数据', state.articles)
    if(!Array.isArray(articles)) articles = []
    if(article) {
        const uid = 1
        const {title, content} = article
        const date = new Date()

        // 
        if(articleId === undefined) {
            let lastArticle = articles[articles.length - 1]

            if(lastArticle) {
                articleId = parseInt(lastArticle.articleId) + 1
            } else {
                articleId = articles.length + 1
            }
            articles.push({
                uid,
                articleId,
                title,
                content,
                date,
            })
        } else {
            for(let article of articles) {
                if(parseInt(article.articleId) === parseInt(articleId)) {
                    article.title = title
                    article.content = content
                    break
                }
            }
        }
        commit('SET_ARTICLE', articles)
        router.push({name: 'Content', params: {articleId, showMsg: true}})
    } else {
        for(let article of articles) {
            if(parseInt(article.articleId) === parseInt(articleId)) {
                articles.splice(articles.indexOf(article), 1)
                break
            }
        }
        commit('SET_ARTICLE', articles)
        router.push({name: 'Home', params: {showMsg: true}})
    }
}