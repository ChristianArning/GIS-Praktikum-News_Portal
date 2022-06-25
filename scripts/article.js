console.log("article script running");

loadArticleObject("http://127.0.0.1:3000/articleobj");

async function loadArticleObject(url) {
    const response = await fetch(url);
    console.log(response);
    const content = await response.json();
    console.log(content);

    let myarticlelist = document.getElementsByClassName("articlelist");

    for (let i = 0; i < content.length; i++) {
        let para = document.createElement("div");
        para.classList.add("artikelbox");
        console.log(para);
        let node = content[i].articleText;
        console.log(node);
        para.innerHTML = node;

        myarticlelist[0].appendChild(para);
    }
}


