function updateTournaments() {

  axios.interceptors.request.use((config) => {
    document.querySelector('.loader').style.display = "flex";
    return config;
  }, (error) => {
    // trigger 'loading=false' event here
    return Promise.reject(error);
  });

  axios.interceptors.response.use((response) => {
    document.querySelector('.loader').style.display = "none";
    return response;
  }, (error) => {
    document.querySelector('.loader').innerText = 'Impossible de récupérer les données pour le moment. Merci de réessayer plus tard.';
    return Promise.reject(error);
  });


  axios.get("http://localhost:8000/api/tournaments").then(function (response) {
    response.data.forEach((tournament) => {
      let card = document.createElement("div");
      card.classList.add("card");
      card.classList.add("tournamentCard");
      card.style.maxWidth = "700px";

      body = document.createElement("div");
      body.classList.add("card-body");
      card.appendChild(body);

      title = document.createElement("h1");
      title.classList.add("card-title");
      title.innerHTML = tournament.name;
      body.appendChild(title);

      desc = document.createElement("p");
      desc.classList.add("card-text");
      desc.innerHTML =
        "Date : " + new Date(tournament.date).toLocaleDateString();
      desc.style.color = "#b39742";
      body.appendChild(desc);

      desc = document.createElement("p");
      desc.classList.add("card-text");
      desc.innerHTML = "Lieu : " + tournament.place;
      desc.style.color = "#152fdc";
      body.appendChild(desc);

      table = document.createElement("table");
      table.classList.add("table");

      table.classList.add("table-striped");

      thead = document.createElement("thead");
      thead.classList.add("thead-dark");
      table.appendChild(thead);

      tr = document.createElement("tr");
      thead.appendChild(tr);

      th = document.createElement("th");
      th.innerText = "Equipes";
      tr.appendChild(th);

      th = document.createElement("th");
      th.innerText = "Joueurs";
      tr.appendChild(th);

      tbody = document.createElement("tbody");
      table.appendChild(tbody);

      tournament.teams.forEach((team) => {
        tr = document.createElement("tr");
        tbody.appendChild(tr);

        td = document.createElement("td");
        tr.appendChild(td);
        td.innerText = team.name;

        td = document.createElement("td");

        team.players.forEach((player, id) => {
          td.innerText += (id === 0 ? "" : " - ") + player.pseudo;
          td.style.fontSize = "0.8rem";
        });
        tr.appendChild(td);
      });

      body.appendChild(table);

      let tournamentBlock = document.getElementById("tournaments");
      tournamentBlock.appendChild(card);
    });
  }).catch(function (e)  {
    document.querySelector('.loader').innerText = 'Impossible de récupérer les données pour le moment. Une erreur est survenue ('+ e.message +')';
  });
}

updateTournaments();
