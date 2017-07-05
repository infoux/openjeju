<%@ page language="java" import="skoinfo.rfc.board.BoardManager" contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>

<!-- HEADER -->
<c:if  test="${IndexActionVO.contentsVO != null}">
    <c:choose>
        <c:when test="${IndexActionVO.contentsVO.layoutSid != 0}">
            <c:import url="/WEB-INF/jsp/egovframework/rfc3/user/domain/${IndexActionVO.domainVO.domainNm}/${IndexActionVO.contentsVO.layoutSid}/before.jsp"></c:import>
        </c:when>
        <c:otherwise>
            <!doctype html>
            <html lang="ko">
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Step1</title>
            </head>
            <body>
        </c:otherwise>
    </c:choose>
</c:if>


<section class="plan-write">
    <div class="container">
        <h4>나만의 여행일정 만들기</h4>


        <form:form name="TourComScheduleVO" modelAttribute="TourComScheduleVO" method="post" action="/sched/step2.jto" onsubmit="return validate(this)">
            <form:hidden path="travelScheduleId"/>
            <form:hidden path="command"/>
            <form:input path="title" placeholder="여행일정 제목을 입력해 주세요."/>

                <form:input cssClass="date" path="startDay" placeholder="날짜를 선택해 주세요."/>
                <button type="button">
                    <i class="fa fa-calendar-check-o" aria-hidden="true"></i>
                    날짜선택
                </button>
                <form:select path="durationCd" items="${durationCds}" itemLabel="codeNm" itemValue="code"/>
                <span><strong>1박 2일</strong> 여행일정을 선택하셨습니다.</span>

            <form:textarea path="description" placeholder="여행 간단 소개 내용을 입력해주세요."/>
        <div class="plan-btn">
            여행타입
            <c:forEach var="theme" items="${themeList}">
                <button type="button" data="<c:out value="${theme.themeCd}" />"><c:out value="${theme.themeCdNm}" /></button>
            </c:forEach>
            <form:hidden path="themeCd"/>
        </div>
        <div class="btn-area">
            <a href="javascript:" onclick="$('#TourComScheduleVO').submit()">다음단계</a>
            <a href="/index.jto?menuCd=${IndexActionVO.menuCd}">취소</a>
        </div>
        </form:form>
      </div>
  </section>

<script type="text/javascript">
$(document).ready(function(){
   $('div.plan-btn').on('click', 'button', function(e){
       var $target=$(e.target);
       var data = $target.attr('data');

       $('div.plan-btn button').removeClass('active');
       $target.addClass('active');

       document.TourComScheduleVO.themeCd.value=data;
   });
});
function validate(f){



    if(!confirm('다음 단계로 진행하시겠습니까?'))
        return false;
}
</script>


<!-- FOOTER -->
<c:if  test="${IndexActionVO.contentsVO != null}">
    <c:choose>
        <c:when test="${IndexActionVO.contentsVO.layoutSid != 0}">
            <c:import url="/WEB-INF/jsp/egovframework/rfc3/user/domain/${IndexActionVO.domainVO.domainNm}/${IndexActionVO.contentsVO.layoutSid}/next.jsp"></c:import>
        </c:when>
        <c:otherwise>
            </body>
            </html>
        </c:otherwise>
    </c:choose>
</c:if>
