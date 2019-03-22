<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <title>KIT ADMIN</title>
  <link rel="stylesheet" href="${re.contextPath}/plugin/plugins/layui/css/layui.css" media="all" />
  <link rel="stylesheet" href="${re.contextPath}/plugin/plugins/font-awesome/css/font-awesome.min.css" media="all" />
  <link rel="stylesheet" href="${re.contextPath}/plugin/build/css/app.css" media="all" />
  <link rel="stylesheet" href="${re.contextPath}/plugin/build/css/themes/default.css" media="all" id="skin" kit-skin />
</head>
<body class="kit-theme">
<#--动态tab演示  利用 freemarker 宏实现-->
<#macro tree data start end>
  <#if (start=="start")>
  <div class="layui-side layui-bg-black kit-side">
  <div class="layui-side-scroll">
    <div class="kit-side-fold"><i class="fa fa-navicon" aria-hidden="true"></i></div>
  <ul class="layui-nav layui-nav-tree" lay-filter="kitNavbar" kit-navbar>
  </#if>
  <#list data as child>
    <#if child.children?size gt 0>
      <li class="layui-nav-item">
        <a class="" href="javascript:;"><i class="fa fa-plug" aria-hidden="true"></i><span> ${child.name}</span></a>
        <dl class="layui-nav-child">
        <@tree data=child.children start="" end=""/>
        </dl>
      </li>
    <#else>
      <dd>
        <a href="javascript:;" kit-target data-options="{url:'${child.url}',icon:'${child.ico}',title:'${child.name}',id:'1'}">
          <i class="layui-icon">${child.ico}</i><span> ${child.name}</span></a>
      </dd>
    </#if>
  </#list>
  <#if (end=="end")>
  </ul>
  </div>
  </div>
  </#if>
</#macro>
<@tree data=menu start="start" end="end"/>

<script src="${re.contextPath}/plugin/plugins/layui/layui.js"></script>
<script src="${re.contextPath}/plugin/tools/main.js"></script>
</body>
</html>