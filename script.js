function submit(event) {
  event.preventDefault();

  let name = document.getElementById('nameInput').value;
  if(name === "") {
    document.getElementById('nameInput').style.border=' 2px solid red'
  } else {
    document.getElementById('nameInput').style.border=' 2px solid #418e9c'

    let country = "";
    if (document.getElementById('selector').value !== "*") {
      country = "&country_id=" + document.getElementById('selector').value;
    }

    let url = "https://api.agify.io/?name=" + name + country;

    fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      changeAge(json);
    });
  }
}

function changeAge(json) {
  let age = json.age;
  if (age === null) {
    document.getElementById('age').textContent = Math.floor(Math.random() * 100000) + 1000;
  } else {
    document.getElementById('age').textContent = json.age;
  }
  document.getElementById('age').style.color= getRandomColor();
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  var code = "";
  for (var i = 0; i < 2; i++) {
    code += letters[Math.floor(Math.random() * 16)];
  }

  var variance = Math.floor(Math.random() * 5);
  switch (variance) {
    case 0:
    color += code + "00" + "ff";
    break;
    case 1:
    color += "00" + code + "ff";
    break;
    case 2:
    color += "ff" + code + "00";
    break;
    case 3:
    color += "ff" + "00" + code;
    break;
    case 4:
    color += "00" + "ff" + code;
    break;
  }

  return color;
}

function onEnter(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("go").click();
    }
}

document.getElementById('go').addEventListener('click', submit);
document.getElementById("nameInput").addEventListener("keyup", onEnter);
