export function DefaultNavLinks() {
  return `
    <li><a href="http://localhost:8001/index.html">Home</a></li>
    <li><a href="http://localhost:8001/movies.html">All Movies</a></li>
    <li><a href="http://localhost:8001/auth/login.html">Login</a></li>
    <li><a href="http://localhost:8001/auth/signup.html">Signup</a></li>
  `
}

export function CustomerNavLinks(customerName) {
  return `
    <li><a href="http://localhost:8001/index.html">Home</a></li>
    <li><a href="http://localhost:8001/movies.html">All Movies</a></li>
    <li id="username-display" style="margin-right: 20px;">
      <span>Welcome, ${customerName}</span>
      <div id="user-control-popup" class="hidden">
        <li><a href="http://localhost:8001/profile/index.html" aria-label="Edit Profile Details">Edit Profile</a></li>
        <li><a href="http://localhost:8001/auth/logout.html" aria-label="Logout">Logout</a></li>
      </div>
    </li>
  `
}

export function EmptyContentRow(colspanNum, message) {
  return `
    <tr>
      <td colspan="${colspanNum}" style="text-align:center;">${message}</td>
    </tr>
`
}

export function EditButton() {
  return `
    <button class="table-button edit-button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
      <span>Edit</span>
    </button>
  `
}

export function DeleteButton(id) {
  return `
    <button class="table-button delete-button" data-id="${id}">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
      </svg>
      <span>Delete</span>
    </button>
  `
}
