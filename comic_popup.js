document.addEventListener("DOMContentLoaded", () => {
	var comicImage = document.getElementById("comic");
	var comicTitle = document.getElementById("comicTitle");
	var randomComicButton = document.getElementById("newComicButton");
	var forwardComicButton = document.getElementById("forwardComicButton");
	var backComicButton = document.getElementById("backComicButton");
	var date = document.getElementById("date");
	
	let totalComics;
	//set comic image	
	getComicInfo().then(obj => {
		comicImage.src = obj.img;
		comicTitle.textContent = obj.title;
		date.textContent = `${obj.year}-${obj.month}-${obj.day}`;
		totalComics = obj.num;
	});

	//get new image
	randomComicButton.addEventListener("click", () => {
		getComicInfo(getRandomArbitraryInt(1,totalComics)).then(obj => {
			comicImage.src = obj.img;
			comicTitle.textContent = obj.title;
			date.textContent = `${obj.year}-${obj.month}-${obj.day}`;
		});
	});

	forwardComicButton.addEventListener("click", () => {
		getComicInfo(totalComics + 1).then(obj => {
			comicImage.src = obj.img;
			comicTitle.textContent = obj.title;
			date.textContent = `${obj.year}-${obj.month}-${obj.day}`;
		});

		totalComics++;
	});

	backComicButton.addEventListener("click", () => {
		getComicInfo(totalComics - 1).then(obj => {
			comicImage.src = obj.img;
			comicTitle.textContent = obj.title;
			date.textContent = `${obj.year}-${obj.month}-${obj.day}`;
		});

		totalComics--;
	});
});

async function getComicInfo(number=null) {
	let url;
	if(number == null) {
		url = 'http://xkcd.com/info.0.json';
	} else {
		url = `http://xkcd.com/${number}/info.0.json`;
	}

	const response = await fetch(url, {});
	const comicJson = await response.json();

	return comicJson;
}

function getRandomArbitraryInt(min, max) {
	return Math.ceil(Math.random() * (max - min) + min);
}
