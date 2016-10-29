/**
 * Created by DYZ on 2016/9/26.
 */
$(function () {
    //设置菜单收起展开
    $(".baseUI>li>ul").slideUp();
    $(".baseUI>li").off();
    $(".baseUI>li").on("click",function () {
        if($(this).children("ul").css("display")=="none"){
            $(".baseUI>li>ul").slideUp();
            $(this).children("ul").slideDown();
        }
    })
    $(".baseUI>li>ul").eq(0).slideDown();
    //设置菜单列表选中后的样式

    $(".baseUI>li>ul>li").on("click",function () {
        $(".baseUI>li>ul>li").removeClass("current");
        $(this).addClass("current");
    })
    $(".baseUI>li>ul>li>a").eq(0).trigger("click");
    $(".baseUI>li>ul>li")
})
angular.module("app",["ng","ngRoute","app.subject"])
    .controller("mainCtrl",["$scope",function ($scope) {

    }])
    .config(["$routeProvider",function ($routeProvider) {
        //a类型id  b难度id  c方向id  d知识点id
        $routeProvider.when("/AllSubject/a/:a/b/:b/c/:c/d/:d",{
            templateUrl:"tpl/subjects/subjectList.html",
            controller:"subjectController"
        }).when("/subjectManager",{
            templateUrl:"tpl/subjects/subjectManager.html",
            controller:"subjectController"
        }).when("/addSubject",{
            templateUrl:"tpl/subjects/addSubject.html",
            controller:"subjectController"
        })

    }])