// app.js
const postsTable = document.getElementById('postsTable').getElementsByTagName('tbody')[0];

async function fetchData() {
  try {
    const usersResponse = await fetch('http://localhost:4001/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            users {
              id
              name
              email
            }
          }
        `,
      }),
    });
    const usersData = await usersResponse.json();
    const users = usersData.data.users;

    const postsResponse = await fetch('http://localhost:4002/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            posts {
              id
              title
              content
            }
          }
        `,
      }),
    });
    const postsData = await postsResponse.json();
    const posts = postsData.data.posts;

    postsTable.innerHTML = '';

    posts.forEach(post => {
      const row = postsTable.insertRow();
      row.insertCell().textContent = '1'; // Replace with actual user ID logic
      row.insertCell().textContent = post.id;
      row.insertCell().textContent = post.title;
      row.insertCell().textContent = post.content;
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function subscribeToNewPosts() {
  const wsUrl = 'ws://localhost:4002/subscriptions';
  const client = new WebSocket(wsUrl, 'graphql-ws');

  client.onopen = () => {
    console.log('WebSocket connection established');
    client.send(JSON.stringify({ type: 'connection_init' }));
    client.send(
      JSON.stringify({
        id: '1',
        type: 'start',
        payload: {
          query: `
            subscription {
              newPost {
                id
                title
                content
              }
            }
          `,
        },
      })
    );
  };

  client.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === 'data') {
      const newPost = message.payload.data.newPost;
      console.log('New post received:', newPost);

      const row = postsTable.insertRow();
      row.insertCell().textContent = '1'; // Replace with actual user ID logic
      row.insertCell().textContent = newPost.id;
      row.insertCell().textContent = newPost.title;
      row.insertCell().textContent = newPost.content;
    }
  };

  client.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  client.onclose = () => {
    console.log('WebSocket connection closed');
  };
}

fetchData();
subscribeToNewPosts();