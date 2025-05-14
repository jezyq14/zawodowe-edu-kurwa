import * as cheerio from "cheerio";
import config from "./config.js";

export async function getQuestionAnswer(questionNumber) {
    const page = Math.floor(questionNumber / 40) + 1;

    try {
        const req = await fetch(`${config.pageUrl}${page}`);
        const res = await req.text();

        let $ = cheerio.load(res);

        const questions = $(
            "article .card-body header :first-child :last-child"
        );

        let url = "";
        questions
            .filter((i, el) => $(el).text().split(" ")[1] == questionNumber)
            .each((i, el) => {
                url = $(el)
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .attr("data-url");
            });

        const req2 = await fetch(`${config.baseUrl}${url}`);
        const res2 = await req2.text();

        const $2 = cheerio.load(res2);

        const answer = $2(
            'meta[itemprop="isCorrect"][content=true]+button span'
        )
            .text()
            .split(".")
            .slice(1, 2)
            .join("")
            .trim();

        return answer;
    } catch (error) {
        console.error("Error fetching question answer:", error);
        return "Nie udało się pobrać odpowiedzi.";
    }
}
