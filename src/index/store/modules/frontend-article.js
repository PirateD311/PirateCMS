import api from '~api'

const state = () => ({
    lists: {
        data: [],
        hasNext: 0,
        page: 1,
        path: ''
    },
    item: {
        data: {},
        path: '',
        isLoad: false
    },
    hotContentList: [],
    recentContentList: []
})

const actions = {
    async ['getArticleList']({
        commit,
        state
    }, config) {
        if (state.lists.data.length > 0 && config.path === state.lists.path) {
            return
        }
        const {
            data
        } = await api.get('content/getList', {
                ...config,
                cache: true
            })
        if (data.docs && data.state === 'success') {
            commit('receiveArticleList', {
                ...config,
                ...data
            })
        }
    },
    async ['getArticleItem']({
        commit,
        state
    }, config) {
        // if (config.path === state.item.path) {
        //     return
        // }

        // console.log('---config---', config);
        const {
            data: {
                doc, messages, randomArticles
            }
        } = await api.get('content/getContent', {
                ...config,
                markdown: 1
            })
        // console.log('----data-111---', messages);
        if (doc) {
            commit('receiveArticleItem', {
                doc,
                messages, randomArticles,
                ...config
            })
            return state.lists;
        }
    },
    async ['getHotContentList']({
        commit,
        state
    }, config) {
        if (state.hotContentList.length && config.path === state.lists.path) return
        const {
            data
        } = await api.get('content/getSimpleListByParams', {
                ...config,
                sortby: 'clickNum',
                model: 'simple',
                cache: true
            })
        // console.log('----getSimpleListByParams---', data);
        if (data.docs && data.state === 'success') {
            commit('receiveHotList', data)
        }
    },
    async ['getRecentContentList']({
        commit,
        state
    }, config) {
        const {
            data
        } = await api.get('content/getSimpleListByParams', {
                ...config,
                model: 'simple',
                cache: true
            })
        // console.log('----getRecentContentList---', data);
        if (data.docs && data.state === 'success') {
            commit('receiveRecentList', data)
        }
    },
    async ['getTuijianList']({commit,state},config){
        const {data} = await api.get('content/tuijian',{...config,})
        console.log('----getTuijianList---', data);
        if (data.docs && data.state === 'success') {
            commit('receiveTuijianList', data)
        }        
    }
}

const mutations = {
    ['receiveArticleList'](state, {
        docs,
        pageInfo,
        hasNext,
        hasPrev,
        page,
        path
    }) {
        state.lists = {
            data: docs,
            pageInfo,
            hasNext,
            hasPrev,
            page,
            path
        }
    },
    ['receiveArticleItem'](state, {
        doc, messages, randomArticles,
        path
    }) {
        state.item = {
            doc, messages, randomArticles,
            path,
            isLoad: true
        }
    },
    ['receiveHotList'](state, data) {
        state.hotContentList = data.docs
    },
    ['receiveRecentList'](state, data) {
        state.recentContentList = data.docs
    },
    ['receiveTuijianList'](state, data) {
        state.tuijianList = data.docs
    }    
}

const getters = {
    getArticleList:(state,getters)=>(path)=>{ 
        console.log('path:',path,'List path:',state.lists.path)
        if(path === state.lists.path)
            return state.lists
        else return {
            data:{},
            loading:true
        }
    },
    ['getArticleItem'](state) {
        return state.item
    },
    ['getHotContentList'](state) {
        return state.hotContentList
    },
    ['getRecentContentList'](state) {
        return state.recentContentList
    },
    ['getTuijianList'](state) {
        return state.tuijianList
    },    
    
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
