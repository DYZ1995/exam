/**
 * Created by DYZ on 2016/9/26.
 */
angular.module("app.subject",["ng"])
    .controller("subjectController",["$scope","commonService","$routeParams","$location","subjectService",
        function ($scope,commonService,$routeParams,$location,subjectService) {
        $scope.add=function () {
            $location.path("addSubject");
        };
        $scope.subject={
            typeId:3,
            levelId:1,
            departmentId:1,
            topicId:1,
            stem:"",
            answer:"",
            analysis:"",
            
        };


        //将路由参数绑定到作用域中
        $scope.params=$routeParams;
        console.log($routeParams)
        commonService.getAllTypes(function (data) {
            $scope.types=data;
        });
        commonService.getAllLevels(function (data) {
            $scope.levels=data;
        });
        commonService.getAllDepartments(function (data) {
            $scope.departments=data;
        });
        commonService.getAllTopics(function (data) {
            $scope.topics=data;
        });
        subjectService.getAllSubjects($routeParams,
            function (data) {
                data.forEach(function (subject) {
                    var answer=[];
                    //为每个选项添加A B C D
                    subject.choices.forEach(function (choice) {
                        if(choice.correct){
                            answer.push(choice.no)
                        }
                    })
                })
            }
        )
    }])
    .factory("commonService",["$http",function ($http) {
        return{
            getAllTypes:function (handler) {
                $http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjectType.action")
                    .success(function (data) {
                        handler(data)
                    });
            },
            getAllLevels:function (handler) {
                $http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjectLevel.action")
                    .success(function (data) {
                        handler(data);
                    });
            },
            getAllDepartments:function (handler) {
                $http.get("http://172.16.0.5:7777/test/exam/manager/getAllDepartmentes.action")
                    .success(function (data) {
                        handler(data);
                    })
            },
            getAllTopics:function (handler) {
                $http.get("http://172.16.0.5:7777/test/exam/manager/getAllTopics.action")
                    .success(function (data) {
                        handler(data);
                    });
            },
            convertIndexToNo:function (index) {
                return index==0?'A':(index==1?'B':(index==2?'C':(index==3?'D':'E')))
            }
        };
    }])

    .service("subjectService",["$http",function ($http) {
        //获取题目信息
        this.getAllSubjects=function (params,handler) {
            var data={};
            //循环遍历将data转换为后台能够识别的筛选对象
            for(var key in params){
                var val=params[key];
                if(val!=0){
                    //只有在val不等于0时，才设置筛选属性
                    switch(key){
                        case "a":
                            data['subject.subjectType.id']=val;
                            break;
                        case "b":
                            data['subject.subjectLevel.id']=val;
                            break;
                        case "c":
                            data['subject.department.id']=val;
                            break;
                        case "d":
                            data['subject.topic.id']=val;
                            break;
                    }
                }
            }
            console.log(data);
            $http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjects.action",{
                params:data
            }).success(function (data) {
                handler(data);
            });
        };
    }])
