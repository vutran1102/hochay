/**
 * Webview mathjax js
 */
import AppConst from '../constants/mathConst';
import styleMedia from './StyleMedia';
import styleWebApp from './StyleWebApp';

const isSubjectMathJax = (subjectId) => {
  if (subjectId === AppConst.mathID || subjectId === AppConst.phyID || subjectId === AppConst.chemID
    || AppConst.mathVao10ID || subjectId == AppConst.mathPlay) {
    return true;
  }
  return false;
};

const style = `
  * {
    -webkit-user-select: none;
  }
  #containerMain{
    display:block;
  }
  p img {
    float: inherit !important;display:block; max-width: 100%; margin: 0 auto 4px auto !important;
  }
  :focus{
    outline:0px;
  }
  body {
    padding: 0;margin:0 !important; font-family: Arial, sans-serif !important;
  }
  label.form-check-label{
    display: inline-block;
  } 
  .question {
    overflow:auto;padding:0px 15px;padding-top:10px;margin-bottom:10px;font-weight:bold;color:#232729
  }
  .d-flex {
    display: flex!important;
  }
  #table-content {
    position: relative;
  }
  .d-inline-block {
    display: inline-block !important;
  }
  .text-center{
    text-align: center;
  }
  .hidden{
    display:none;
  }
  #keypad {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .scrollKey{
     overflow-x: hidden; 
     overflow-y: scroll; 
     max-height: calc(100vh - 170px);
  }
  .activeInput{
    background:#bcdcbc !important;
  }
  .activeButton{
      background:#1e9f98 !important;
  }
  .activeKeyboard{
      background:#fec435 !important;
  }
  .swap{
      background:#fec435 !important;
  }
  
  ${styleMedia}  
  ${styleWebApp}
  #wrapper{
    display:none;
    background:#f00 !important;
  }
  `
  ;

const headerMathJax = `
<script>
  MathJax.Hub.processSectionDelay = 0;
  MathJax.Hub.Config({
    imageFont: null,
    showMathMenu: false,
    messageStyle: "none",
    skipStartupTypeset: false,
    showProcessingMessages: false,
    jax: ["input/TeX", "output/HTML-CSS"],
    'HTML-CSS': {
      mtextFontInherit: true,
    },
    tex2jax: {
      preview: "none",
      inlineMath: [
        ['$','$'],['\\\\(','\\\\)'],['\\\\[','\\\\]'],['\\left(','\\right)'],['\\left|','\\right|']
      ],
      displayMath: [ ['$$','$$']], 
      processEscapes: true,
    }
  });
  MathJax.Hub.Queue(function () {
    document.getElementById('containerMain').style.display="none";
  });
  </script>
`;

const renderMathJaxPractice = (data, readonly = false) => {
  const { typeAnswer, typeView, question } = data;
  let html = ``;
  html += `
  <!DOCTYPE html>
  <html>
  <head>
    <title></title>
    <meta charset="utf8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE">
    <link rel="stylesheet" href="font47/css/font-awesome.min.css">
    <link rel="stylesheet" href="bootstrap.min.css" >
    <link rel="stylesheet" href="keypad.css">
    <style>${style}</style>
    <script src="jquery.min.js"></script>
    `;
  if (readonly == true) {
    html += `
      <script>  
        $(document).ready(function(){
          document.getElementById('containerMain').style.display="block";
        });
      </script>
      `;
  } else {
    html += `
      <script>  
      $(document).ready(function(){
        document.getElementById('containerMain').style.display="none";
        $('body').bind('copy paste',function(e) {
            e.preventDefault(); return false; 
        });
      });
      </script>
      `;
  }
  html += `<script>
      // from react native to webview
      document.addEventListener('message', function(e) {
        var data = e.data.split("###");
        var type = data[0];
        if(type == "senAnswer"){
          var answer = JSON.parse(data[1]);
          keypadToggler();
          document.getElementById('containerMain').style.display="block";
        }
      });
    </script>
    <script type="application/javascript">
        window.addEventListener('load', function() {
        }, false);
    </script>  
  </head>
  <body oncopy="return false" oncut="return false" onpaste="return false">
  `;
  html +=
    `<div class="template-default template-${data.template}">
          <div class="container-fluid">
            ${question || ''}
          </div>
        </div>
    ${getKeyPad(typeAnswer)}
    <script src="jqueryfastclick.js"></script>
    <script src="jquery-ui.min.js"></script>
    <script src="jquery.ui.touch-punch.min.js"></script>
      `;
  if (typeAnswer == 4 || typeAnswer == 5) {
    // Hiển thị dạng HTML input text
    if (typeView == 0) {
      html += getScriptHTMLInput(question, typeAnswer);
    }
    // Hiển thị dạng kéo thả sắp sếp
    if (typeView == 1) {
      html += getScriptPunchOrder(question);
    }
    // Hiển thị dạng đồ họa
    if (typeView == 2) {
      html += getScriptCanvas(question);
    }
    // Hiển thị dạng tô màu
    if (typeView == 3) {
      html += getScriptBackground(question);
    }
    //Hiển thị dạng kéo thả vào nhóm
    if (typeView == 4) {
      html += getScriptPunchTouch(question);
    }
    // Hiển thị dạng HTML input radio
    if (typeView == 5) {
      html += getScriptRadio(question);
    }
    // Hiển thị dạng HTML input checkbox
    if (typeView == 6) {
      html += getScriptCheckbox(question);
    }
  }
  html += `<div id="containerMain" style="background:rgba(0,0,0,0);overflow: auto;position: fixed;top:0;left: 0;right:0;bottom: 0;"></div>`;
  html += `
  </body >
  </html >`;
  return html;
}

//type_view = 0
function getScriptHTMLInput(question, typeAnswer) {
  html = ``;
  if (typeAnswer == 4) {
    html += `
        <script>
          var isKeyboard = false;
          var dataOptiontext = [];
          var text = "";
          var element = "";
            $('#mathplay-answer-1').fastClick(function(event){
            event.stopPropagation();
            let value = $(this).val();
            let type = $(this).attr('type');
            $(this).addClass('activeInput');
            text=value;
            element = this;
            if(type != 'radio'){
              let dataType = $(this).attr('data-type');
              switch(dataType){
                case 'number':
                  changeKey('keypadnumber');
                  break;
                case 'math-symbols':
                  changeKey('keypadsymbol');
                  break;
              case 'text':
                  changeKey('keypadquerty');
              break;
              }
            }
          });

          $('#keypadToggler').fastClick(function(){
            keypadToggler();
          });

          $('.template-default').fastClick(function(){
            keypadToggler();
          });

          let numberKey = $('#keypad ul a').length;
          var keyboardArr=[];

          for(let i=0;i<numberKey;i++){
            $('#key-'+(1+i)).fastClick(function(){
                let keyCode = $(this).text();
                text = text + keyCode;
                $(element).val(text);
                dataOptiontext[0] = text;
                $('.keynumber').removeClass('activeKeyboard');
               $(this).addClass('activeKeyboard');
               window.postMessage("changeOneText###"+JSON.stringify(dataOptiontext));
            });
          }

          for(let i=1;i<=3;i++){
            $('#key-delete-'+i).fastClick(function(){
                deleteKey();
            });
          }

          for(let i=1;i<=6;i++){
            $('#change-key-'+i).fastClick(function(){
                let type = $(this).attr('key-change');
                changeKey(type);
            });
          }

          for(let i=1;i<=7;i++){
            $('#symbol-'+i).fastClick(function(){
                let val = $(this).attr('symbol-val');
                symbolbinding(val);
            });
        }

        for(let i=1;i<=27;i++){
            $('#charator-'+i).fastClick(function(){
                let val = $(this).text();
                bindingkeycode(val);
            });
        }

        function deleteKey(){
            text = text.substring(0, text.length - 1);
            $(element).val(text);
            dataOptiontext[0] = text;
            window.postMessage("changeOneText###"+JSON.stringify(dataOptiontext));
        }

        function bindingkeycode(textvalue){
            let keycode = textvalue == 'space' ? ' ' : textvalue;
            text = text + keycode;
            $(element).val(text);
            dataOptiontext[0] = text;
            window.postMessage("changeOneText###"+JSON.stringify(dataOptiontext));
        }
        
        function bindingkey(event) {
            let keyCode = event.target.innerText;
            text = text + keyCode;
            $(element).val(text);
            dataOptiontext[0] = text;
            window.postMessage("changeOneText###"+JSON.stringify(dataOptiontext));
        }

          function symbolbinding(symbol){
            symbol = symbol.replace('equal', '=' );
            symbol = symbol.replace( 'lessthan', '<' );
            symbol = symbol.replace( 'greaterthan', '>' );
            symbol = symbol.replace( 'plus', '+' );
            symbol = symbol.replace( 'minus', '-' );
            symbol = symbol.replace( 'divide', ':' );
            symbol = symbol.replace( 'multi', '×' );
            text = text + symbol;
            $(element).val(text);
            dataOptiontext[0] = text;
            window.postMessage("changeOneText###"+JSON.stringify(dataOptiontext));
          }

        </script>
      `;
  }
  if (typeAnswer == 5) {
    html += `
        <script>
        var text = "";
        var element = "";
        var keyInput = "";
        var numItemText = $('input[type="text"][disabled!="disabled"]').length;
        var dataTextAnswer = [];
        if (numItemText > 0) {
          for (let i = 0; i < numItemText; i++) {
            var el = $('#mathplay-answer-'+( 1 + i));
            if(el){
              el.fastClick(function(event) {
                event.stopPropagation();
                $('.keynumber').removeClass('activeKeyboard');
                let value = $(this).val();
                $('input').removeClass('activeInput');
                $(this).addClass('activeInput');
                text=value;
                element = this;
                keyInput = i;
                let dataType = $(this).attr('data-type');
                  switch(dataType){
                    case 'number':
                      changeKey('keypadnumber');
                      break;
                    case 'math-symbols':
                      changeKey('keypadsymbol');
                      break;
                  case 'text':
                      changeKey('keypadquerty');
                  break;
                }
              });
            }
          }
      }
      $('#keypadToggler').fastClick(function(){
        keypadToggler();
      });

      $('.template-default').fastClick(function(){
        keypadToggler();
      });

    let numberKey = $('#keypad ul a').length;
    var keyboardArr=[];

    for(let i=0;i<numberKey;i++){
        $('#key-'+(1+i)).fastClick(function(){
            let keyCode = $(this).text();
            text = text + keyCode;
            $(element).val(text);
            dataTextAnswer[keyInput] = text;
            $('.keynumber').removeClass('activeKeyboard');
            $(this).addClass('activeKeyboard');
            // window.postMessage("changeOneText###"+JSON.stringify(dataTextAnswer));
            window.postMessage("changeText###"+numItemText+"###"+JSON.stringify(dataTextAnswer));
        });
    }

    for(let i=1;i<=3;i++){
        $('#key-delete-'+i).fastClick(function(){
            deleteKey();
        });
    }

    for(let i=1;i<=6;i++){
        $('#change-key-'+i).fastClick(function(){
            let type = $(this).attr('key-change');
            changeKey(type);
        });
    }

    for(let i=1;i<=7;i++){
        $('#symbol-'+i).fastClick(function(){
            let val = $(this).attr('symbol-val');
            symbolbinding(val);
        });
    }

    for(let i=1;i<=27;i++){
        $('#charator-'+i).fastClick(function(){
            let val = $(this).text();
            bindingkeycode(val);
        });
    }

    function deleteKey(){
        text = text.substring(0, text.length - 1);
        $(element).val(text);
        dataTextAnswer[keyInput] = text;
        window.postMessage("changeText###"+numItemText+"###"+JSON.stringify(dataTextAnswer));
    }

    function bindingkeycode(textvalue){
        let keycode = textvalue == 'space' ? ' ' : textvalue;
        text = text + keycode;
        $(element).val(text);
        dataTextAnswer[keyInput] = text;
        window.postMessage("changeText###"+numItemText+"###"+JSON.stringify(dataTextAnswer));
    }

    function bindingkey(event) {
        let keyCode = event.target.innerText;
        text = text + keyCode;
        $(element).val(text);
        dataTextAnswer[keyInput] = text;
        window.postMessage("changeText###"+numItemText+"###"+JSON.stringify(dataTextAnswer));
    }

      function symbolbinding(symbol){
        symbol = symbol.replace('equal', '=' );
        symbol = symbol.replace( 'lessthan', '<' );
        symbol = symbol.replace( 'greaterthan', '>' );
        symbol = symbol.replace( 'plus', '+' );
        symbol = symbol.replace( 'minus', '-' );
        symbol = symbol.replace( 'divide', ':' );
        symbol = symbol.replace( 'multi', '×' );
        text = text + symbol;
        $(element).val(text);
        dataTextAnswer[keyInput] = text;
        window.postMessage("changeText###"+numItemText+"###"+JSON.stringify(dataTextAnswer));
      }

      var element = $('.mathplay-question');
      var dataOptionText = [];
      
      for(let j = 0;j < element.length; j++){
        $('#mathplay-answer-'+(1 + j)+'-correct').parent().fastClick(function() {
            dataOptionText[j] = $(this).find('input').val();
            console.log(dataOptionText);
            $(this).find('label').css({"background":"#1e9f98"});
            $('#mathplay-answer-'+(1 + j)+'-wrong').parent().find('label').css({"background":"#ff7300"});
            window.postMessage("selectMulti###"+element.length+"###"+JSON.stringify(dataOptionText));
        });
    
        $('#mathplay-answer-'+(1 + j)+'-wrong').parent().fastClick(function() {
              dataOptionText[j] = $(this).find('input').val();
              console.log(dataOptionText);
              $(this).find('label').css({"background":"#1e9f98"});
              $('#mathplay-answer-'+(1 + j)+'-correct').parent().find('label').css({"background":"#ff7300"});
              window.postMessage("selectMulti###"+element.length+"###"+JSON.stringify(dataOptionText));
          });
      }

    </script>`;
  }
  html += `
    <script>
    $('input').prop('readonly', true);
    var item = $('input[name="answer"]');
    var numItems = item.length;
    var dataOptiontext = [];
    var arrTest = [];
    for(let i = 0; i < numItems; i++){
        $('#mathplay-answer-'+(1 + i)).parent().fastClick(function(){
            dataOptiontext[0] = $(this).find('input').attr('value');
            if($(this).parent().find('label').hasClass('form-check-label') ){
                $(this).parent().find('label').removeClass('activeButton');
                $(this).find('label').addClass('activeButton');
            }
            else if($(this).hasClass('form-check-input')){
            }
            if($(this).parent().find('label').hasClass('item-content')){
                $('.item-content').parent().find('label').css('border','1px solid #08f4f4');
                $(this).find('label').css('border','3px solid #08f4f4');
            }
            window.postMessage("selectOne###"+JSON.stringify(dataOptiontext));
        });
    }

    function changeKey(type) {
        $('.keypad-toggler').removeClass('hidden');
        if (type == 'keypadquerty') {
            $('#number-keypad').addClass('hidden');
            $('#querty-keypad').removeClass('hidden');
            $('#symbol-keypad').addClass('hidden');
            window.postMessage("showButtonAnswer###0");
            $('.template-default').addClass('scrollKey');
        }
        if (type == 'keypadnumber') {
            $('#number-keypad').removeClass('hidden');
            $('#querty-keypad').addClass('hidden');
            $('#symbol-keypad').addClass('hidden');
            window.postMessage("showButtonAnswer###0");
            $('.template-default').addClass('scrollKey');
        }
        if (type == 'keypadsymbol') {
            $('#number-keypad').addClass('hidden');
            $('#querty-keypad').addClass('hidden');
            $('#symbol-keypad').removeClass('hidden');
            window.postMessage("showButtonAnswer###0");
            $('.template-default').addClass('scrollKey');
        }
    } 

    function keypadToggler() {
        $('#number-keypad').addClass('hidden');
        $('#querty-keypad').addClass('hidden');
        $('#symbol-keypad').addClass('hidden');
        $('.keypad-toggler').addClass('hidden');
        $('.keynumber').removeClass('activeKeyboard');
        window.postMessage("showButtonAnswer###1");
        $('.template-default').removeClass('scrollKey');
        $('input').removeClass('activeInput');
    }
  </script>  
  `;
  return html;
}

function getScriptPunchOrder() {
  var html = ``;
  html += `
  <script>
    $(document).ready(function(){
      var dataOptionText = [];
      $( ".dragula" ).sortable({cancel:true});
      $( ".dragula" ).disableSelection();
      $( ".dragula" ).bind( "sortstop", function(event, ui) {
        var element = $(event.currentTarget).find('button');
        if(element.length > 0){
          for(var k = 0;k < element.length; k++){
            dataOptionText[k] = element[k].innerText;
          }
        }
        window.postMessage("dagularOrder###"+JSON.stringify(dataOptionText));
      });
    });
  </script>`;
  return html;
}

//To mau
function getScriptBackground(question) {
  html = `<script type="text/javascript">
  let element = $('.mathplay-select');
  var color = '';
  var value = '';
  for(let j = 0;j < element.length; j++){
    $('#mathplay-select-'+(1 + j)).fastClick( function() {
        color = $( this ).css( "background-color" );
        value = $( this ).attr("value");
     });
  }

  var dataOptionText = [];
  let elementAnswer = $('.mathplay-answer');

  for(let j = 0;j < elementAnswer.length; j++){
    $('#mathplay-answer-'+(1 + j)).fastClick( function() {
        if(value != ""){
          $(this).css( "background-color",color );
          dataOptionText[j] = value; 
          window.postMessage("canvasColor###"+JSON.stringify(dataOptionText));
        }
     });
  }
</script>`;
  return html;
}

function getScriptRadio(question) {
  html = ``;
  html += `<script>
        var element = $('.mathplay-question');
        var dataOptionText = [];
        for(let j = 0;j < element.length; j++){
            $('#mathplay-answer-'+(1 + j)+'-correct').parent().fastClick(function() {
                $('#mathplay-answer-'+(1 + j)+'-wrong').parent().find('label').removeClass('activeButton');
                $(this).find('label').addClass('activeButton');
                dataOptionText[j] = $(this).find('input').attr('value');
                console.log(dataOptionText);
                window.postMessage("selectMulti###"+element.length+"###"+JSON.stringify(dataOptionText));
            });

            $('#mathplay-answer-'+(1 + j)+'-wrong').parent().fastClick( function() {
                $('#mathplay-answer-'+(1 + j)+'-correct').parent().find('label').removeClass('activeButton');
                $(this).find('label').addClass('activeButton');
                dataOptionText[j] = $(this).find('input').attr('value');
                console.log(dataOptionText);
                window.postMessage("selectMulti###"+element.length+"###"+JSON.stringify(dataOptionText));
            });
        }
  </script>`;
  return html;
}

function getScriptCanvas() {
  return `
    <script type="text/javascript" src="jsplumb.min.js"></script>
    <script>
    window.onload = function() {
    var leftPointer = $('.left-pointer');
    var rightPointer = $('.right-pointer');
    var resetButton = $('#reset');
    var jsp = jsPlumb.getInstance();
    var sourceId = '';
    var targetId = '';
    var sourceArray = [];
    var targetArray = [];
    var valueL = '';
    var valueRight = '';
    var dataOptionText = [];
    var arrLeftPointerId = [];
    var arrRightPointerId = [];

    var arrLeftPointer = [];
    for (let i = 0; i < leftPointer.length; i++) {
        arrLeftPointer[i] = $('.left-pointer')[i];
        arrLeftPointerId[i] = arrLeftPointer[i].getAttribute('id');
    }

    var arrRightPointer = [];
    for (let i = 0; i < leftPointer.length; i++) {
        arrRightPointer[i] = $('.right-pointer')[i];
        arrRightPointerId[i] = arrRightPointer[i].getAttribute('id');
    }

    arrLeftPointer.forEach(function(item, i) {
        if (arrLeftPointer[i]) {
            $('#'+arrLeftPointerId[i]).fastClick(function(event){
                sourceId = this.getAttribute('id');
                valueLeft = i + 1;
                handleClick();
            });
        }
        if (arrRightPointer[i]) {
             $('#'+arrRightPointerId[i]).fastClick(function(event){
                 targetId = this.getAttribute('id');
                 valueRight = i + 1;
                handleClick();
            });
        }
    });

    resetButton.fastClick( function() {
        jsp.reset();
        sourceArray = [];
        targetArray = [];
        dataOptionText = [];
        sourceId = '';
        targetId = '';
    });

    function handleClick(i) {
        connectJsplumb();
    }

    function connectJsplumb() {
        if (targetId != '' && sourceId != '') {
            if (sourceArray.indexOf(sourceId) == -1 && targetArray.indexOf(targetId) == -1) {
                jsp.connect({
                    connector: ['Straight', { stub: 5 }],
                    source: sourceId,
                    target: targetId,
                    anchor: ['Right', 'Left'],
                    paintStyle: { stroke: '#456', strokeWidth: 1 },
                    endpoint: ['Dot', { radius: 3, hoverClass: 'myEndpointHover' }, { cssClass: 'myCssClass' }]

                });
                let key = valueLeft + "" + valueRight;
                dataOptionText.push(key);
                let dataArr = dataOptionText.sort();
                console.log(dataArr);
                sourceArray.push(sourceId);
                targetArray.push(targetId);
                targetId = '';
                sourceId = '';
                window.postMessage("dataJsplumb" + "###" + JSON.stringify(dataArr));
            }
        }
    }
    };
    </script>
  `;
}

function getScriptPunchTouch() {
  var html = ``;
  html += `
  <script>
  var elemenChange = document.getElementById("mathlplay-select-3");
  if(elemenChange){
    elemenChange.id = "mathplay-select-3";
  }
   $(document).ready(function() {
    $(".dragula img").draggable({
        revert : function(event, ui) {
            // on older version of jQuery use "draggable"
            // $(this).data("draggable")
            // on 2.x versions of jQuery use "ui-draggable"
            // $(this).data("ui-draggable")
            $(this).data("uiDraggable").originalPosition = {
                top : 0,
                left : 0
            };
            // return boolean
            return !event;
            // that evaluate like this:
            // return event !== false ? false : true;
        }
      });
      var dataOptionText = [];
      var dragularLength = $(".dragula img").length;
			var boxdragula = $(".box-dragula");
				for(let i=0; i<boxdragula.length; i++){
				$('#mathplay-select-'+(1+i)).droppable({
					drop: function(event, ui) {
						 let id = ui.draggable.attr("id");
						 let key = id.substr(-1);
             dataOptionText[key-1] = i+1;
             window.postMessage("dragular###"+dragularLength+"###"+JSON.stringify(dataOptionText));
					}
				});
			}
   });
  </script>
  `;

  return html;
}

const renderExplain = (data, template) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <title></title>
      <meta charset="utf8">
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
      <META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE">
      <link rel="stylesheet" href="bootstrap.min.css" >
      <style>${style}</style>
  </head>
  <body>
    <div class="template-default template-${template}">
      <div class="container-fluid">
        ${data}
      </div>
    </div>
  </body>
  </html>
  `;
}

function getScriptCheckbox() {
  return `
    <script>
      $(document).ready(function() {
        ngOnChanges();

        $('#reset').click(function(e){
          resetSelected(e);
        })
    });

    function ngOnChanges() {
        const inputs = document.getElementsByClassName('mathplay-answer');
        const tRow = document.getElementsByClassName('tRow');
        const tCell = document.getElementsByClassName('tCell');
        const resetBtn = document.querySelector('#reset');
        window['numberCellInRow'] = tRow[0].children.length;
        window['listArrayInputs'] = [];
        window['tCell'] = tCell[0];
        window['numberAlphabet'] = 0;
        window['arrayValue'] = [];
        // add listen event click for check input
        window['arrayId'] = [];
        for (let i = 0; i < inputs.length; i++) {
            window['listArrayInputs'].push(inputs[i].id);
            if (inputs[i].classList.contains('begin')) {
                window['beginInput'] = inputs[i];
                window['arrayValue'][0] = inputs[i].value;
                window['arrayId'][0] = inputs[i].getAttribute('id');
                inputs[i].classList.add('lock');
                inputs[i].checked = true;
            }
            if (inputs[i].classList.contains('begin1')) {
                window['beginInput1'] = inputs[i];
                window['arrayValue'][1] = inputs[i].value;
                inputs[i].classList.add('lock');
                inputs[i].checked = true;
            }
            inputs[i].addEventListener('click', this.checkBoxSelected.bind({
                element: inputs[i]
            }));
        }
        ngAfterViewInit();
    }

    function resetSelected(event) {
      const tableContent = document.getElementById('table-content');
      const cavasTableContent = tableContent.children[0].children[0];
      const tCell = document.getElementsByClassName('tCell');
      window['tCell'] = tCell[0];
      window['numberAlphabet'] = 1;
      const canvas = window['canvas'];
      canvas.width = cavasTableContent.offsetWidth;
      canvas.height = cavasTableContent.offsetHeight;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const inputs = document.querySelectorAll('.mathplay-answer');
      window['arrayValue'] = [];
      window['arrayId'] = [];
      window['beginInput'] = null;
      window['beginInput1'] = null;
      for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].classList.contains('lock')) {
          inputs[i].checked = false;
          inputs[i].parentElement.removeAttribute('data-contentafter');
          inputs[i].parentElement.children[1].innerHTML="";
        }
        if (inputs[i].classList.contains('begin')) {
          window['beginInput'] = inputs[i];
          window['arrayId'][0] = inputs[i].getAttribute('id');
          window['arrayValue'][0] = inputs[i].value;
        }
        if (inputs[i].classList.contains('begin1')) {
          window['numberAlphabet'] = 2;
          window['beginInput1'] = inputs[i];
          window['arrayValue'][1] = inputs[i].value;
          window['arrayId'][1] = inputs[i].id;
        }
        if (inputs[i].classList.contains('lock2')) {
          inputs[i].classList.remove('lock2');
        }
      }
      setTimeout(() => {
        if (window['beginInput1']) {
          const el = window['beginInput1'];
          // const indexBeginId = window['arrayId'].length - 1;
          const beginId = window['arrayId'][0];
          const beginIdIndex = window['listArrayInputs'].indexOf(beginId);
          const numberOrderLast = beginIdIndex + 1;
          const yAxisPre = Math.ceil(numberOrderLast / window['numberCellInRow']);
          const xAxisPre = beginIdIndex - ( window['numberCellInRow'] * (yAxisPre - 1));

          const index = window['listArrayInputs'].indexOf(el.id);
          const numberOrder = index + 1;
          const yAxis = Math.ceil(numberOrder / window['numberCellInRow']);
          const xAxis = index - ( window['numberCellInRow'] * (yAxis - 1));

          ctx.beginPath();
          ctx.moveTo(window['tCell'].offsetWidth * xAxisPre, window['tCell'].offsetHeight * yAxisPre);
          ctx.lineTo(window['tCell'].offsetWidth * xAxis, window['tCell'].offsetHeight * yAxis);
          ctx.lineWidth = 4;
          ctx.strokeStyle = '#000';
          ctx.stroke();
        }
      }, 0);
    }

    function checkBoxSelected(event) {
        const el = event.srcElement;
        const value = el.value;
        const indexLastId = window['arrayId'].length - 1;
        const lastId = window['arrayId'][indexLastId];
        if (el.classList.contains('lock') && lastId === el.id) {
            event.preventDefault();
            return false;
        }
        el.classList.add('lock2');
        if (el.classList.contains('lock2')) {
            el.checked = true;
        }
        if (!el.parentElement.getAttribute('data-contentafter')) {
            window['numberAlphabet'] += 1;
            el.parentElement.setAttribute('data-contentafter', String.fromCharCode(window['numberAlphabet'] + 64));
            el.parentElement.children[1].innerHTML=String.fromCharCode(window['numberAlphabet'] + 64);
        }
        const lastIdIndex = window['listArrayInputs'].indexOf(lastId);
        const numberOrderLast = lastIdIndex + 1;
        const yAxisPre = Math.ceil(numberOrderLast / window['numberCellInRow']);
        const xAxisPre = lastIdIndex - (window['numberCellInRow'] * (yAxisPre - 1));

        const index = window['listArrayInputs'].indexOf(el.id);
        const numberOrder = index + 1;
        const yAxis = Math.ceil(numberOrder / window['numberCellInRow']);
        const xAxis = index - (window['numberCellInRow'] * (yAxis - 1));

        const canvas = window['canvas'];
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(window['tCell'].offsetWidth * xAxisPre, window['tCell'].offsetHeight * yAxisPre);
        ctx.lineTo(window['tCell'].offsetWidth * xAxis, window['tCell'].offsetHeight * yAxis);
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#000';
        ctx.stroke();
        setTimeout(() => {
            window['arrayId'].push(el.id);
            const indexValue = window['arrayValue'].indexOf(el.value);
            if (indexValue === -1 || el.value === window['arrayValue'][0]) {
                window['arrayValue'].push(el.value);
                console.log(window['arrayValue']);
                window.postMessage("canvasPoint###"+JSON.stringify(window['arrayValue']));
            }
        }, 0);
    }

    function drawline(el) {
        const indexLastId = window['arrayId'].length - 1;
        const lastId = window['arrayId'][indexLastId];
        const lastIdIndex = window['listArrayInputs'].indexOf(lastId);
        const numberOrderLast = lastIdIndex + 1;
        const yAxisPre = Math.ceil(numberOrderLast / window['numberCellInRow']);
        const xAxisPre = lastIdIndex - (window['numberCellInRow'] * (yAxisPre - 1));

        const index = window['listArrayInputs'].indexOf(el.id);
        const numberOrder = index + 1;
        const yAxis = Math.ceil(numberOrder / window['numberCellInRow']);
        const xAxis = index - (window['numberCellInRow'] * (yAxis - 1));

        const canvas = window['canvas'];
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(window['tCell'].offsetWidth * xAxisPre, window['tCell'].offsetHeight * yAxisPre);
        ctx.lineTo(window['tCell'].offsetWidth * xAxis, window['tCell'].offsetHeight * yAxis);
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#000';
        ctx.stroke();
        setTimeout(() => {
          window['arrayId'].push(el.id);
        }, 0);
    }

    function ngAfterViewInit() {
        const tableContent = document.getElementById('table-content');
        const cavasTableContent = tableContent.children[0].children[0];
        const canvas = document.createElement('canvas');
        window['canvas'] = canvas;
        canvas.id = 'CanvasLayer';
        canvas.width = cavasTableContent.offsetWidth;
        canvas.height = cavasTableContent.offsetHeight;
        canvas.style.zIndex = '-1';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        cavasTableContent.appendChild(canvas);

        window['numberAlphabet'] = 1;
        window['beginInput'].parentElement.setAttribute('data-contentafter', 'A');
        window['beginInput'].parentElement.children[1].innerHTML='A';
        if (window['beginInput1']) {
            drawline(window['beginInput1']);
            window['numberAlphabet'] = 2;
            window['beginInput1'].parentElement.setAttribute('data-contentafter', 'B');
            window['beginInput1'].parentElement.children[1].innerHTML='B';
        }
    }
  </script>
  `;
}

function getKeyPad(typeAnswer) {
  let html = '';
  if (typeAnswer == 4 || typeAnswer == 5) {
    html += `
 <div id="keypad" #keypad>
 <div class="keypad-toggler hidden" id="keypadToggler"><span class="gameSprite keypadclose fa fa-chevron-down"></span></div>
 <div class="keypad-container hidden numberKeypad clearfix " id="number-keypad" #keypadnumber>
     <div class="calcultorContainer">
         <ul class="keypad calcultor clearfix list-unstyled">
             <li class="clearfix">
                 <ul class="clearfix list-unstyled">
                     <li class="lastChild"><a class="keyDelete" id="key-delete-1"><span class="gameSprite keypadclose fa fa-long-arrow-left"></span></a></li>
                     <li class="lastChild"><a id="change-key-3" key-change="keypadquerty" class="swap qwertykeypad">abc</a></li>
                     <li class="lastChild"><a id="change-key-4" key-change="keypadsymbol" class="swap symbolkeypad">+/-</a></li>
                 </ul>
             </li>
             <li class="clearfix">
                 <ul class="clearfix list-unstyled">
                     <li><a class="keynumber" id="key-1">.</a></li>
                     <li><a class="keynumber" id="key-2">,</a></li>
                     <li><a class="keynumber" id="key-3">0</a></li>
                 </ul>
             </li>
             <li class="clearfix">
                 <ul class="clearfix list-unstyled">
                     <li><a class="keynumber" id="key-4">3</a></li>
                     <li><a class="keynumber" id="key-5">6</a></li>
                     <li><a class="keynumber" id="key-6">9</a></li>
                 </ul>
             </li>
             <li class="clearfix">
                 <ul class="clearfix list-unstyled">
                     <li><a class="keynumber" id="key-7">2</a></li>
                     <li><a class="keynumber" id="key-8">5</a></li>
                     <li><a class="keynumber" id="key-9">8</a></li>
                 </ul>
             </li>
             <li class="clearfix">
                 <ul class="clearfix list-unstyled">
                     <li><a class="keynumber" id="key-10">1</a></li>
                     <li><a class="keynumber" id="key-11">4</a></li>
                     <li><a class="keynumber" id="key-12">7</a></li>
                 </ul>
             </li>
         </ul>
     </div>
 </div>
 <div class="keypad-container hidden" id="querty-keypad" #keypadquerty>
     <ul class="keypad list-unstyled biggerKeypad">
         <li class="clearfix">
             <ul class="clearfix list-unstyled">
                 <li class="lastChild"><a class="keyDelete" id="key-delete-2"><span class="gameSprite keypadclose fa fa-long-arrow-left"></span></a></li>
                 <li><a id="charator-1" charator-val="p" >p</a></li>
                 <li><a id="charator-2" charator-val="o" >o</a></li>
                 <li><a id="charator-3" charator-val="i" >i</a></li>
                 <li><a id="charator-4" charator-val="u" >u</a></li>
                 <li><a id="charator-5" charator-val="p" >y</a></li>
                 <li><a id="charator-6" charator-val="p" >t</a></li>
                 <li><a id="charator-7" charator-val="p" >r</a></li>
                 <li><a id="charator-8" charator-val="p" >e</a></li>
                 <li><a id="charator-9" charator-val="p" >w</a></li>
                 <li><a id="charator-10" charator-val="p" >q</a></li>
             </ul>
         </li>
         <li class="clearfix">
             <ul class="clearfix list-unstyled">
                 <li class="lastChild keypad-number"><a id="change-key-5" key-change="keypadnumber"  class="swap numberKeypadBtn">123</a></li>
                 <li><a id="charator-11" charator-val="p" >l</a></li>
                 <li><a id="charator-12" charator-val="p" >k</a></li>
                 <li><a id="charator-13" charator-val="p" >j</a></li>
                 <li><a id="charator-14" ocharator-val="p" >h</a></li>
                 <li><a id="charator-15" charator-val="p" >g</a></li>
                 <li><a id="charator-16" charator-val="p" >f</a></li>
                 <li><a id="charator-17" charator-val="p" >d</a></li>
                 <li><a id="charator-18" charator-val="p" >s</a></li>
                 <li><a id="charator-19" charator-val="p" >a</a></li>
             </ul>
         </li>
         <li class="clearfix">
             <ul class="clearfix list-unstyled">
                 <li class="lastChild"><a id="change-key-6" key-change="keypadsymbol" class="swap symbolkeypad">+/-</a></li>
                 <li><a onClick="uppercase()"><span class="gameSprite keypad-shift fa fa-arrow-up"></span></a></li>
                 <li><a id="charator-20" charator-val="p" >m</a></li>
                 <li><a id="charator-21" charator-val="p" >n</a></li>
                 <li><a id="charator-22" charator-val="p" >b</a></li>
                 <li class="keypad-space"><a id="charator-23" charator-val="p" >space</a></li>
                 <li><a id="charator-24" charator-val="p" >v</a></li>
                 <li><a id="charator-25" charator-val="p" >c</a></li>
                 <li><a id="charator-26" charator-val="p" >x</a></li>
                 <li><a id="charator-27" charator-val="p" >z</a></li>
             </ul>
         </li>
     </ul>
 </div>
 <div class="keypad-container numberKeypad hidden clearfix" id="symbol-keypad" #keypadsymbol>
     <div class="calcultorContainer">
         <ul class="keypad calcultor clearfix list-unstyled">
             <li class="clearfix">
                 <ul class="clearfix list-unstyled">
                     <li class="lastChild"><a class="keyDelete" id="key-delete-3"><span class="gameSprite keypadclose fa fa-long-arrow-left"></span></a></li>
                     <li class="lastChild"><a id="change-key-1" key-change="keypadquerty" class="swap qwertykeypad">abc</a></li>
                     <li class="lastChild"><a id="change-key-2" key-change="keypadnumber" class="swap numberKeypadBtn">123</a></li>
                 </ul>
             </li>
             <li class="clearfix">
                 <ul class="clearfix list-unstyled">
                     <li><a id="symbol-1" symbol-val="equal" [innerHtml]="equal | safeHtml">=</a></li>
                     <li><a id="symbol-2" symbol-val="lessthan" [innerHtml]="lessthan | safeHtml">
                             <</a> </li> <li><a id="symbol-3" symbol-val="greaterthan" [innerHtml]="greaterthan | safeHtml">></a></li>
                 </ul>
             </li>
             <li class="clearfix">
                 <ul class="clearfix list-unstyled">
                     <li><a id="symbol-4" symbol-val="plus" [innerHtml]="plus | safeHtml">&plus;</a></li>
                     <li><a id="symbol-5" symbol-val="minus" [innerHtml]="minus | safeHtml">&minus;</a></li>
                     <li><a id="symbol-6" symbol-val="divide" [innerHtml]="divide | safeHtml">&divide;</a></li>
                 </ul>
             </li>
             <li class="clearfix">
                 <ul class="clearfix list-unstyled">
                     <li><a id="symbol-7" symbol-val="multi" [innerHtml]="multi | safeHtml">&times;</a></li>
                 </ul>
             </li>
         </ul>
     </div>
 </div>
</div>`
  }
  return html;
}

module.exports = {
  renderMathJaxPractice,
  renderExplain
};
