const githubname = document.querySelector("#githubname");
const form = document.querySelector("#searchForm");
const clearButton = document.querySelector("#clearButton");
const clearAllButton = document.querySelector("#clearAllButton");


const github = new Github();
const ui = new UI();

runEventListeners();

function runEventListeners() {
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clearInput);
    document.addEventListener("DOMContentLoaded", runPageLoaded);
    clearAllButton.addEventListener("click", clearSearchedUser);
}

function clearSearchedUser() {
    Storagex.clearAllSearchedUserFromStorage();
    ui.clearSearchUsers();

}

function runPageLoaded() {
    ui.fillSearchedUserToUIFromStorage();

}

function clearInput() {
    ui.clearInput();

}

function search(e) {
    const userName = githubname.value.trim();
    if (userName == null || userName == "") {
        alert("Lütfen Bir Kullanıcı Adı Giriniz.!!")
    } else {
        github.getGithubData(userName)
            .then(response => {
                ui.addSearchedUserToUI(userName);
                Storagex.addSearchedUserToStorage(userName);
                ui.addUserProfileToUI(response.user);
                document.querySelector("#showRepo").addEventListener("click", () => ui.showRepos(response.repo));

            })
            .catch(error => console.log(error))

    }

    e.preventDefault();
}