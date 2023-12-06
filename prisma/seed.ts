const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

const locationData = async () => {
	const locations = [
		{
			name: "A1",
		},
		{
			name: "A2",
		},
		{
			name: "A3",
		},
		{
			name: "A4",
		},
		{
			name: "A5",
		},
		{
			name: "A6",
		},
		{
			name: "A7",
		},
		{
			name: "A8",
		},
		{
			name: "A9",
		},
		{
			name: "A10",
		},
		{
			name: "A11",
		},
		{
			name: "A12",
		},
		{
			name: "A13",
		},
		{
			name: "A14",
		},
		{
			name: "A15",
		},
		{
			name: "A16",
		},
		{
			name: "A17",
		},
		{
			name: "A18",
		},
		{
			name: "A19",
		},
		{
			name: "A20",
		},
		{
			name: "A21",
		},
		{
			name: "A22",
		},
		{
			name: "A23",
		},
		{
			name: "A24",
		},
		{
			name: "A25",
		},
		{
			name: "A26",
		},
		{
			name: "A27",
		},
		{
			name: "A28",
		},
		{
			name: "A29",
		},
		{
			name: "A30",
		},
		{
			name: "A31",
		},
		{
			name: "B1",
		},
		{
			name: "B2",
		},
		{
			name: "B3",
		},
		{
			name: "B4",
		},
		{
			name: "B5",
		},
		{
			name: "B6",
		},
		{
			name: "B7",
		},
		{
			name: "B8",
		},
		{
			name: "B9",
		},
		{
			name: "B10",
		},
		{
			name: "B11",
		},
		{
			name: "B12",
		},
		{
			name: "B13",
		},
		{
			name: "B14",
		},
		{
			name: "B15",
		},
		{
			name: "B16",
		},
		{
			name: "B17",
		},
		{
			name: "B18",
		},
		{
			name: "B19",
		},
		{
			name: "B20",
		},
		{
			name: "B21",
		},
		{
			name: "B22",
		},
		{
			name: "B23",
		},
		{
			name: "B24",
		},
		{
			name: "B25",
		},
		{
			name: "B26",
		},
		{
			name: "B27",
		},
		{
			name: "B28",
		},
		{
			name: "B29",
		},
		{
			name: "B30",
		},
		{
			name: "B31",
		},
		{
			name: "B32",
		},
		{
			name: "B33",
		},
		{
			name: "B34",
		},
		{
			name: "B35",
		},
		{
			name: "B36",
		},
		{
			name: "B37",
		},
		{
			name: "C1",
		},
		{
			name: "C2",
		},
		{
			name: "C3",
		},
		{
			name: "C4",
		},
		{
			name: "C5",
		},
		{
			name: "C6",
		},
		{
			name: "C7",
		},
		{
			name: "C8",
		},
		{
			name: "C9",
		},
		{
			name: "D1",
		},
		{
			name: "D2",
		},
		{
			name: "D3",
		},
		{
			name: "D4",
		},
		{
			name: "D5",
		},
		{
			name: "D6",
		},
		{
			name: "D7",
		},
		{
			name: "D8",
		},
		{
			name: "D9",
		},
		{
			name: "D10",
		},
		{
			name: "D11",
		},
		{
			name: "D12",
		},
		{
			name: "D13",
		},
		{
			name: "D14",
		},
		{
			name: "D15",
		},
		{
			name: "D16",
		},
		{
			name: "D17",
		},
		{
			name: "D18",
		},
		{
			name: "D19",
		},
		{
			name: "D20",
		},
		{
			name: "D21",
		},
		{
			name: "D22",
		},
		{
			name: "D23",
		},
		{
			name: "D24",
		},
	];

	return locations;
};

const load = async () => {
	try {
		const data = await locationData();
		await db.report.createMany({
			data: data,
		});
		console.log("Database seeded");
	} catch (e) {
		console.error(e);
		process.exit(1);
	} finally {
		await db.$disconnect();
	}
};

load();
