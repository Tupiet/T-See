var urlSet = new Map();

chrome.storage.sync.get(["activeTabs"], function(items){
if(!items.activeTabs)
 return;
urlSet = new Map(JSON.parse(items.activeTabs));
AddLinks();
});

function AddLinks()
{
  urlSet.forEach(function(value, key) {
    pushingData(value, key);
  });

 
}

saveItem.onclick = function(element) {
  chrome.tabs.query({active: true}, function(tabs) {

  urlSet.set(tabs[0].title, tabs[0].url);

  chrome.storage.sync.set({ "activeTabs":JSON.stringify(Array.from(urlSet.entries())) });
  pushingData(tabs[0].url, tabs[0].title);
  });
};

function pushingData(value, key) {
    var atags = document.createElement("a");
    atags.href = value;
    atags.innerHTML = key;
    atags.target = "_black";
    
    document.getElementById('mydiv').append(atags);

    var newButton = document.createElement("button");
    newButton.innerHTML = "x";
    newButton.addEventListener('click', function() { 
      urlSet.delete(key); 
      document.getElementById('mydiv').innerHTML = "";
      chrome.storage.sync.set({ "activeTabs":JSON.stringify(Array.from(urlSet.entries())) });
      AddLinks();
    });

    document.getElementById('mydiv').append(newButton);
    
    var breakLine = document.createElement("br");
    document.getElementById('mydiv').append(breakLine);
    document.getElementById('mydiv').append(breakLine);
};