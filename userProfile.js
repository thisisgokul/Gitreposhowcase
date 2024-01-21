function displayUserProfile(user) {
    const profileInfoDiv = document.getElementById('profile-info');
    if (!user || user.message === "Not Found") {
        profileInfoDiv.innerHTML = `
            <div class="alert alert-danger" role="alert">
                User not found. Please enter a valid GitHub username.
            </div>
        `;
        return;
    }

    profileInfoDiv.innerHTML = `
        <div class="row">
            <div class="col-md-3">
                <img src="${user.avatar_url}" alt="Profile Picture" class="img-fluid rounded-circle mb-3">
            </div>
            <div class="col-md-6">
                <h2>${user.name}</h2>
                <p class="bio">${user.bio}</p>
                <p>Followers: ${user.followers} | Following: ${user.following}</p>
                <a href="${user.html_url}" target="_blank" class="text-primary" rel="noopener noreferrer">View Profile</a>
            </div>
        </div>
    `;
}
