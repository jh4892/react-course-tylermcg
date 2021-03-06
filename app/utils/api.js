// // private sec key voor github api plan
const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`;

async function getProfile(username) {
  const profile = await fetch(
    `https://api.github.com/users/${username}${params}`
  );

  const data = profile.json();
  return data;
}

async function getRepos(username) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos${params}&per_page=100`
  );

  return await response.json();
}

function getStarCount(repos) {
  return repos.reduce((count, { stargazers_count }) => {
    count + stargazers_count;
  }, 0);
}

function calculateScore({ followers }, repos) {
  return followers * 3 + getStarCount(repos);
}

function handleError(error) {
  console.warn(`Mijn error! ${error}`);
  throw error;
  return null;
}

async function getUserData(player) {
  const [profile, repos] = await Promise.all([
    getProfile(player),
    getRepos(player)
  ]);

  return {
    profile,
    score: calculateScore(profile, repos) ? calculateScore(profile, repos) : 0
  };
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

export async function battle(players) {
  const results = await Promise.all(players.map(getUserData)).catch(
    handleError
  );

  return results === null ? results : sortPlayers(results);
}

export async function fetchPopularRepos(language) {
  const encodedURI = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  const results = await fetch(encodedURI).catch(handleError);

  return await results.items.json();
}

// call with: fetchPopularRepos("Java").then(function(res) {});
