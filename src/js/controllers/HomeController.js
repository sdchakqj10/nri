/**
 * Created by nickrickenbach on 8/11/15.
 */
function HomeController ($rootScope, $scope, $http, $sce, datasets) {

    $scope.projects = datasets.projects;
    $scope.isMobile = false;
    /*$scope.trustHTML = function(_html){
        return $sce.trustAsHtml(_html);
    }*/
    $("body").append($("<hr class='marker m1'/>"));
    $("body").append($("<hr class='marker m2'/>"));

    /**
     * Project mouse over
     * @param $event project object
     */
    $scope.workOver = function($event){
        var project = $("#proj"+$event.id);
        TweenMax.killTweensOf(project);
        var to = (!project.hasClass("alt")) ? "left 50%" : "right 50%";
        //TweenMax.to(project,0.5,{ transformPerspective:600, transformOrigin:to, rotationY:"0",ease:"Back.easeInOut"});
    };


    /**
     * Project mouse out
     * @param $event project object
     */
    $scope.workOut = function($event){
        var project = $("#proj"+$event.id);
        TweenMax.killTweensOf(project);
        var to = (!project.hasClass("alt")) ? "left 50%" : "right 50%";
        var rot = (project.hasClass("alt")) ? "-20" : "20";
        rot = $scope.isMobile ? 0 : rot;
        //TweenMax.to(project,0.3,{ transformPerspective:600, transformOrigin:to, rotationY:rot,ease:"Cubic.easeInOut"});
    };


    /**
     * Project mouse click
     * @param $event project object
     */
    $scope.workClick = function($event){
        var project = $("#proj"+$event.id);
        var wh = $(window).height();
        var ww = $(window).width();
        var o = project.offset();
        var to = (!project.hasClass("alt")) ? "left 50%" : "right 50%";
        var rot = (project.hasClass("alt")) ? "-90" : "90";
        $rootScope.isAltProject = project.hasClass("alt");
        //TweenMax.set(project.parent().parent(),{ transformOrigin:to, transformPerspective:600});
        //TweenMax.to(project.parent().parent(),0.5,{rotationY:rot,ease:"Cubic.easeIn"});
        if(project.hasClass("alt")){
            //TweenMax.to($("body, html"),0.5,{scrollTop:0,onComplete:function(){
            TweenMax.set($("#detail-overlay"),{left:"100%",right:"auto"});
            TweenMax.to($("#main"),0.5,{left:"-100%",ease:"Cubic.easeOut",onComplete:function(){
                $("#main").css({display:"none"});
            },delay:0.75});
            TweenMax.to($("#detail-overlay"),0.5,{left:"0",ease:"Cubic.easeOut",delay:0.75});
            //}});
        }else{
            TweenMax.set($("#detail-overlay"),{left:"-100%"});
            TweenMax.to($("#main"),0.5,{left:"100%",ease:"Cubic.easeOut",onComplete:function(){
                $("#main").css({display:"none"});
            },delay:0.75});
            TweenMax.to($("#detail-overlay"),0.5,{left:"0",ease:"Cubic.easeOut",delay:0.75});
        }
        $("#detail-overlay").html(project.html());
        //window.location.href = "#work/good";
    };

    $scope.projectsSizeAdjust = function(){
        var w = $(window).width();
        $scope.isMobile = (w<768);
        for(var project in $scope.projects){
            $scope.workOut(project);
        }
    }

    /**
     * possible scroll calculations
     */
    $rootScope.workScroll = function(){
        var i = 0;
        var wh = $(window).height();
        var so = $(".site").offset().top;
        var st = $(".site").scrollTop();
        var count = 0;

        // P1 is top point
        // P2 equals entry point on bottom of page.

        // Points on page where object will enter center
        var m1 = (wh-(wh/20*1))+100;
        var m2 = (wh-(wh/20*19))-100;

        //$(".marker.m1").css({top:m1+"px"});
        //$(".marker.m2").css({top:m2+"px"});

        $(".work-block").each(function(){
            var ot = Math.round($(this).offset().top)+st;

            // Enter points
            var p1 = ot+m1;
            var p2 = ot+m2;

            // Exit screen points
            var p1o = p1+$(this).height();
            var p2o = p2+$(this).height();

            // Real Scroll Point
            var sp = st+wh;

            // Perc of enter and exit points
            var prc1 = Math.abs(sp-p2)/Math.abs(p2o-p2);
            var prc2 = Math.abs(sp-p1o)/Math.abs(p1-p1o);

            var rotY;
            var op;
            $(this).attr("data-prev",$(this).attr("data-new"));
            if(sp<p1&&sp>p2o){ // INSIDE
                rotY = 0;
                $(this).attr("data-new","inside");
                op = 0;
                //TweenMax.to($(this).find(".cover-grad"), 0.4, { opacity:0 });
            }else{
                if(sp<=p2o&&sp>=p2){ // INSIDE TOP
                    $(this).attr("data-new","inside");
                    rotY = 0;
                    op = 0;
                    rotY = (i==0) ? 90-(prc1*90) : -90+(prc1*90);
                    //TweenMax.to($(this).find(".cover-grad"), 0.4, { opacity:(1-prc1) });
                }else if(sp<=p1o&&sp>=p1){ // INSIDE BOTTOM
                    $(this).attr("data-new","inside");
                    rotY = 0;
                    op = 0;
                    rotY = (i==0) ? 90-(prc2*90) : -90+(prc2*90);
                    //TweenMax.to($(this).find(".cover-grad"), 0.4, { opacity:(1-prc2) });
                }else{ // OUTSIDE
                    $(this).attr("data-new","out");
                    rotY = (i==0) ? 90 : -90;
                    op = 1;
                    //TweenMax.to($(this).find(".cover-grad"), 0.4, { opacity:1 });
                }
            }

            var to = (!$(this).hasClass("alt")) ? "left 50%" : "right 50%";

            if($(this).attr("data-new")!=$(this).attr("data-prev")) {
                //console.log($(this).attr("data-new")+" "+$(this).attr("data-prev"));
                /*TweenMax.to($(this).find(".cover-grad"), 0.5, { opacity:op });
                TweenMax.to($(this), 0.5, {
                    rotationY: rotY,
                    transformOrigin: to,
                    transformPerspective: 600,
                    ease: "Expo.easeInOut"
                });*/
            }
            if(rotY==0||rotY==90||rotY==-90){
                //TweenMax.set($(this),  { rotationY:rotY, transformOrigin:to, transformPerspective:600 });
            }else{
                //TweenMax.to($(this), 0.2, { rotationY:rotY, transformOrigin:to, transformPerspective:600 });
            }
            //TweenMax.set($(this).find(".work-bg-img"), { css:{transform:"translateY(" + (0-wh-(ot-st-wh/6))/1.5 + "px)" }});
            //TweenMax.to($(this).find(".work-bg-img"), 0.2, { css:{transform:"translateY(" + ((ot-st-wh/6)) + "px)" }});
            //TweenMax.to($(this).find(".cover-grad"), 0.2, { /*width:((1-perc)*100)+"%",*/ opacity:(1-perc) });
            i = (i==0) ? 1 : 0;
            count++;
        });
    }
    $scope.$on('$viewContentLoaded', function(){
        prevView = $("#main-alt").html();
        newView = $("#view").html();
        switchViews('home');
        var i = 0;
        $(".work-block").each(function(){
            var to = (i==0) ? "left 50%" : "right 50%";
            var rot = (i==0) ? 90 : -90;
            var crot = (i==1) ? 0 : 180;
            TweenMax.set($(this), { rotationY:rot, transformOrigin:to, transformPerspective:600 });
            TweenMax.set($(this).find(".cover-grad"), { rotationZ:crot, transformOrigin:"50% 50%", transformPerspective:1000 });
            i = (i==0) ? 1 : 0;
            //$(this).bind("transitionend webkitTransitionEnd oTransitionEnd",workScroll);
        });
        //$(".site").scroll($rootScope.workScroll);
        //$(document).resize($rootScope.workScroll);
        //$(document).bind("orientationchange",$rootScope.workScroll);
        $(window).bind("resize",$scope.projectsSizeAdjust);
        $(window).bind("orientationchange",$scope.projectsSizeAdjust);
        setTimeout($scope.projectsSizeAdjust,100);
    });
};
HomeController.resolve = getResolve('src/handler.php?section=home');
