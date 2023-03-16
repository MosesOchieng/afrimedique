function openCity(evt, cityName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(cityName).style.display = "block";
	evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function pad(n) {
	var pad = "";
	if (n < 10) {
		pad = "0" + n;
	} else {
		pad = n;
	}
	return pad;
}



$(document).ready(function() {
	var d = new Date($("#row_date").text());
	var day = d.getDate();
	var month = d.getMonth() + 1; //zero indexed
	var year = d.getFullYear();
	var dte = year + "-" + pad(month) + "-" + pad(day);
	$('input[name="casedate"]').val(dte);
	$('input[name="mrn"]').val($("#mrn_data").text());

	var $form = $("#casesched");
	var $conf = $("#docsconf");
	var $docstart = $("#docprep");
	var $schstart = $("#schcase");
	var $schrestart = $("#resched");
    var $taskpanel = $("#tasklist");
    var $parties = $("#partyprep")
    
	// Submit function:

	$form.submit(function() {
		event.preventDefault();
		url = "https://script.google.com/macros/s/AKfycby74eUiWuX3c0DvaUrVYtolk1fAaDsj8qrwyv8zSiU5bEihpHgc/exec";
		packet = $form.serialize();
		$conf.html("<i class='fa fa-refresh fa-spin'></i> Preparing and transmitting information...");
		
		$.post(url, packet, function(response) {
		// Write a confirmation message:
		   $conf.html(response);
		// Disable the submit button:
		   $docstart.prop("disabled", true);
		 });

		return false;
	});

    


    
    $parties.click(function() {
       
    });
    
    
    // reschedule functionality
    $schrestart.click(function() {
		if (
		    $('input[name="casedate"]').val() == $('input[name="finaldate"]').val()
		) {
			$('input[name="postopdate"]').toggleClass("flash");
			alert("The proposed case date is identical to the existing date. Please enter a new case date");
			return;
		}
		if ($('input[name="postopdate"]').val() == $('input[name="finalpostop"]').val()) {
			alert("The proposed post op date is identical to the existing post op date. Please re-schedule a new post-op and enter new date");
			return;
		}
		$('input[name="swit"]').val("resched");
		$form.submit();
		$('input[name="finalpostop"]').val($('input[name="postopdate"]').val()); 
		$('input[name="finaldate"]').val($('input[name="casedate"]').val());
	});

	//Form Validation for Doc Prep
	$docstart.click(function() {
		if (
			$("#instruction").prop("checked") &&
			$('input[name="postopdate"]').val() == ""
		) {
			$('input[name="postopdate"]').toggleClass("flash");
			alert("Please enter the new date of the post op appointment");
			return;
		}
		if ($('input[name="docs"]:checked').length > 0) {
			//			$('input[name="docs"]:checked').prop("disabled", true);
			$('input[name="docs"]:checked ~ span').css("background-color", "#616161");
			//   $('input[name="docs"]:checked').prop("checked", false);
			
			$('input[name="swit"]').val("papers");
			$form.submit();
			$('input[name="docs"]:checked').prop("disabled", true);
		} else {
			alert("Please select a document to compile");
			$("#docsbox").toggleClass("flash");
		}
	});

	//Form Validation for schedule Prep
	$schstart.click(function() {
		if ($('input[value="patient"]').prop("checked")) {
			// checking if patient is checked
			if ($('input[name="postopdate"]').val() == "") {
				// making sure post op date has been input
				$('input[name="postopdate"]').toggleClass("flash");
				alert("Please enter the date of the post op appointment");
				return;
			}
			// checking instruction and school note since patient checked
			$('input[value="instruction"]').prop("checked", true);
			//				.prop("disabled", true);
			$('input[value="school"]').prop("checked", true);
			//				.prop("disabled", true);
			$('input[value="instruction"]:checked ~ span').css(
				"background-color",
				"#616161"
			);
			$('input[value="school"]:checked ~ span').css("background-color", "#616161");
		}

		//		$('input[name="parties"]:checked').prop("disabled", true);
		$('input[value="hospital"]').prop("checked", true);
		$('input[value="posting"]').prop("checked", true);
		$('input[name="docs"]:checked ~ span').css("background-color", "#616161");
		$('input[name="parties"]:checked ~ span').css("background-color", "#616161");

		//   $('input[name="docs"]:checked').prop("checked", false);
		$schstart.prop("disabled", true);
		url = "";
		$('input[name="swit"]').val("sched");
		$form.submit();
		$('input[name="docs"]:checked').prop("disabled", true);
		$('input[name="parties"]:checked').prop("disabled", true);
		$('#resched').prop("disabled", false);		
		$('input[name="finalpostop"]').val($('input[name="postopdate"]').val()); 
		$('input[name="finaldate"]').val($('input[name="casedate"]').val());

	});
});

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}