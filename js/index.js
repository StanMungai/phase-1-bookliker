document.addEventListener("DOMContentLoaded", function() {
  const bookList = document.getElementById('list')
  const container = document.getElementById('show-panel')

  fetch('http://localhost:3000/books')
    .then( res => res.json() )
    .then( books => {
      books.forEach(book => {
        const newBook = document.createElement('li')
        newBook.textContent = book.title
        newBook.addEventListener('click', () => {
          
          const image = document.createElement('img')
          const title = document.createElement('h2')
          const subTitle = document.createElement('h3')
          const author = document.createElement('h4')
          const desc = document.createElement('p')
          const users = document.createElement('ul')
          const btn = document.createElement('button')

          image.src = book.img_url
          title.textContent = book.title
          subTitle.textContent = book.subtitle
          author.textContent = book.author 
          desc.textContent = book.description 
          btn.textContent = 'LIKE'

          const renderUser = (user) => {
            const listUser = document.createElement('li')
            listUser.textContent = user.username

            users.append(listUser)
          }

          btn.addEventListener('click', () => {
            const complexArr = [...book.users] 
            const newUser = { "id" : 1, "username": "pouros"}
            complexArr.push(newUser)
            // console.log(complexArr)
            fetch(`http://localhost:3000/books/${book.id}`, {
              method: "PATCH", 
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify({
                "users": complexArr
              })
            })
              .then( res => res.json() )
              .then( users => renderUser )
          })

          book.users.forEach(renderUser)

          container.append(image, title, subTitle, author, desc, users, btn)
        })

        bookList.append(newBook)
      });
    })
});
