import { getQuestionAnswer } from "./utils.js";

export default [
    {
        name: "pytanie",
        description: "Pobiera pytanie z egzaminu zawodowego",
        options: [
            {
                name: "numer",
                description: "Numer pytania",
                type: 4,
                required: true,
            },
        ],
        run: async ({ client, interaction }) => {
            const questionNumber = interaction.options.getInteger("numer");

            const answer = await getQuestionAnswer(questionNumber);

            if (!answer) {
                await interaction.editReply("Nie ma takiego pytania misiek.");
                return;
            }

            await interaction.editReply(answer);
        },
    },
];
