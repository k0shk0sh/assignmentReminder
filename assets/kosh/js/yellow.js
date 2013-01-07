
$('#page-home-yellow').live("pageinit", function() {

	  var datetime = $('#mydate2');
      var title = $('#title');
      var desc = $('#desc');
      
      var splitdatetime = null;
      var date = null;
      var time = null;
      
      var start_date= new Date();
      var end_date='9999-12-20';
      
      var today = new Date();
	  var dd = today.getDate();
	  var mm = today.getMonth()+1;

	  var yyyy = today.getFullYear();
	  if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} var today = yyyy+'-'+mm+'-'+dd;
      var db = window.openDatabase("reminder", "1.0", "reminder db", 1024*1024);
       db.transaction(function(tx) {
          tx.executeSql('create table if not exists events (date date, time text, title text, desc text)');
       }, errorCB, successCB);       
       db.transaction(function(tx) {
          tx.executeSql('select * from events where date >="'+today+'" and date <= "'+end_date+'"order by date;', [], displayEvents);
       }, errorCB, successCB); 
      
      $('#create_new_btn').click( function() { 
       	 $.mobile.changePage($('#page-new-event'), {transition:"slide", changeHash: false
 });
      });
	        $('#options').click( function() { 
			  var event_title = this.id;

			 	  $('<div>').simpledialog2({
    	mode: 'button',
    	headerText: 'Options',
		themeHeader:'e',
    	headerClose: true,
    	buttonPrompt: '',
    	buttons : {
      		'Delete All': { 
			
        		click: function () { 
 	  $('<div>').simpledialog2({
    	mode: 'button',
    	headerText: 'Options',
		themeHeader:'e',
    	headerClose: true,
		icon: false,
    	buttonPrompt: 'Are you sure you want to delete all?',
    	buttons : {
      		'Yes': { 
			
        		click: function () { 
        		db.transaction(function(tx) {
          		tx.executeSql('delete from events where title!="'+event_title+'";');
				location.reload(true);
}); 			

        	},
			theme:'e'
      },
	  
      		'No': {
       			 click: function () { 
				 
        		},
        	icon: "delete",
        	theme: "e"
      		}
    	}
  	})
        	},
			icon: false,
        	theme: "e"

      },
	  
      		'Contact Me': {
       			 click: function () { 
				 var mailto_link = 'mailto:kosh20111@gmail.com';
                 window.location.href =mailto_link;		  
        		},
        	icon: false,
        	theme: "e"
      		},
    		'Donate Me': {
     			 click: function () { 
				 var mailto_link = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=USWSDE3RUZMVU';
               window.location.href =mailto_link;		  
      		},
      	icon: false,
      	theme: "e"
    		},
			'Close': {
       			 click: function () { 
        		},
        	icon: "delete",
        	theme: "e"
      		}

    	}
  	})
 
      });
	  
    
      $('#save_btn').click( function() { 
      
      	if (datetime.val()=="" || datetime.val()==null){
		  $('<div>').simpledialog2({
    mode: 'blank',
    headerText: 'Opps',
					themeHeader:'e',

    blankContent : 
      "<ul data-role='popup'>Please Choose Your Date And Time</ul>"+
      // NOTE: the use of rel="close" causes this button to close the dialog.
      "<a rel='close' data-role='button' href='#'>Close</a>"
  })

      		return false;
      	}
      	
      	if (title.val()=="" || title.val()==null ){
		  $('<div>').simpledialog2({
    mode: 'blank',
    headerText: 'Opps',
	themeHeader:'e',
    blankContent : 
      "<ul data-role='popup'>Please Enter The Title</ul>"+
      "<a rel='close' data-role='button' href='#'>Close</a>"
  })
      		return false;
      	} else
      	splitdatetime = (datetime.val()).split("T");
      	date = splitdatetime[0]; 
		time = splitdatetime[1]; 
		
	    db.transaction(function(tx) {
          tx.executeSql('insert into events (date, time, title, desc) VALUES (?, ?, ?, ?)', [date, time, title.val(), desc.val().replace(/\r\n|\r|\n/g,'<br>')]);
        }, errorCB, successCB_event);
      });
      
      
		$(document).delegate('.event', 'click', function() {
 			var event_title = this.id;
 			db.transaction(function(tx) {
         	 tx.executeSql("select * from events where title='"+event_title+"'", [], function (tx, results) {
             for(var i=0; i < results.rows.length; i++) {
 			    msg = results.rows.item(i);		
 				$('<div>').simpledialog2({
    			mode: 'button',
				themeHeader:'e',
   				headerText: event_title,
    			headerClose: true,
			         	buttonPrompt: "<center><p> <span class='event_time'>"+msg['date']+'<br>'+msg['time']+"</span><br>"+msg['desc']+"</p></center>",
    	buttons : {
'Share Via..':  {click: function (){
                
			  $('<div>').simpledialog2({
    mode: 'button',
    headerText: 'Share',
	themeHeader:'e',
	  	buttonPrompt: 'Share Your Assignment',
    	buttons : {
      		'Via Email':{
 click: function (){
                kosh = "\n Subject Name: "+msg['title']+"\n Submission Date: "+msg['date']+'\n Submission Time If Any : '+msg['time']+'\n Description: '+msg['desc']+"\n\n Hi I Created this Assignment Reminder using Assignemnt Reminder\n download it now!! From Android Market & BlackBerry App World\n";
                		var subject = msg['title'];
                         var mail='email@example.com';
                         var mailto_link = 'mailto:?'+mail;
			             mailto_link += '&subject=' + encodeURIComponent(subject);
			             mailto_link += '&body=' + encodeURIComponent(kosh);
                         window.location.href =mailto_link;
						  
},
			icon: false,
        	theme: "e"

},

	 
      		'Via Twitters': {
       			 click: function () { 
				 kosh = "\n Subject Name: "+msg['title']+",\n Submission Date: "+msg['date']+',\n Submission Time If Any : '+msg['time']+'\n Description: '+msg['desc']+"\n\n";
                		var subject = msg['title'];
                         var mail='kosh20111@gmail.com';
                         var mailto_link = 'http://twitter.com/home?status='+kosh;
			            // mailto_link += '&subject' + encodeURIComponent(subject);
			             //mailto_link += '' + encodeURIComponent(subject);
                         window.location.href =mailto_link;
        		},
        	icon: false,
        	theme: "e"
      		},
'Cancel': {
       			 click: function () { 
        		},
        	icon: "delete",
        	theme: "e"
      		}

			
    	}
	
  })

						 },
						 theme:"e"
						 },

'Close': {
       			 click: function () { 
        		},
        	icon: "delete",
        	theme: "e"
      		}
}
  				})
 		   	  }
              },null);
       		});
  
		})
		
		
	  $('#other_events_btn').click( function() { 
       	 $.mobile.changePage($('#page-other'), {transition:"none"});
      });
      
      
      $(document).delegate('.delete', 'click', function() {
      var event_title = this.id;
 	  $('<div>').simpledialog2({
    	mode: 'button',
    	headerText: 'Delete',
		themeHeader:'e',
    	headerClose: true,
    	buttonPrompt: 'Are you sure you want to delete?',
    	buttons : {
      		'Yes': { 
			
        		click: function () { 
        		db.transaction(function(tx) {
          		tx.executeSql('delete from events where title="'+event_title+'";');
				location.reload(true);
}); 			

        	}
      },
	  
      		'No': {
       			 click: function () { 
        		},
        	icon: "delete",
        	theme: "e"
      		}
    	}
  	})
	})
		        	$('#eventList').listview('refresh');

});

function errorCB(tx, err) {
        console.log("Error: "+err);
}


function successCB() {
       console.log("success!");
}

function successCB_event() {
}


function displayEvents(tx, rs) {
      var event_title = this.id;

        e = $('#eventList');
        if(rs.rows.length==0)
        	e.append('<li class="empty">Your Assignments Are Ordered Base On Submission Date <br> Start New Reminder By Clicking On Create New Button <li>');
        	$('#eventList').listview('refresh');		
 if(rs.rows.length==0)
 $('<div>').simpledialog2({
    mode: 'blank',
    headerText: 'Welcome',
	themeHeader:'d',
    blankContent : 
      "<ul data-role='popup'><li>Welcome To Assignment Reminder</li> <br> Hope you Like Us.If So Could you Rate Us On The Market :). <br> Thanks.</ul>"+
      "<a rel='close' data-role='button' data-theme='a' href='#'>Close</a>"
  })
   if(rs.rows.length==15)
 $('<div>').simpledialog2({
    mode: 'blank',
    headerText: 'Welcome',
	themeHeader:'d',
    blankContent : 
      "<ul data-role='popup'><li>Welcome Back</li> <br> Hope you Liked Us.If So Could you Rate Us On The Market :). <br> Thanks.</ul>"+
      "<a rel='close' data-role='button' data-theme='a' href='#'>Close</a>"
  })
        for(var i=0; i < rs.rows.length; i++) {
 			r = rs.rows.item(i);
          		e.append('<li data-icon="delete"><a class="event" id="'+r['title']+'" href="#"><h3>'+r['title'] +'</h3><p > Date: '+r['date']+', Time: '+r['time']+'</p></a><a id="'+r['title']+'" data-theme="d" class="delete" href="#"></a></li>').listview('refresh'); 
        }
		        if(rs.rows.length==1)
        	e.append('<li class="empty">&uarr;<br>Click On An Event For More Options<li>');
            $('#eventList').listview('refresh');	
	
}