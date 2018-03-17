$(function(){
  $.ajax({url:'a42580.json',success:function(d){
    $('#movie').text(d.title);
    $('#screen').text(d.screen);
    $('#rating').text(d.rating);
    //var mnthList=['NA','Jan','Feb','Mar'];
    //var tdt=d.date.substr(8,2)+' '+mnthList[parseInt(d.date.substr(5,2))]+d.date.substr(0,4);
    
    // var tdt=[
    //   d.date.substr(8,2),
    //   ['NA','Jan','Feb','Mar'][parseInt(d.date.substr(5,2))],
    //   d.date.substr(0,4)
    // ];
    var dtd=new Date(d.date);
    var tdt=[    
      dtd.toLocaleString('en',{weekday:'long'}),
      d.date.substr(8,2),
      dtd.toLocaleString('en',{month:'long'}),
      d.date.substr(0,4),
      '@',
      d.date.substr(11,5)
    ];
    $('#show-time').text(tdt.join(' '));
    
    $('#movie-poster').attr('src', d.image);

    var table=$('#theatreTab');

    for(var i=0;i<d.tmap.length;i++){
      //console.log(d.tmap[i]);
      var tr=$('<tr/>').appendTo(table);
      tr.append($('<td/>',{text:d.rowLabels[i]}));
      var seatNumber=1;
      for(var j=0;j<d.tmap[i].length;j++){
        // var td=$('<td/>',{text:d.tmap[i][j]}).appendTo(tr);
        var td=$('<td/>').appendTo(tr);
        td.addClass(d.tmap[i][j]);
        td.addClass(d.umap[i][j]);
        // Last Stage of Numbering the seats
        if(d.tmap[i][j]!==' '){
        td.append($('<div/>',{text:seatNumber}));
        seatNumber++;
        }
    }
    tr.append($('<td/>',{text:d.rowLabels[i]}));
  }


    // var t = $('<table/>').appendTo('#theatre');
    // // The row loop - each step in this loop deals with one row of the
    // // table and one row of the table
    // for(var i=0;i<d.rowLabels.length;i++){
    //   // Create a table row
    //   var tr = $('<tr/>')
    //     .append($('<th/>',{text:d.rowLabels[i]}))
    //     .appendTo(t);
    //   // This sample program deals with the first two seats
    //   // It would be much better to use an inner loop

    //   // Deal with the first seat in the row
    //   // umap indicates if the seat is used
    //   // X indicates taken by someone else
    //   // O indicates available
    //   // M indicates my seat
    //   // space indicates no seat
    //   var u0 = d.umap[i].charAt(0);
    //   // tmap indicates the type of seat
    //   // L or R for left or right sofa, A for armchair, space for none
    //   var t0 = d.tmap[i].charAt(0);
    //   var td = $('<td/>');
    //   if (t0==='L')
    //     td.addClass('left-sofa');
    //   if (t0==='R')
    //     td.addClass('right-sofa');
    //   if (t0==='A')
    //     td.addClass('armchair');
    //   td.text(u0);
    //   tr.append(td);

    //   // Now deal with the second seat in the row
    //   var u1 = d.umap[i].charAt(1);
    //   var t1 = d.tmap[i].charAt(1);
    //   var td1 = $('<td/>');
    //   if (t1==='L')
    //     td1.addClass('left-sofa');
    //   if (t1==='R')
    //     td1.addClass('right-sofa');
    //   if (t1==='A')
    //     td1.addClass('armchair');
    //   td1.text(u1);
    //   tr.append(td1);
    // }

    // All of the seats are in place
    // Now define the action to be taken when the user clicks on
    // a seat
    // $('td').click(function(){
    //   if ($(this).text()==='X')
    //     alert('That seat is taken already');
    // });

    $('td').click(function(){
      // if ($(this).hasClass('X'))
      if ($(this).hasClass('O')){
        //alert('That seat is taken already');
        $(this).addClass('M');
        $(this).removeClass('O');
      
      if($(this).hasClass('L')){
        $(this).next().addClass('M');
        $(this).next().removeClass('O');

        var rowName=document.getElementsByTagName('td');
        console.log(rowName);
      }  
      if($(this).hasClass('R')){
        $(this).prev().addClass('M');
        $(this).prev().removeClass('O');
      }  
      }
      else if ($(this).hasClass('M')){
        $(this).addClass('O');
        $(this).removeClass('M'); 
        
        if($(this).hasClass('L')){
          $(this).next().removeClass('M');
          $(this).next().addClass('O');
          
        }  
        if($(this).hasClass('R')){
          $(this).prev().removeClass('M');
          $(this).prev().addClass('O');
          
        }  

        
      }
      

      

      $('#feedbackBtn').trigger('click');
        //console.log("You have",$('.M').length,"seats booked");
       
    });

  //  $('<button/>', {text:'feedback',id:'feedbackBtn',click:function(){
  //   //console.log("You have",$('.M').length,"seats booked");
  //   $('#feedback').text("You have "+$('.M').length+" seats booked");
  //  }}).appendTo('body');

  $('<button/>', {text:'feedback',id:'feedbackBtn',css:{display:'none'},click:function(){
  $('#feedback').text("You have "+$('.M').length+" seats booked ");
  }}).appendTo('body');

  $('#feedbackBtn').trigger('click');
  }});
  
});
