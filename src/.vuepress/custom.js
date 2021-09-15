/**
 * @file: custom config
 */

let mainConfig = {
  // issue blog 所在目录，评论应在对应 issue 下
  vssueConfig: {
    owner: "nadileaf",
    repo: "blog",
    clientId: "1e86e587c7c0d0029cb6",
    clientSecret: "d4e499dd49e7922a666f694d1ffc0087b151f716"
  },

  // 静态网站的发布位置
  repoConfig: {
    owner: "nadileaf",
    repo: "blog",
    pushBranch: "main",
    email: "chouunsoft@gmail.com",
    filterUsers: []
  },

  title: "Mesoor's Blog",
  description: "",
  customDomain: "",
  base: "/blog/",

  slogan: {
    main: "Mesoor's Blog",
    sub: ""
  },

  themeConfig: {
    nav: [
      {
        name: "首页",
        link: "/blog"
      },
    ],
    headTitle: [],
    friendLinks: [
      {
        name: "Mesoor",
        link: "https://mesoor.com"
      },
    ],
    extraFooters: [
      {
        title: "© 2021 Mesoor, Inc.",
        text: ""
      }
    ],
    pageCount: false
  },

  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        href: "https://avatars2.githubusercontent.com/u/16968934?s=460&v=4"
      }
    ]
  ]
}

module.exports = mainConfig
