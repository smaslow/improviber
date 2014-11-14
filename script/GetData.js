//global variables
var globalAnswer = "";

function customTransitionHandler(name, reverse, $to, $from)
{
	alert('in custom flip transition handler...');

    var deferred = new $.Deferred();

    // Perform any actions or set-up necessary to kick-off
    // your transition here. The only requirement is that
    // whenever the transition completes, your code calls
    deferred.resolve(name, reverse, $to, $from);

    // Return a promise.
    return deferred.promise();
}

function addItem(sType)
{
	//build server request URL
	var vURL = "http://maslowinc.com/improviber/api.aspx?f=additem";
	var oTextBox = document.getElementById("txt" + sType);

	if (oTextBox.value.length == 0)
	{
		alert('Please enter a description.');
		oTextBox.focus();
		return;
	}
	
	vURL += "&description=" + escape(oTextBox.value);

	if (sType.toLowerCase() == "askfor" || sType.toLowerCase() == "line")
	{
		if (sType.toLowerCase() == "askfor")
		{
			vURL += "&cat_ask_for=1";
		}
		if (sType.toLowerCase() == "line")
		{
			vURL += "&cat_line=1";
		}
	}

	$('input[type=checkbox]').each(function () {
		if (this.checked)
		{
			if (this.id.toString().toLowerCase().indexOf(sType.toLowerCase()) > -1)
			{
				vURL += "&" + this.id + "=1";
			}
		}
	});

	$.ajax(
		{
			url:vURL, 
			async:false,
			success:function(result){
				alert(result);
				oTextBox.value = "";
				oTextBox.focus();
			}
		}
	);	
}

function getData(sType)
{
	//build server request URL
	var vURL="http://maslowinc.com/improviber/api.aspx?f=getitem";
	
	if (sType == "askfor" || sType == "line")
	{
		//ask fors and lines are unique cases
		if (sType == "askfor")
		{
			vURL += "&cat_ask_for=1";
		}
		else
		{
			vURL += "&cat_line=1";
		}
	}
	else
	{
		$('input[type=checkbox]').each(function () {
			if (this.checked)
			{
				if (this.id.toString().indexOf(sType) > -1 || sType == "all")
				{
					vURL += "&" + this.id + "=1";
				}
			}
			
		});
	}

	//alert(vURL);

	$.ajax(
		{
			url:vURL, 
			async:false,
			success:function(result){
				//alert(result);
				globalAnswer = result;
			}
		}
	);

	$.mobile.changePage( "response.html", { transition: "slideup"} );
}