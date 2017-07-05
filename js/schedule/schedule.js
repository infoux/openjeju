/**
 * Created by dongguk on 2017-05-18.
 */
$(document).ready(function() {
  // MAP 초기화
  if (map) {
    map.mapContainer.relayout();
    map.mapContainer.setCenter(new daum.maps.LatLng(33.366002, 126.542242));
  }
  var $list = $('div.list');

  $.each($('#sortList').find('ul'), function(e1, e2) {
    Sortable.create($(e2).get(0), {
      filter: '.ignore',
      draggable: ".detail",
      onUpdate: function(evt) {
        var itemEl = evt.item; // dragged HTMLElement
        console.log(itemEl);
      },
    });
  });

  // DAY SELECT
  $list.on('click', 'h4', function(e) {
    var $target = $(e.target);
    pageStatus.selectIndex = $target.parent('h4').attr('index');
    $list.find('h4,ul').removeClass('active');
    $list.find('h4[index=' + pageStatus.selectIndex + '],ul[index=' + pageStatus.selectIndex + ']').addClass('active');
  });
});

var pageStatus = {
  selectIndex: 0
};

// Search
var addContents = function(obj) {
  $('div.plan-search').remove();
  $('div.plan-list div.list').after(initSearch());
};

// INIT MAP
var map = new initDaumMap('map', {
  lat: '33.366002',
  lng: '126.542242',
  level: 10,
  minlevel: 6
});


function initSearch() {
  // 검색조건
  var pageIndex = 1;
  var param = {
    searchKeyword: ''
  };

  var $obj = $('<div class="plan-search"/>');
  var $searchObj = $('<div class="search-inner"/>');
  var $fieldset = $('<fieldset />');
  var $div = $('<section />', {
    id: "searchList",
    class: 'searchList'
  });
  var $searchKeyword = $('<input/>', {
      type: "text",
      name: "searchKeyword",
      placeholder: "검색어를 입력해주세요"
    })
    .keydown(function(event) {
      if (event.keyCode == 13) {
        param.searchKeyword = $searchKeyword.val();
        searchList($('#pagenation'), $('#searchList'), 1, 4, param);
        event.preventDefault();
      }
    });


  $searchObj.append($('<h5>찾아보기</h5>'));
  $searchObj.append($('<p />'));


  $fieldset.append($('<legend class="sr-only">검색폼</legend>'));
  $fieldset.append($searchKeyword);
  $fieldset.append(
    $('<button />', {
      type: 'button'
    })
    .append($('<i class="fa fa-search" aria-hidden="true"/>'))
    .append('검색').click(function() {
      param.searchKeyword = $searchKeyword.val();
      searchList($('#pagenation'), $('#searchList'), 1, 4, param);
    })
  );

  $searchObj.append($fieldset);
  $searchObj.append($div);
  $searchObj.append($('<div />', {
    id: 'pagenation',
    class: 'pagenation'
  }));
  $searchObj.append(
    $('<button class="close"><i class="fa fa-times" aria-hidden="true"></i></button>')
    .click(function() {
      $obj.remove();
    })
  );
  $obj.append($searchObj);
  return $obj;
}


var searchList = function(obj, renderObj, pageNum, countNum, p_seachdata) {
  var totalCount = 0;
  $.ajax({
    type: "GET",
    url: "/ajax/contentsSearchCount.jto",
    async: false,
    data: {
      searchKeyword1: p_seachdata.searchKeyword
    },
    datatype: "JSON",
    success: function(list) {
      totalCount = list;
    }
  });
  $(obj).paging('destroy');
  $(obj).paging(totalCount, {
    format: '[< nncnn >]',
    lapping: 0,
    perpage: countNum,
    page: pageNum,
    onSelect: function(page) {
      $.ajax({
        type: "GET",
        url: "/ajax/contentsSearch.do",
        data: {
          pageIndex: page,
          recordCountPerPage: countNum,
          searchKeyword1: p_seachdata.searchKeyword
        },
        datatype: "JSON",
        success: function(data) {
          $(renderObj).empty();
          $.each(data, function(index, e1, e2) {
            var $div = $('<div />', {
              class: 'content'
            });
            var marker;
            //console.log(e1);
            $div.append(
              $('<div />', {
                class: 'image'
              })
              .append($('<img />', {
                src: e1.fileStreCours
              }))
            );
            $div.append('<span><i>' + e1.title + '</i><small>' + e1.region1Cd + ' ' + e1.region2Cd + '</small></span>');
            $div.append('<strong></strong>');
            $div.append(
              $('<p />')
              .append(
                $('<i class="fa fa-info-circle" aria-hidden="true"/>').click(function() {
                  // 컨텐츠 정보보기
                  alert(e1.title);
                })
              )
              .append(
                $('<i class="fa fa-plus-circle" aria-hidden="true"/>').click(function() {
                  // 컨텐츠 추가 e1.contentsId
                  var $list = $('div.plan-list div.list ul[index=' + pageStatus.selectIndex + ']');
                  var count = $list.find('dt').length;
                  var $li = $('<li/>', {
                    class: 'detail'
                  });
                  var $contents = $('<div/>', {
                    class: 'content'
                  });
                  var $comment = $('<div/>', {
                    class: 'comment'
                  });
                  var $commentBtn = $('<i class="fa fa-commenting" aria-hidden="true"></i>');
                  $li.append(
                    $('<h5/>', {
                      index: count,
                      text: ++count
                    }),
                    $contents
                    .append('<h6>' + e1.title + '<small>' + e1.region1Cd + ' ' + e1.region2Cd + '</small></h6>')
                    .append(
                      $('<p/>', {
                        class: 'hit-area'
                      })
                      .append(
                        // 요소 제거
                        $('<i class="fa fa-times-circle" aria-hidden="true"></i>').click(function() {
                          $li.remove();

                          marker.setMap(null);

                        })
                      )
                      .append(
                        // 코멘트 생성
                        $commentBtn.click(function() {
                          $contents
                            .after(
                              $comment.append(
                                $('<textarea/>', {
                                  name: 'memo',
                                  placeholder: '코멘트를 입력하세요'
                                }),
                                $('<button/>', {
                                  type: 'button',
                                  text: '삭제'
                                }).click(function() {
                                  $comment.remove();
                                  $comment.html('');
                                  $commentBtn.show();
                                })
                              )
                            );
                          $commentBtn.hide();
                        })
                      )
                    )
                    // 가상 input 생성
                    .append(
                      $('<input />', {
                        type: 'hidden',
                        name: 'list[].dayOrder',
                        value: Number(pageStatus.selectIndex) + 1
                      }),
                      $('<input />', {
                        type: 'hidden',
                        name: 'list[].startTime'
                      }),
                      $('<input />', {
                        type: 'hidden',
                        name: 'list[].startMinute'
                      }),
                      $('<input />', {
                        type: 'hidden',
                        name: 'list[].contentsId',
                        value: e1.contentsId
                      }),
                      $('<input />', {
                        type: 'hidden',
                        name: 'list[].title'
                      }),
                      $('<input />', {
                        type: 'hidden',
                        name: 'list[].addr'
                      }),
                      $('<input />', {
                        type: 'hidden',
                        name: 'list[].latitude'
                      }),
                      $('<input />', {
                        type: 'hidden',
                        name: 'list[].longitude'
                      }),
                      $('<input />', {
                        type: 'hidden',
                        name: 'list[].imageFileId'
                      })
                    )
                  );
                  // 요소 생성
                  var $btn = $list.children('button');
                  $list.children('button').remove();
                  $list.append($li).append($btn);

                  // 마커생성
                  marker = map.addMarker({
                    title: e1.title,
                    latitude: e1.latitude,
                    longitude: e1.longitude
                  });

                })
              )
            );
            $(renderObj).append($div);
          });
        },
      });
    },
    onFormat: function(type) {
      switch (type) {
        case 'first':
          if (this.active)
            return '<a class="jump" href="#' + this.value + '">' + '<i class="fa fa-angle-double-left" aria-hidden="true"/>' + '</a>';
          return '';

        case 'prev':
          if (this.active)
            return '<a class="move" href="#' + this.value + '">' + '<i class="fa fa-angle-left" aria-hidden="true"/>' + '</a>';
          return '';

        case 'block':
          if (!this.active)
            return '<a href="#' + this.value + '">' + this.value + '</a>';
          else if (this.value != this.page)
            return '<a href="#' + this.value + '" >' + this.value + '</a>';

          return '<strong>' + this.value + '</strong>';

        case 'next':
          if (this.active)
            return '<a class="move" href="#' + this.value + '">' + '<i class="fa fa-angle-right" aria-hidden="true"/>' + '</a>';
          return '';

        case 'last':
          if (this.active)
            return '<a class="jump" href="#' + this.value + '">' + '<i class="fa fa-angle-double-right" aria-hidden="true"/>' + '</a>';
          return '';
      }
    }
  });
};

function settingFormData() {
  $data = $('div.plan-inner li');
  $.each($data, function(p1, p2) {
    var $inputlist = $(p2).find('input');

    $.each($inputlist, function(pp1, pp2) {
      var attr = $(pp2).attr('name');
      $(pp2).attr('name', attr.replace('[]', '[' + p1 + ']'));
    });
  });
}
