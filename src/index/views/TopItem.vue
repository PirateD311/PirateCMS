<template>
    <article class="content-item">
        <el-row :gutter="0">
            <el-col :xs="24" :sm="24" :md="7" :lg="7">
                <div class="post-angle" v-if="item.isTop == 1">荐</div>
                <div class="post-angle" v-if="item.isVip == true">会员专享</div>
                <div class="grid-content bg-purple contentImg" >
                    <router-link :to="'/details/'+item._id+'.html'" class="continue-reading">
                        <img :class="{blur:item.isVip}" v-lazy="item.sImg.replace('http://oz7btgiar.bkt.clouddn.com/small','/upload/images')"  :alt="item.title" />
                    </router-link>
                </div>
            </el-col>           
            <el-col :xs="24" :sm="24" :md="17" :lg="17" class='discription'>
                <div class="grid-content bg-purple-light title">
                    <h2>
                        <router-link :to="'/details/'+item._id+'.html'" class="continue-reading">{{item.title}}</router-link>
                    </h2>
                    <div class="dis">{{item.discription}}</div>
                    <ul class="post-meta">
                        <li>
                            <div v-if="item.categories && item.categories.length>1">
                                <router-link :to="{path: '/'+(item.categories)[item.categories.length-1].defaultUrl+ '___'+(item.categories)[item.categories.length-1]._id}">{{(item.categories)[item.categories.length-1].name}}</router-link>
                            </div>
                        </li>
                        <li>
                            <i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;&nbsp;{{item.date}}</li>
                        <li>
                            <i class="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;{{item.clickNum>999?'999+':item.clickNum}}</li>
                        <li>
                            <i class="fa fa-comment" aria-hidden="true"></i>&nbsp;&nbsp;{{item.commentNum}}</li>
                    </ul>
                </div>
            </el-col>
        </el-row>
    </article>
</template>
<style lang="scss">
    .content-item {
        padding: 5px;
        .post-angle {
            position: absolute;
            left: -10px;
            height: 21px;
            color: #fff;
            text-align: center;
            background-color: #f63756;
            line-height: 24px;
            padding: 0 10px;
            z-index: 101;
            top: 0px;
            font-size: 13px;
        }
        .post-angle:after {
            content: " ";
            position: absolute;
            left: 0;
            top: 21px;
            width: 0;
            height: 0;
            border-top: 6px solid #cd213d;
            border-left: 10px solid transparent;
        }
        .contentImg {
            max-height:200px;
            overflow:hidden;
            img {
                width: 100%;
                border-radius: 15px;
            }
            margin-right: 30px;
            height: auto;
            display: block;
            position: relative;
            .content-cate {
                position: absolute;
                top: .4rem;
                left: .4rem;
                display: block;
                padding: 0 .5rem;
                color: #fff;
                background: rgba(0, 0, 0, .5);
                font-size: .6rem;
                text-align: center;
                border-radius: 1rem;
                z-index: 11;
            }
        }
        .discription {
            text-align: left;
            padding:0px 10px;
            .post-meta {
                a:link,
                a:visited {
                    color: #3ca5f6;
                }
                li {
                    display: inline-block;
                    font-size: 13px;
                    color: #b4b4b4;
                    margin: 10px 10px 10px 0;
                }
            }
            .title {
                margin-top: 10px;
                h2 {
                    margin: 0;
                    font-size: 18px;
                    word-break: break-all;
                }
            }
            .dis {
                margin: 12px 0;
                font-size: 14px;
                color: #333333;
            }
        }
    }
</style>

<script>
    export default {
        name: 'index-item',
        serverCacheKey: props => {
            return `article-item-${props.item._id}`
        },
        props: ['item'],
        created(){
            // console.log('TopItem Created...Item->',this.item);
        }
    }
</script>