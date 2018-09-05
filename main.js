let profileTemplateString = document.getElementById('profile-template').innerHTML;
let renderProfile = Handlebars.compile(profileTemplateString);

let reposTemplateString = document.getElementById('repos-template').innerHTML;
let renderRepos = Handlebars.compile(reposTemplateString);

Handlebars.registerHelper('relative-date', (date) => {
  return moment(date).fromNow();
});

let promise = $.ajax({
  type: 'get',
  url: 'https://api.github.com/users/wycats'
});

promise.then((userProfile) => {
  let renderedProfile = renderProfile(userProfile);
  $('body').append(renderedProfile);
}, (error) => {
  console.error(error);
});

$.getJSON('https://api.github.com/users/wycats/repos').then((repositories) => {
  console.log(repositories);
  let renderedRepos = renderRepos({
    repos: repositories
  });
  $('body').append(renderedRepos);
});
