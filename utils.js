function toggleWarlord(object){
	var warlord_info = document.getElementById('warlord_justifier');
	var show_span = document.getElementById('show_span');
	var hide_span = document.getElementById('hide_span');
	if(warlord_info.style.display == 'none'){
		object.className = 'profile_more_info_link info_shown';
		warlord_info.style.display = 'block';
		hide_span.style.display = 'inline';
		show_span.style.display = 'none';
	} else {
		object.className = 'profile_more_info_link';
		warlord_info.style.display = 'none';
		hide_span.style.display = 'none';
		show_span.style.display = 'inline';
	}
}