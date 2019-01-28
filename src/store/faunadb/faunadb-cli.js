const faunadb = require("faunadb");
const q = faunadb.query;
const secret = process.env.PLAYERS_API_SECRET;
const domain = "players";

console.log(`Using secret API key : ${secret}`);

/* configure faunaDB Client with our secret */
const client = new faunadb.Client({ secret });

client.init();

async function createPlayer(player) {
	try {
		const result = await client.query(
			q.Create(q.Class("players"), { data: player })
		);
		console.log("CREATED", JSON.stringify(result));

		const readback = await client.query(
			//q.Select("data", q.Get(q.Ref(`classes/players/${result.ref.id}`)))
			q.Select("data", q.Get(q.Class(domain), result.ref.id))
		);
		console.log("AFTER CREATION", JSON.stringify(readback));

		// const suppress = await client.query(
		// 	q.Delete(q.Ref(`classes/${domain}/${result.ref.id}`))
		// );
		// console.log("DELETE", JSON.stringify(suppress));

		// const after = await client.query(
		// 	q.Get(q.Ref(`classes/players/${result.ref.id}`))
		// );
		// console.log("AFTER SUPPRESSION", JSON.stringify(after.data));

		// let readback = await client.query(q.Get(q.Ref(`classes/players/${result.id}`)));
		// console.dir(readback);
	} catch (err) {
		console.error(err);
	}
}

console.dir(process.argv);

createPlayer({ firstName: "John", lastName: "DOE" });
