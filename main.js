/* fetch.js */

// fetch('demo.json')
//     .then(res => res.json())
//     .then(json => console.log(json));

const postSection = document.querySelector('#posts');
const postTemplate = document.querySelector('#post-template');

getData()
.catch(err => console.log(err));

async function getData() {
    const postStream = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await postStream.json();
    let i = 0;

    posts.forEach(post => {
        i++;
        if(i < 10) {
            const title = post.title;
            const body = post.body;

            fetch('https://unsplash.it/300/200')
                .then(res => res.blob())
                .then(blob => {
                    const newPost = document.importNode(postTemplate.content, true);
                    const postTitle = newPost.querySelector('.post__title');
                    const postBody = newPost.querySelector('.post__body');
                    const postImage = newPost.querySelector('.post__img');

                    postImage.src = URL.createObjectURL(blob);
                    postTitle.innerText = title;
                    postBody.innerText = body;
                    postSection.appendChild(newPost);
                })
                .catch(err => console.log(err));
        }
    })
};
