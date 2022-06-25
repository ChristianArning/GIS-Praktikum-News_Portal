console.log("article script running");

loadArticleObject("http://127.0.0.1:3000/articleobj");

async function loadArticleObject(url) {
    const response = await fetch(url);
    console.log(response);
    const content = await response.json();
    console.log(content);

    for (let i=0; i<content.length; i++) {
        let para = document.createElement("div");
        let node = document.createTextNode(content[i].articleText);
        para.appendChild(node);
        const element = document.getElementById("articlelist");
        element.appendChild(para);
    }
}


