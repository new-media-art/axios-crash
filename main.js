// AXIOS GLOBALS

axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMxMiwiZW1haWwiOiJ0ZXN0MkBob3RtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJBYmMiLCJmYW1pbHlfbmFtZSI6IkRlZiIsInBpY3R1cmUiOm51bGwsInByZWZlcnJlZF91c2VybmFtZSI6IkFiY2RlZiIsImlhdCI6MTY0NzUxMzgxNSwiZXhwIjoxNjUwMTkyMjE1fQ.i4tMpF1v2inHd_HNdmvzgIZ1-n7Sj3rRGvOKTCpeaus";

// GET REQUEST
function getTodos() {
  // axios({
  //   method: 'get',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   params: {
  //     _limit: 5
  //   }
  // })
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err));

  //   axios
  //     .get('https://jsonplaceholder.typicode.com/todos?_limit=5', {
  //       timeout: 5000
  //     })
  //     .then(res => showOutput(res))
  //     .catch(err => console.error(err));
  // }

  //Hellofood Get /api/tasklist/{taskListId}

  axios
    .get("https://codersbay.a-scho-wurscht.at/api/tasklist/99", {
      timeout: 5000,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}

// POST REQUEST
// function addTodo() {
//   axios
//     .post('https://jsonplaceholder.typicode.com/todos', {
//       title: 'New Todo',
//       completed: false
//     })
//     .then(res => showOutput(res))
//     .catch(err => console.error(err));
// }

//HelloFood POST /api/task

function addTodo() {
  axios
    .post("https://codersbay.a-scho-wurscht.at/api/task", {
      //api/task

      assignedUserId: 312,
      description: "is this a HUGE Veggy BURGR?",
      taskListId: 99,
      status: "TODO",
      points: 0,
      estimation: 0,
      title: "YES!",
    })
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}

// PUT/PATCH REQUEST PUT /api/task/{taskId}
function updateTodo() {
  axios
    .patch("https://codersbay.a-scho-wurscht.at/api/task/812", {
      spentTime: 0,
      title: "string",
      assignedUserId: 312,
      description: "This is a PUT!",
      taskListId: 0,
      status: "TODO",
      points: 0,
      estimation: 0,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}

// CUSTOM HEADERS send tocken in header
//function customHeaders() {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMxMiwiZW1haWwiOiJ0ZXN0MkBob3RtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJBYmMiLCJmYW1pbHlfbmFtZSI6IkRlZiIsInBpY3R1cmUiOm51bGwsInByZWZlcnJlZF91c2VybmFtZSI6IkFiY2RlZiIsImlhdCI6MTY0NzUxMzgxNSwiZXhwIjoxNjUwMTkyMjE1fQ.i4tMpF1v2inHd_HNdmvzgIZ1-n7Sj3rRGvOKTCpeaus' //JWT
//     }
//   };

//   axios
//     .patch(
//       'https://codersbay.a-scho-wurscht.at/api/task/812',
//       {

//           "spentTime": 0,
//           "title": "string",
//           "assignedUserId": 312,
//           "description": "string",
//           "taskListId": 0,
//           "status": "TODO",
//           "points": 0,
//           "estimation": 0

//       },
//       config
//     )
//     .then(res => showOutput(res))
//     .catch(err => console.error(err));
// }

// DELETE REQUEST
function removeTodo() {
  axios
    .delete("https://codersbay.a-scho-wurscht.at/api/task/817")
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}

// SIMULTANEOUS DATA array or requests
function getData() {
  axios
    .all([
      axios.get("https://codersbay.a-scho-wurscht.at/?_limit=5"),
      axios.get("https://codersbay.a-scho-wurscht.at?_limit=5"),
    ])
    .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch((err) => console.error(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "Hello World",
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase();
      return data;
    }),
  };

  axios(options).then((res) => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  axios
    .get("https://jsonplaceholder.typicode.com/todoss", {
      // validateStatus: function(status) {
      //   return status < 500; // Reject only if status is greater or equal to 500
      // }
    })
    .then((res) => showOutput(res))
    .catch((err) => {
      if (err.response) {
        // Server responded with a status other than 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);

        if (err.response.status === 404) {
          alert("Error: Page Not Found");
        }
      } else if (err.request) {
        // Request was made but no response
        console.error(err.request);
      } else {
        console.error(err.message);
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios
    .get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token,
    })
    .then((res) => showOutput(res))
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log("Request canceled", thrown.message);
      }
    });

  if (true) {
    source.cancel("Request canceled!");
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// AXIOS INSTANCE
const axiosInstance = axios.create({
  // Other custom settings
  baseURL: "https://jsonplaceholder.typicode.com",
});
// axiosInstance.get('/comments').then(res => showOutput(res));

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data.tasks, null, 2)}</pre> 
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
