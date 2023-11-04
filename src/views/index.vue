<template>
  <div class="page-container">
    <div class="sidebar-menu toggle-others fixed">
      <div class="sidebar-menu-inner">
        <header class="logo-env">
          <!-- logo -->
          <div class="logo">
            <a href="javascript:void(0)" class="logo-expanded">
              <img src="../assets/images/police2.png" width="50%" alt="" />
            </a>
            <a href="javascript:void(0)" class="logo-collapsed">
              <img
                  src="../assets/images/logo-collapsed@2x.png"
                  width="40"
                  alt=""
              />
            </a>
          </div>
          <div class="mobile-menu-toggle visible-xs">
            <a href="javascript:void(0)" data-toggle="user-info-menu">
              <i class="linecons-cog"></i>
            </a>
            <a href="javascript:void(0)" data-toggle="mobile-menu">
              <i class="fa-bars"></i>
            </a>
          </div>
        </header>
        <!-- 侧边栏 -->
        <ul id="main-menu" class="main-menu">
          <li v-for="(menu, idx) in items" :key="idx">
            <a :href="'#' + transName(menu)" class="smooth">
              <i :class="menu.icon"></i>
              <span class="title">{{ transName(menu) }}</span>
            </a>
            <ul v-if="menu.children">
              <li v-for="(submenu, idx) in menu.children" :key="idx">
                <a :href="'#' + transName(submenu)" class="smooth">
                  <span class="title">{{ transName(submenu) }}</span>
                  <span
                      v-show="submenu.is_hot"
                      class="label label-pink pull-right hidden-collapsed"
                  >Hot</span
                  >
                </a>
              </li>
            </ul>
          </li>
          <!-- 关于本站 -->
          <!--          <li class="submit-tag">
                      <router-link to="/about">
                        <i class="linecons-heart"></i>
                        <span class="tooltip-blue">关于本站</span>
                        <span class="label label-Primary pull-right hidden-collapsed"
                        >♥︎</span
                        >
                      </router-link>
                    </li>-->
        </ul>
      </div>
    </div>

    <div class="main-content">
      <nav class="navbar user-info-navbar" role="navigation" style="position: sticky;top: 0;z-index: 9999;" >
<!--        <ul class="user-info-menu left-links list-inline list-unstyled">
          <li class="hidden-sm hidden-xs">
            <a href="javascript:void(0)" data-toggle="sidebar"><i class="fa-bars"></i></a>
          </li>
          <li class="dropdown hover-line language-switcher">
            <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">
              <img :src="lang.flag" /> {{ lang.name }}
            </a>
            <ul class="dropdown-menu languages">
              <li
                  :class="{ active: langItem.key === lang.key }"
                  v-for="langItem in langList"
                  :key="langItem.key"
              >
                <a href="javascript:void(0)" @click="lang = langItem">
                  <img :src="langItem.flag" /> {{ langItem.name }}
                </a>
              </li>
            </ul>
          </li>
        </ul>-->
        <ul class="user-info-menu right-links list-inline list-unstyled">
          <li class="hidden-sm hidden-xs">
            <div class="input-group" style="padding-right: 40px;padding-top: 22px;padding-bottom: 22px;">
              <input type="text" style="border-radius: 10px;"
                     class="form-control" placeholder="输入立即搜索" @input="searchSite">
            </div>
          </li>
        </ul>
      </nav>
      <div v-for="(item, idx) in items" :key="idx">
        <div v-if="item.web">
          <WebItem :item="item" :transName="transName" />
        </div>
        <div v-else v-for="(subItem, idx) in item.children" :key="idx">
          <WebItem :item="subItem" :transName="transName" />
        </div>
      </div>
      <Footer />
    </div>

  </div>
</template>

<script>
import WebItem from "../components/WebItem.vue";
import Footer from "../components/Footer.vue";
import itemsData from "../assets/data.json";
import { loadJs } from '../assets/js/app.js'

export default {
  name: "Index",
  components: {
    WebItem,
    Footer,
  },
  data() {
    return {
      searchParam:null,
      items: itemsData,
      lang: {},
      langList: [
        {
          key: "zh",
          name: "简体中文",
          flag: "./assets/images/flags/flag-cn.png",
        },
        {
          key: "en",
          name: "English",
          flag: "./assets/images/flags/flag-us.png",
        },
      ],
    };
  },
  created() {
    this.lang = this.langList[0];
    loadJs();
  },
  methods: {
    transName(webItem) {
      return this.lang.key === "en" ? webItem.en_name : webItem.name;
    },
    searchSite(param) {
      let siteName = param.target.value // eslint-disable-line no-unused-vars
      //清除搜索结果
      let searchWeb=this.items[0];
      searchWeb.web=[];
      if (!(siteName == null || siteName == "")) {
        const searchResult = [];
        this.findSites(siteName, searchResult, this.items)
        if(searchResult.length!=0){
          /*  const result = {
              "name": "搜索结果",
              "en_name": "searchResult",
              "icon": "linecons-doc",
              "web": searchResult
            }
            this.items.unshift(result);*/
          searchWeb.web=searchResult;
          document.documentElement.scrollTop = 0;
        }
      }

    },
    findSites(siteName, searchResult, sites) {
      for (let i = 0; i < sites.length; i++) {
        let item=sites[i];
        if (item.children) {
          this.findSites(siteName, searchResult, item)
        } else if (item.web) {
          for (const web of item.web) {
            const siteTitle=web.title
            if (siteTitle.toLowerCase().includes(siteName.trim().toLowerCase()))
              searchResult.push(web)
          }
        }
      }
    },
  }
};
</script>

<style>
</style>
