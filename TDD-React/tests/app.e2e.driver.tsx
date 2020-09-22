import puppeteer from "puppeteer";
import { ReturnTypeAsync } from "../../common/types";

export const appE2EDriver = async () => {
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto("http://localhost:3232");

    return {
        close: async () => {
            browser.close();
        },
        isSingleHeaderExists: async () => {
            return (await page.$$eval(`[data-hook="Header"]`, (res) => res.length)) === 1;
        },
        isSingleTodoListExists: async () => {
            return (
                (await page.$$eval(`[data-hook="TodoList"]`, (res) => res.length)) === 1
            );
        },
    };
};

export type AppE2EDriver = ReturnTypeAsync<typeof appE2EDriver>;
