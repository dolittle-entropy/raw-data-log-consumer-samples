<script>
	let name = "";
	let favouriteColour = "";
	let showNextStep = false;

	async function handleClick() {
		const url =
			"https://freshteapot-taco.dolittle.cloud/api/webhooks/favourite/colour";
		const data = {
			name,
			colour: favouriteColour,
		};

		if (data.name === "" || data.colour === "") {
			alert("A name and a colour, its all I ask of you");
			return;
		}
		alert("Authorization is not set");
		const response = await fetch(url, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer XXX",
			},
			body: JSON.stringify(data),
		});

		if (response.status !== 200) {
			alert("Failed to save");
			return;
		}
		showNextStep = true;
	}
</script>

<h1>What is your name?</h1>
<input bind:value={name} placeholder="Jeg heter???" />

<h1>What is your favourite colour?</h1>
<input bind:value={favouriteColour} placeholder="Maybe bubblegum pink?" />
<p>Hello {name || "stranger"}!</p>
<p>Your favourite colour is {favouriteColour || "see thru"}!</p>

<button on:click={handleClick}> Click me </button>
{#if showNextStep}
	<p>
		<a
			href="https://teams.microsoft.com/l/channel/19%3acd5aec4c5fbe4556bcda0590e0eccb1e%40thread.tacv2/testbed?groupId=6129cf36-ac84-4b62-9266-a4478a43f021&tenantId=381088c1-de08-4d18-9e60-bbe2c94eccb5"
			on:click|once={() => {
				window.open(
					"https://teams.microsoft.com/l/channel/19%3acd5aec4c5fbe4556bcda0590e0eccb1e%40thread.tacv2/testbed?groupId=6129cf36-ac84-4b62-9266-a4478a43f021&tenantId=381088c1-de08-4d18-9e60-bbe2c94eccb5",
					"_blank"
				);
			}}
		>
			Click to view who else has shared their favourite colour
		</a>
	</p>
{/if}

<style>
	@import "./all.css";
</style>
