// Saves options to chrome.storage
function save_options() {
  var server_address = document.getElementById('server_address').value;
  chrome.storage.local.set({
    server_address: server_address
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.local.get({
    server_address: '127.0.0.1:8000'
  }, function(items) {
    document.getElementById('server_address').value = items.server_address;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);